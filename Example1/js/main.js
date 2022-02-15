require([
    "esri/config",
    "esri/Map", 
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/layers/GeoJSONLayer", 
    "esri/widgets/Legend",
    "esri/widgets/Expand"  ,
    "esri/widgets/LayerList",
    "esri/widgets/FeatureTable",    
    "esri/layers/WMSLayer"
], function(
    esriConfig,
    Map,
    MapView,
    FeatureLayer,
    GeoJSONLayer,
    Legend,
    Expand,
    LayerList,
    FeatureTable,
    WMSLayer
) { 

    // Set API Key
    esriConfig.apiKey = "AAPK07debd14a9ae4f03a01da38f19b27fedM5k4aLdVhDJxdnNKa3--HjeN9XwqQIScajcYBxn2F8naSMjGFGmpyWrvqhkedhgD";

    
    const url = "https://services.arcgis.com/JJzESW51TqeY9uat/ArcGIS/rest/services/SSSI_England/FeatureServer/0";
    
    const template = {
        title: "Track Details",
        lastEditInfoEnabled: false,
        content: "TrackId {track_id} <br> Track Type {track_type}"
    }

    const sssi_template = {
        title: "{SSSI_NAME}",
        lastEditInfoEnabled: false,
        content: [
          {
            type: "fields",
            fieldInfos: [
            {
              fieldName: "SSSI_AREA ",
              label: "SSSI_AREA "
            },
            {
              fieldName: "Status",
              label: "STATUS"
            }]
        }
        ]
    }


    const featureLayer = new FeatureLayer({
        title: "SSSI",
        url: url,
        copyright: "Natural England",
        popupTemplate: sssi_template
    });


    // Symbol for type c tracks
    const typeCSym = {
        type: "simple-line", // autocasts as new SimpleLineSymbol()
        color: "#30ffea",
        width: "3px",
        style: "solid"
    };
      
    // Symbol for other track types
    const otherSym = {
        type: "simple-line", // autocasts as new SimpleLineSymbol()
        color: "#ef37ac",
        width: "2px",
        style: "solid"
              };


    const civTrackRenderer = {
        type: "unique-value", // autocasts as new UniqueValueRenderer()
        legendOptions: {
          title: "Track type"
        },
        defaultSymbol: otherSym,
        defaultLabel: "Other Track Type Highway",
        field: "track_type",
        uniqueValueInfos: [
          {
            value: "C = Unsealed Minor Access Road", // code for interstates/freeways
            symbol: typeCSym,
            label: "C = Unsealed Minor Access Road"
          },
        ]
    }
    
    const gjson_url =  "/data/civ_tracks.geojson";
    const geojsonLayer = new GeoJSONLayer({
        url: gjson_url,
        popupTemplate: template,
        renderer: civTrackRenderer
        }
      );

    const campani_url = "https://sit2.regione.campania.it/geoserver/RegioneCampania.Catalogo/wms?request=GetCapabilities&service=WMS&layers=sitdbo_bio_italy&"
    const campani_wms = new WMSLayer ({
      url: campani_url,
      sublayers: [
        {
          name: "Rete Ferroviaria"
        }
      ]
    });

    const layer = new WMSLayer({
      url: "https://ows.terrestris.de/osm/service",
      sublayers: [
        {
          name: "OSM-WMS"
        }
      ]
    });

    const spanish_cad_layer = new WMSLayer({
      url: "http://ovc.catastro.meh.es/cartografia/INSPIRE/spadgcwms.aspx?",
      sublayers: [
        {
          name: "CP.CadastralParcel"
        }
      ]
    });


      const map = new Map({
        //basemap: "gray-vector"
        //basemap: "arcgis-topographic", // Basemap layer
        basemap: "satellite",
        layers: [layer, featureLayer,geojsonLayer, campani_wms, spanish_cad_layer]
    }); 

    

    view = new MapView({
        container: "viewDiv",
        map: map,
        extent: {
            xmin: -2.65, 
            ymin: 54.2,
            xmax: -2.7,
            ymax: 54.25,
           spatialReference: 4326
        }
        //center: [-117.506, 33.66559],
        //zoom: 12
    });

    // Adding a legend and expand widget
    const legend = new Legend({
        view: view,
        container: "legendDiv",
        layerInfos: [
            {
              layer: featureLayer,
              title: "SSSI"
            },
            {
                layer: geojsonLayer,
                title: "Civ Tracks"
            }
          ]
    });


    let layerList = new LayerList({
        view: view
      });
    
    const expand = new Expand({
        view: view,
        content: legend,
        expanded: true
    });

    view.ui.add(expand, "top-right");


    // Adds widget below other elements in the top left corner of the view
    view.ui.add(layerList, {
        position: "top-left"
      });

    // Adding the FeatureTable widget
    view.when(() => {
    // Create the feature table
    const featureTable = new FeatureTable({
      view: view, // required for feature highlight to work
      layer: geojsonLayer,
      // Autocast the FieldColumnConfigs
      // These are the fields that will display as columns in the FeatureTable
      fieldConfigs: [{
          name: "uid",
          label: "UID",
          direction: "asc"
        },
        {
          name: "track_id",
          label: "Track Id"
        },
        {
          name: "track_type",
          label: "Track_Type"
        }
      ],
      container: document.getElementById("tableDiv")
    });
    // This function zooms into the selected features based off the records
    // selected or deselected from the FeatureTable
    function zoomToSelectedFeatures(event) {
    // check if a row is selected or deselected
    if(event.added.length > 0) {
      // row was selected
      currentSelectedOIDs.push(event.added[0].objectId);
    } else {
      // row was deselected - remove the objectid from
      // the currentSelectedOIDs
      event.removed.forEach((feature, index) => {
        let deleteIndex = currentSelectedOIDs.indexOf(event.removed[index].objectId);
        currentSelectedOIDs.splice(deleteIndex, 1);
      });
    }
    
    // only perform the query and zoom to the extent
    // if the currentSelectedOIDs is greater than 0.
    if(currentSelectedOIDs.length > 0) {
      const query = featureLayer.createQuery();
      query.objectIds = currentSelectedOIDs;
      query.returnGeometry = true;

      // Client-side querying is not being used here as currently, the FeatureTable
      // does not have the ability to only restrict records to features within
      // the current view extent. This is currently in development.
      geojsonLayer.queryFeatures(query).then((results) => {
        view.goTo(results.features);
      });
    }
  }
    // Query for the selected features and zoom to them
    // automatically
    featureTable.on('selection-change', zoomToSelectedFeatures);
  });

  view.ui.add(featureTable, "bottom-right");

});