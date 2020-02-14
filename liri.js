//Incorporate all packages and files that will be needed for app

require("dotenv").config();
var fs = require("fs");
var axios = require("axios");
var moment = require("moment");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");


//Define variable to retrieve user request
var command = process.argv[2];
var input = process.argv.slice(3).join(" ");

//Switch statement to call a function for the command chosen
start(command, input)
function start(command, input){
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
        doThis();
        break;
}
}
//Function to find a concert
function findConcert(artist){
    if(artist){
    //store queryUrl in variable
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    //call Bandsintown api
    axios.get(queryUrl)
        .then(function(response){//if api responds display data
            console.log("Name of venue: " + response.data[0].venue.name);
            console.log("Venue location: " + response.data[0].venue.city + ", " + response.data[0].venue.region);
            console.log("Date: " + moment(response.data[0].venue.date).format("MM/DD/YYYY"));
        })
        .catch(function(error) {
           // If the code experiences any errors it will log the error to the console.
            if (error) {
                return console.log(error);
            }
          });
    }else{
        console.log("Please write the name of an artist");
    }
        
}
function findSong(songName){
    if(!songName){
        songName = "The Sign";
    }else{
        var spotify = new Spotify({id: keys["spotify"].id, secret: keys["spotify"].secret});
        spotify.search("https://api.spotify.com/v1/search?q=track:" + songName +'&type=track&limit=10',
        function(error, response) {
            if (error){
                return console.log(error);
            }
            console.log("Artist: " + response.tracks.items[0].artists[0].name);
            console.log("Song: " + response.tracks.items[0].name);
            console.log("URL: " + response.tracks.items[0].preview_url);
            console.log("Album: " + response.tracks.items[0].album.name);
            
        
    });

}
}
function findMovie(movieTitle){
    if(movieTitle == undefined){
        movieTitle = "Mr Nobody"
        console.log(movieTitle);
    }
    
        //store queryUrl in variable
        var queryUrl = "https://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy";
        //call OMDB api
        axios.get(queryUrl)
            .then(function(response){//if api responds display data
                console.log("Movie title: " + response.data.Title);
                console.log("Year released: " + response.data.Released);
                console.log("IMDB Rating: " + response.data.imdbRating);
                console.log("Rotten Tomatoes rating: " + response.data.Ratings[1].Value);
                console.log("Country produced: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
            })
            .catch(function(error) {
                // If the code experiences any errors it will log the error to the console.
                if (error) {
                    return console.log(error);
                }
              });
            
        
}
function doThis(){
    fs.readFile("random.txt", "utf8", function(error, data) {
        // If the code experiences any errors it will log the error to the console.
  if (error) {
    return console.log(error);
  }

  // We will then print the contents of data
  console.log(data);
  var output = data.split(",");
  var command = output[0];
  var input = output[1];
  start(command, input);
})
}
