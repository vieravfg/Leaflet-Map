var myMap = L.map("map", {
    center: [40.7, -122],
    zoom: 6
});
// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);
// geojson from earthquake.usgs.gov website 
var quake_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson"; 
  
d3.json(quake_url).then(function(response) {
    console.log(response);
    console.log(response.features);
    var heatArray = [];
    //set up a new marker for each item with a for loop
    for (var i = 0; i < response.features.length; i++) { 
        var location = response.features[i].geometry; //defining location  (so first you go to index i=0 , then to location and ..)

        if (location) { //and if you can unfurl location you pick the coordinates
        // Listing the coordinates 
        heatArray.push([location.coordinates[1], location.coordinates[0]]); 
        }
    }
    var heat = L.HeatLayer(heatArray, { 
        radius: 20,
        blur: 100 // with more blur the intesity goes down. (smoother)
    }).addTo(myMap);
    
});
    