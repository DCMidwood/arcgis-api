require([
    "esri/config",
    "esri/Map", 
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/widgets/Expand"  ,
    "esri/widgets/LayerList",
    "esri/widgets/Legend",
    
], function(
    esriConfig,
    Map,
    MapView,
    FeatureLayer,
    Expand,
    LayerList,
    Legend
) { 

    // Set API Key
    esriConfig.apiKey = "AAPK07debd14a9ae4f03a01da38f19b27fedM5k4aLdVhDJxdnNKa3--HjeN9XwqQIScajcYBxn2F8naSMjGFGmpyWrvqhkedhgD";
    
    const utmZoneUrl = "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/World_UTM_Grid/FeatureServer/0";
 
    const labelClass = {
        // autocasts as new LabelClass()
        symbol: {
          type: "text", // autocasts as new TextSymbol()
          color: "black",
          font: {
            // autocast as new Font()
            family: "Playfair Display",
            size: 12,
            weight: "bold"
          }
        },
        labelExpressionInfo: {
          expression: "$feature.ZONE"
        }
      };    


    const featureLayer = new FeatureLayer({

        portalItem: {
            // autocasts as new PortalItem
            id: "b294795270aa4fb3bd25286bf09edc51"
          },
          labelingInfo: [labelClass]
        });
    
    const map = new Map({
            //basemap: "gray-vector"
            basemap: "arcgis-topographic", // Basemap layer
            layers: [featureLayer]
        }); 
    
    view = new MapView({
        container: "viewDiv",
        map: map,
        extent: {
            xmin: -30, 
            ymin: -30,
            xmax: 20,
            ymax: 20,
            spatialReference: 4326
        }
        });
    
    // Adding a legend and expand widget
    const legend = new Legend({
        view: view,
        container: "legendDiv",
        layerInfos: [
            {
            layer: featureLayer,
            title: "UTM"
            }
        ]
        });
    
    
        let layerList = new LayerList({
            view: view
          });
        
        const expand = new Expand({
            view: view,
            content: layerList,
            expanded: false
        });
    
        view.ui.add(expand, "top-right");
    
    
    });