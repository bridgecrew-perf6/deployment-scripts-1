import fetch from "node-fetch";

fetch('https://gasstation-mumbai.matic.today')
  .then(response => response.json())
  .then(json => console.log(json))