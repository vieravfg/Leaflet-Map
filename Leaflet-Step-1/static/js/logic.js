var myMap = L.map("map", {
    center: [40.7, -73.95],
    zoom: 5
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
  //---------------------
  // geojson from earthquake.usgs.gov website for crimes
  var quake_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson"; 
  
  d3.json(quake_url).then(function(response) {
  
    console.log(response);
    console.log(response.features)
    for (var i = 0; i < response.features.length; i++) { //set up a new marker for each item with a for loop
      var location = response.features[i].geometry; //defining location  (so first you go to index i=0 , then to location and ..)

      if (location) { //and if you can unfurl location you pick the coordinates
        L.marker([location.coordinates[1], location.coordinates[0]]). addTo(myMap); //after all this you add it to your map
      }
    }
  
  });
  