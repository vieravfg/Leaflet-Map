// geojson from earthquake.usgs.gov website 
var quake_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson"; 
  
d3.json(quake_url).then(function(response) {
    console.log(response);
    console.log(response.features);
    var quakemarkers = []
    //set up a new marker for each item with a for loop
    for (var i = 0; i < response.features.length; i++) { 
        var location = response.features[i].geometry; //defining location  (so first you go to index i=0 , then to location and ..)

        if (location) { //and if you can unfurl location you pick the coordinates
        // Listing the coordinates 
        quakemarkers.push(
        L.circleMarker([location.coordinates[1], location.coordinates[0]], {
            fillOpacity: 0.75,
            color: "white",
            fillColor: color,
            // Adjust radius by 
            radius: location.coordinates[2] / 7.5
        }) 
        );
        }
    }
   
    var cityLayer = L.layerGroup(quakemarkers);
    // Adding tile layer
    var satellite = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        accessToken: API_KEY
    });
    
    var light = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "light-v10",
        accessToken: API_KEY
    });
    // Only one base layer can be shown at a time
    var baseMaps = {
        Satellite: satellite,
        Grayscale: light
        };
    // Overlays that may be toggled on or off
    var overlayMaps = {
        Earthqueake: cityLayer
        };
    var myMap = L.map("map", {
        center: [40.7, -110],
        zoom: 6.2,
        layers:[satellite, cityLayer]
    });
    
    // Pass our map layers into our layer control
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps).addTo(myMap);
    
    

});


    