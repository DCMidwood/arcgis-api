define(["require", "exports", "tslib", "esri/Map", "esri/views/MapView", "esri/layers/FeatureLayer", "./LayerEffect", "./LayerFX"], function (require, exports, tslib_1, Map_1, MapView_1, FeatureLayer_1, LayerEffect_1, LayerFX_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Map_1 = (0, tslib_1.__importDefault)(Map_1);
    MapView_1 = (0, tslib_1.__importDefault)(MapView_1);
    FeatureLayer_1 = (0, tslib_1.__importDefault)(FeatureLayer_1);
    LayerEffect_1 = (0, tslib_1.__importDefault)(LayerEffect_1);
    LayerFX_1 = (0, tslib_1.__importDefault)(LayerFX_1);
    // latest 14 months of unemployment statistics
    var layer = new FeatureLayer_1.default({
        url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/BLS_Monthly_Unemployment_Current_14_Months/FeatureServer/2",
        minScale: 0,
        maxScale: 0
    });
    var map = new Map_1.default({
        basemap: "dark-gray-vector",
        layers: [layer]
    });
    var view = new MapView_1.default({
        container: "viewDiv",
        map: map,
        center: [-100, 40],
        zoom: 3
    });
    var layerEffect = new LayerEffect_1.default({ enabled: false, id: "contrast", values: [0] });
    var layerFX = new LayerFX_1.default({ layer: layer });
    // add to window for demo
    window.layerFX = layerFX;
    window.layerEffect = layerEffect;
});
//# sourceMappingURL=main.js.map