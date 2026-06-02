# Urban Heat Island Detection using Landsat 8 and Google Earth Engine

## Overview

This project focuses on the detection and analysis of Urban Heat Island (UHI) effects in Chennai, Tamil Nadu, using Landsat 8 thermal imagery and Google Earth Engine. The study analyzes spatial temperature variations between urban and rural regions using Land Surface Temperature (LST), NDVI, and NDBI indices.

The analysis was performed using Landsat 8 Collection 2 Level 2 imagery acquired between March 2023 and May 2023. The project identified thermal hotspots associated with dense built-up regions and quantified Urban Heat Island intensity across the study area.

---

## Problem Statement

Rapid urbanization and increasing impervious surfaces such as roads, buildings, and infrastructure contribute to elevated urban temperatures. The Urban Heat Island effect negatively impacts environmental quality, urban climate, and human health. This project aims to analyze thermal variations between urban and rural regions using satellite-based thermal remote sensing techniques.

---

## Objectives

* Calculate Land Surface Temperature (LST) using Landsat 8 thermal data
* Analyze vegetation and built-up characteristics using NDVI and NDBI
* Identify urban thermal hotspots
* Compare urban and rural temperature patterns
* Estimate Urban Heat Island Intensity
* Visualize thermal distribution across Chennai city

---

## Study Area

The study area is Chennai, Tamil Nadu, India.

### Study Area Characteristics

* Highly urbanized metropolitan city
* Dense built-up infrastructure
* Rapid urban expansion
* Coastal tropical climatic conditions

---

## Dataset Used

* Landsat 8 Collection 2 Level 2 Imagery
* Surface Reflectance Bands
* Thermal Infrared Band (ST_B10)
* NDVI and NDBI indices
* Google Earth Engine datasets

---

## Tools & Technologies

* Google Earth Engine
* JavaScript
* Remote Sensing
* GIS
* Landsat 8 Thermal Analysis
* QGIS

---

# Methodology

1. Collection of Landsat 8 imagery
2. Cloud filtering and image selection
3. Surface reflectance scaling
4. Thermal band scaling
5. NDVI calculation
6. Emissivity estimation
7. Land Surface Temperature calculation
8. NDBI-based urban and rural masking
9. Urban Heat Island intensity estimation
10. Spatial visualization and analysis

---

# Indices Used

## NDVI (Normalized Difference Vegetation Index)

NDVI was calculated using the Near Infrared (NIR) and Red bands to analyze vegetation density across the study area.

### Formula

```text id="h1hm23"
NDVI = (NIR - Red) / (NIR + Red)
```

---

## NDBI (Normalized Difference Built-up Index)

NDBI was used to identify built-up urban regions and distinguish urban and rural areas.

### Formula

```text id="w2sk7c"
NDBI = (SWIR - NIR) / (SWIR + NIR)
```
---

# Results

The analysis identified significant Urban Heat Island hotspots in densely built-up urban regions of Chennai. Areas with higher NDBI values exhibited elevated Land Surface Temperature, while vegetation-rich regions with higher NDVI values showed comparatively lower thermal intensity.

The generated thermal maps highlighted strong spatial temperature variations across the study area, demonstrating the environmental impact of urban expansion and reduced vegetation cover.

## Temperature Statistics

* Mean Urban LST: **42.79°C**
* Mean Rural LST: **40.19°C**
* Urban Heat Island Intensity: **2.61°C**

These results indicate that urban regions experienced significantly higher temperatures compared to surrounding rural regions, confirming the presence of Urban Heat Island effects within Chennai city.

---

# Key Observations

* Built-up urban regions exhibited higher thermal intensity.
* Vegetation-rich regions showed lower land surface temperatures.
* Urban Heat Island hotspots were concentrated in densely developed zones.
* NDVI and LST demonstrated an inverse relationship.
* NDBI and LST showed a direct relationship with urban heat concentration.

---

# Future Improvements

* Multi-seasonal thermal analysis
* Integration of machine learning-based hotspot prediction
* Higher spatial resolution thermal datasets
* Time-series Urban Heat Island monitoring
* Real-time urban climate analysis

---

# Conclusion

The project successfully demonstrated the application of thermal remote sensing and Google Earth Engine for Urban Heat Island detection and analysis. The integration of NDVI, NDBI, and Land Surface Temperature analysis effectively identified urban thermal hotspots and quantified the impact of urbanization on surface temperature patterns.

---

## Google Earth Engine Script

https://code.earthengine.google.com/6a1e31b63a6865f876079ef19f71aa43

---

## Author

Kashika Venkatesan
B.E. Geoinformatics | Anna University CEG
