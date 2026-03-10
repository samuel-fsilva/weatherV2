async function apiWeather(obj) {
  let key = "ef6bfa3d38c54cfbaeb140315251106";
  let url;
  if (obj.type == "coords") {
    url = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${obj.latitude},${obj.longitude}&lang=pt`;
  } else if (obj.type == "city") {
    url = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${obj.city}&lang=pt`;
  }

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        errorShow();
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      setApiData(data);
    });
}

function setApiData(data) {
  clearCard()
  setMap(data.location.lat, data.location.lon);
  let elems = getElem();
  elems[0].innerText = `${Math.round(data.current.temp_c)}°C`;
  elems[1].innerText = `${data.location.name}, ${data.location.region} - ${data.location.country}, ${data.current.condition.text}`;

  setBackground(data.current.condition.text, data.current.is_day);
}

function errorShow() {
  let elems = getElem();
  elems[0].innerHTML = "--°C";
  elems[1].innerHTML = "Erro ao encontrar o local solicitado";
}
