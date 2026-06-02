// Center map on Chennai
Map.centerObject(chennai, 10);

// Load Landsat 8 Collection 2 Level 2
var landsatCollection = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
  .filterBounds(chennai)
  .filterDate('2023-03-01', '2023-05-31')
  .filter(ee.Filter.lt('CLOUD_COVER', 10))
  .sort('CLOUD_COVER');

// Select least cloudy image
var image = landsatCollection.first();

print('Selected Image:', image);

// -----------------------------
// APPLY SCALE FACTORS
// -----------------------------

// Surface Reflectance scaling
var opticalBands = image.select(['SR_B2','SR_B3','SR_B4','SR_B5','SR_B6','SR_B7'])
  .multiply(0.0000275)
  .add(-0.2);

// Thermal scaling (Kelvin)
var thermalBand = image.select('ST_B10')
  .multiply(0.00341802)
  .add(149.0)
  .rename('BT');

// -----------------------------
// NDVI Calculation
// -----------------------------

var ndvi = opticalBands.normalizedDifference(['SR_B5', 'SR_B4'])
  .rename('NDVI');

Map.addLayer(ndvi.clip(chennai),
  {min: -1, max: 1, palette: ['blue', 'white', 'green']},
  'NDVI');

// -----------------------------
// Emissivity Calculation
// -----------------------------

var emissivity = ndvi.expression(
  "(ndvi < 0.2) ? 0.97" +
  ": (ndvi > 0.5) ? 0.99" +
  ": 0.98", {
    'ndvi': ndvi
}).rename('Emissivity');

// -----------------------------
// LST Calculation
// -----------------------------

var wavelength = 10.895e-6;
var rho = 1.438e-2;

var lst = thermalBand.expression(
  '(BT / (1 + ((wavelength * BT) / rho) * log(emissivity))) - 273.15', {
    'BT': thermalBand,
    'wavelength': wavelength,
    'rho': rho,
    'emissivity': emissivity
}).rename('LST');

// Display LST
Map.addLayer(lst.clip(chennai), {
  min: 20,
  max: 45,
  palette: ['blue', 'cyan', 'green', 'yellow', 'orange', 'red']
}, 'Land Surface Temperature');

// -----------------------------
// NDBI Calculation
// -----------------------------

var ndbi = opticalBands.normalizedDifference(['SR_B6', 'SR_B5'])
  .rename('NDBI');

Map.addLayer(ndbi.clip(chennai),
  {min: -1, max: 1, palette: ['white', 'brown']},
  'NDBI');

// -----------------------------
// Urban and Rural Masks
// -----------------------------

// Urban areas
var urbanMask = ndbi.gt(0);

// Rural areas
var ruralMask = ndbi.lte(0);

// Visualize
Map.addLayer(urbanMask.selfMask(),
  {palette: ['red']},
  'Urban Mask');

Map.addLayer(ruralMask.selfMask(),
  {palette: ['green']},
  'Rural Mask');

// -----------------------------
// Mean Urban LST
// -----------------------------

var urbanLST = lst.updateMask(urbanMask).reduceRegion({
  reducer: ee.Reducer.mean(),
  geometry: chennai,
  scale: 30,
  maxPixels: 1e9
});

// -----------------------------
// Mean Rural LST
// -----------------------------

var ruralLST = lst.updateMask(ruralMask).reduceRegion({
  reducer: ee.Reducer.mean(),
  geometry: chennai,
  scale: 30,
  maxPixels: 1e9
});

// -----------------------------
// PRINT RESULTS
// -----------------------------

print('Mean Urban LST (°C):', urbanLST.get('LST'));

print('Mean Rural LST (°C):', ruralLST.get('LST'));

// -----------------------------
// UHI Intensity
// -----------------------------

var uhi = ee.Number(urbanLST.get('LST'))
  .subtract(ee.Number(ruralLST.get('LST')));

print('Urban Heat Island Intensity (°C):', uhi);