
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"

d3.json(url, function(data) {
    features(data.features);
});

function features(markers) {
    var earthquakes = L.geoJSON(markers, {
        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h3>Magnitude: " + feature.properties.mag +"</h3><h3>Place: "+ feature.properties.place);
          },

          pointToLayer: function (feature, latlng) {
            return new L.circle(latlng,{
              radius: getRadius(feature.properties.mag),
              fillColor: getColor(feature.properties.mag),
           })
        }
        });

    createMap(earthquakes);
}

function createMap(earthquakes) {

    var streets = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1IjoiZHlsYnVyZ2VyIiwiYSI6ImNqaHNkZXpyYTAxdDAzcXJ6dzA3NHR5dXMifQ.oZt5CGSYffy4dZqIFSQciQ");
  
    var satellite = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1IjoiZHlsYnVyZ2VyIiwiYSI6ImNqaHNkZXpyYTAxdDAzcXJ6dzA3NHR5dXMifQ.oZt5CGSYffy4dZqIFSQciQ"
    );
   
    var baseMaps = {
        "Street": streets,
        "Satellite": satellite
    };

    var overlayMaps = {
        "Earthquakes": earthquakes,
    };

    var myMap = L.map("map", {
        center: [32.09, -95.71],
        zoom: 5,
        layers: [streets, earthquakes]
    });

    L.control.layers(baseMaps, overlayMaps, {
    }).addTo(myMap);
}

function getRadius(magnitude) {
    return magnitude * 50000;
};

function getColor(magnitude) {
    if (magnitude > 5) {
        return 'red'
    } else if (magnitude > 4) {
        return 'orange'
    } else if (magnitude > 3) {
        return 'yellow'
    } else {
        return 'black'
    }
};

