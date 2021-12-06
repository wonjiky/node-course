const fs = require("fs");

// const book = {
//   title: "Ego is the Enemy",
//   author: "Ryan Holiday",
// };
// const bookJSON = JSON.stringify(book);
// fs.writeFileSync("1-json.json", bookJSON);

// const dataBuffer = fs.readFileSync("1-json.json");
// const dataJSON = dataBuffer.toString();
// const data = JSON.parse(dataJSON);
// console.log(data);

const dataBuffer = fs.readFileSync("1-json.json");
const data = dataBuffer.toString();
const user = JSON.parse(data);
user.name = "WONJIK";
user.age = "32";
const newUser = JSON.stringify(user);
fs.writeFileSync("1-json.json", newUser);
