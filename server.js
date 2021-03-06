const { response } = require("express");
// server.js
// This is where your node app starts

//load the 'express' module which makes writing webservers easy
const express = require("express");
const cors = require("cors");
const app = express();
const lodash = require('lodash');

app.use(cors());

//load the quotes JSON
const quotes = require("./quotes.json");

// Now register handlers for some routes:
//   /                  - Return some helpful welcome info (text)
//   /quotes            - Should return all quotes (json)
//   /quotes/random     - Should return ONE quote (json)
app.get("/", function (request, response) {
  response.send("Jay's Quote Server!  Ask me for /quotes/random, or /quotes");
});

//START OF YOUR CODE...

app.get("/quotes", function (request, response) {
  response.send(quotes);
});

app.get("/quotes/random", function (request, response) {
  // const randomQuote = pickFromArray(quotes);
  const randomQuote = lodash.sample(quotes);
  response.send(randomQuote);
});

app.get("/quotes/search", function (request, response) {
  const searchTerm = request.query.term.toLowerCase();
  const searchQuotes = quotes.filter((quoteObj) => {
    const lowerCaseQuote = quoteObj.quote.toLowerCase();
    const lowerCaseAuthor = quoteObj.author.toLowerCase();
    return lowerCaseQuote.includes(searchTerm) || lowerCaseAuthor.includes(searchTerm);
  });
  response.send(searchQuotes);
});

//...END OF YOUR CODE

//You can use this function to pick one element at random from a given array
//example: pickFromArray([1,2,3,4]), or
//example: pickFromArray(myContactsArray)
//
function pickFromArray(arr) {
  const randomNumber = Math.random(); // Numero entre 0 y 1
  // Por ejemplo, array con 20 elementos
  const randomNumberXArrayLength = randomNumber * arr.length;
  const randomIndex = Math.floor(randomNumberXArrayLength);
  return arr[randomIndex];
}

//Start our server so that it listens for HTTP requests!
let port = 5000;

app.listen( port, function () {
  console.log("Your app is listening on port " + port);
});
