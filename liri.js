require("dotenv").config();
var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);
var fs = require("fs")
var axios = require("axios")
var inquirer = require("inquirer")

var Spotify = require('node-spotify-api')
var term = process.argv[2]
var search = process.argv.slice(3).join(" ")
var omdb = "http://www.omdbapi.com/?s=" + search + "&apikey=7d5d5a0a"
var bands = "https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp"

// inquirer.prompt([
//     {
//         type: "list",
//         message: "What would you like to do?",
//         choices: ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says"],
//         name: "choice"
//     }
// ])

// axios.get(omdb).then(function(response) {
//     console.log(response.data)
// })

// axios.get(bands).then(function(response) {
//     console.log(response.data)
// })

axios.get(spotify).then(function(response) {
    console.log(response.tracks)
})