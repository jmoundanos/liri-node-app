//Incorporate all packages and files that will be needed for app

require("dotenv").config();
var axios = require("axios");
var moment = require("moment");
var keys = require("./keys.js");
//var spotify = new Spotify(keys.spotify);
//Define variable to retrieve user request
var command = process.argv[2];
var input = process.argv[3];

//Switch statement to call a function for the command chosen
switch(command){
    case "concert-this":
        findConcert(input);
        break;
    case "spotify-this-song":
        findSong(input);
        break;
    case "movie-this":
        findMovie(input);
        break;
    case "do-what-it-says":
        doThis(input);
        break;
}
//Functions
function findConcert(artist){

    console.log(artist);
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function(response){
            console.log("Name of venue: " + response.data.venue);
        })
        .catch(function(error) {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an object that comes back with details pertaining to the error that occurred.
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log("Error", error.message);
            }
            console.log(error.config);
          });
        
}