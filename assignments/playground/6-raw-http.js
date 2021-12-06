const http = require("http");
const url = `http://api.weatherstack.com/current?access_key=70d8cf51242b9c54daf77082c28f3b74&query=45,75`;

const request = http.request(url, (response) => {
  let data = "";

  response.on("data", (chunk) => {
    data = data + chunk.toString();
  });

  response.on("end", () => {
    console.log(JSON.parse(data));
  });
});

request.on("error", (error) => {
  console.log("An error", error);
});

request.end();
