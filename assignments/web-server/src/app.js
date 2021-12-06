const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// Default given variables from express
// directory name
// console.log(__dirname);
// file name
// console.log(__filename);

const app = express();
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Wonjik Yang",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Wonjik Yang",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Wonjik Yang",
  });
});

app.get("/weather", (req, res) => {
  console.log(req.query);
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: "You must provide an address",
    });
  } else {
    geocode(address, (error, { latitude, longitude, location } = {}) => {
      if (error) return res.send({ error });
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) return res.send({ error });
        res.send({
          forecast: forecastData,
          location: location,
          address: address,
        });
      });
    });
  }
});

app.get("/product", (req, res) => {
  console.log(req.query);
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  res.send([]);
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Wonjik Yang",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Wonjik Yang",
    errorMessage: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
