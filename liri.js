var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var twitterKeys = keys.twitterKeys;
var spotifyKeys = keys.spotifyKeys;
var omdbKeys = keys.OMDBKeys;

var input = process.argv[3];

function init() {
if (input === 'my-tweets') {
	getTweets();
}
else if (input === 'spotify-this-song') {
	getSong(process.argv[4]);
}
else if (input === 'movie-this'){
	getMovie(process.argv[4]);
}
else if (input === 'do-what-it-says') {
	doIt();
}
else {
	console.log('You entered an invalid command you dope.');
	console.log('How about yous give one of these a try:');
	console.log('my-tweets');
	console.log("spotify-this-song 'Song Name Here'");
	console.log("movie-this 'Movie Name Here'");
	console.log('do-what-it-says');
	console.log('...................');
	console.log('Or you can just give up and leave me alone.');
}


}


function getTweets() {
	var client = new Twitter({
  		consumer_key: twitterKeys.consumer_key,
  		consumer_secret: twitterKeys.consumer_secret,
  		access_token_key: twitterKeys.access_token_key,
  		access_token_secret: twitterKeys.access_token_secret
	});

	var user = ' ';
	client.get('account/verify_credentials', function(error, account, response) {
		if (err) {
			console.log('Error occured: ' + err);
		}
		else {
			user = account.screen_name;
			console.log(user)
		}
	})

	var params = {screen_name: user, count: '20'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (err) {
			console.log('Error occured: ' + err);
		}
		else {
			console.log(tweets)
		}
	});

}

function getSong(request) {
	var song = '';
	if(!request) {
		song = 'The Sign';
	}
	else {
		song = request;
	}

	var spotify = new Spotify({
  		id: spotifyKeys.client_id,
 		secret: spotifyKeys.client_secret
	});
 
	spotify.search({ type: 'track', query: song }, function(err, data) {
  		if (err) {
    	return console.log('Error occurred: ' + err);
  	}
 
console.log(data); 
});

// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from
}

function getMovie(request) {
	var movie = '';
	if(!request) {
		movie = 'Mr. Nobody';
	}
	else {
		movie = request;
	}

// * Title of the movie.
// * Year the movie came out.
// * IMDB Rating of the movie.
// * Rotten Tomatoes Rating of the movie.
// * Country where the movie was produced.
// * Language of the movie.
// * Plot of the movie.
// * Actors in the movie.

}

function doIt(){

}