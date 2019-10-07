require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var search = process.argv.slice(3).join(" ");
var term = process.argv[2];

var runApp = function(term, search) {
  switch (term) {
    case "concert-this":
      concertThis(search);
      break;
    case "spotify-this-song":
      spotifyThisSong(search);
      break;
    case "movie-this":
      movieThis(search);
      break;
    case "do-what-it-says":
      doWhatItSays();
      break;
    default:
      console.log("That is not a command that I recognize, please try again.");
  }
};

var spotifyThisSong = function(search) {
  if (search === "") {
    search = "The Sign";
  }
  var spotify = new Spotify(keys.spotify);
  spotify
    .search({ type: "track", query: search, limit: 1 })
    .then(function(response) {
      //   console.log(response.tracks.items);
      var song = response.tracks.items;
      for (var i = 0; i < song.length; i++) {
        console.log(
          `--------- \nArtist: ${song[i].artists[0].name} \n--------- \nSong title: ${song[i].name} \n--------- \nPreview song: ${song[i].preview_url} \n--------- \nAlbum: ${song[i].album.name}`
        );
      }
    })
    .catch(function(err) {
      console.log(err);
    });
};

function concertThis(search) {
  if (search === "") {
    search = "kenny chesney";
  }
  var bands =
    "https://rest.bandsintown.com/artists/" +
    search +
    "/events?app_id=codingbootcamp";
  axios.get(bands).then(function(response) {
    var info = response.data;
    // console.log(info[0])
    for (var i = 0; i < info.length; i++) {
      var date = moment(info[i].datetime).format("MM/DD/YYYY");
      console.log(
        `venue name: ${info[i].venue.name} \nvenue location: ${info[i].venue.city} \nDate: ${date} \n ---------------`
      );
    }
  });
}

function movieThis() {
  if (search === "") {
    search = "mr. nobody";
  }
  var omdb = "http://www.omdbapi.com/?t=" + search + "&plot=&apikey=7d5d5a0a";
  axios.get(omdb).then(function(response) {
    var info = response.data;
    console.log(info);
    console.log(
      `Title: ${info.Title},\n--------- \nYear: ${info.Year},\n--------- \nIMDB Rating: ${info.Ratings[0].Value}\n--------- \n Country Filmed ${info.Country}\n--------- \nLanguage of movie: ${info.Language}\n---------\n Plot: ${info.Plot}\n--------- \nActors: ${info.Actors} \n---------`
    );
  });
}

function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      throw err;
    }
    var input = data.split(",");
    runApp(input[0], input[1]);
  });
}

runApp(term, search);
