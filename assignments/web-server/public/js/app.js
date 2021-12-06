const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const locationMessage = document.querySelector("#location");
const forecastMessage = document.querySelector("#forecast");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const location = search.value;
  locationMessage.textContent = "Loading...";
  forecastMessage.textContent = "";

  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          locationMessage.textContent = data.error;
        } else {
          console.log(data);
          locationMessage.textContent = data.location;
          forecastMessage.textContent = data.forecast;
        }
      });
    }
  );
});
