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

var runApp = function(term) {
    switch (term) {
        case "concert-this":
            concertThis(search)
            break
        case "spotify-this-song":
            spotifyThisSong(search)
            break
        case "movie-this":
            movieThis(search)
            break
        case "do-what-it-says":
            doWhatItSays(search)
            break
        default:
            outputData("That is not a command that I recognize, please try again.") 
    }
}
function concertThis() {
axios.get(bands).then(function(response) {
    var info = response.data
    console.log(info)
    console.log(`venue name: ${info.venue.name} \nvenue location: ${info.name.city} \n`)
    })
}
concertThis()
// axios.get(omdb).then(function(response) {
//     console.log(response.data)
// })


