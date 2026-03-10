var map = L.map("map", {
  center: [0, 0],
  zoom: 11,
});

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

async function setMap(lt, lg) {
  let markers = [];
  try {
    map.setView([lt, lg], map.getZoom());

    const customIcon = L.icon({
      iconUrl: "images/location-marker.svg",
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });

    let marker = L.marker([lt, lg], {
      icon: customIcon,
      zIndexOffset: 1000,
    }).addTo(map);

    markers.push(marker);

    if (markers.length > 1) {
      map.removeLayer(markers[0]);
     // markers = [];
    }
  } catch (error) {
    console.error("map error");
  }
}

map.on("dblclick", function (e) {
  let latitude = e.latlng.lat;
  let longitude = e.latlng.lng;
  apiWeather({ type: "coords", latitude: latitude, longitude: longitude });
});
