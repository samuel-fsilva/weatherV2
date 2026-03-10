document.addEventListener("DOMContentLoaded", () => {
  loadingCard();
  /* console.log(navigator.permissions);
  navigator.permissions
    .query({ name: "geolocation" })

    .then(function (result) {})

    .catch((err) => console.error("Erro ao verificar a permissão", err));
  */
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        apiWeather({
          type: "coords",
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      function (error) {
        deniedCard();
        console.log("Erro ou permissão negada:", error.message);
      },
    );
  }
});

let cityInput = document.getElementById("city-search");
let submitInput = document.getElementById("submit-input");

submitInput.addEventListener("click", () => {
  apiWeather({ type: "city", city: cityInput.value });
});

document.addEventListener("keypress", (e) => {
  if (e.key == "Enter" && e.target.id == "city-search") {
    apiWeather({ type: "city", city: cityInput.value });
  }
});
