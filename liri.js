var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require('request');
var twitterKeys = keys.twitterKeys;
var spotifyKeys = keys.spotifyKeys;
var omdbKeys = keys.OMDBKeys;
var input = process.argv[2];

init();

function init() {
	console.log(input)
	if (input === 'my-tweets') {
		getTweets();
	}
	else if (input === 'spotify-this-song') {
		getSong(process.argv[3]);
	}
	else if (input === 'movie-this'){
		getMovie(process.argv[3]);
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
	//start new Twitter instance
	var client = new Twitter({
		consumer_key: twitterKeys.consumer_key,
		consumer_secret: twitterKeys.consumer_secret,
		access_token_key: twitterKeys.access_token_key,
		access_token_secret: twitterKeys.access_token_secret
	});

	//find username
	var user = ' ';
	client.get('account/verify_credentials', function(err, account, response) {
		if (err) {
			console.log('Error occured: ' + err);
		}
		else {
			user = account.screen_name;
			console.log('Getting tweets for: ' + user)
		}
	})

	//get most recent 20 tweets from this user
	var params = {screen_name: user, count: '20', include_entities: 'false'};
	client.get('statuses/user_timeline', params, function(err, tweets, response) {
		if (err) {
			console.log('Error occured: ' + err);
		}
		else {
			console.log('done')

			console.log('Most recent tweets from ' + user + ' :')
			console.log(' ');
			for (var i = 0; i < tweets.length; i++) {
				console.log((i + 1) + '. ' + tweets[i].text)
				console.log('----------------------')
			}
		}
	});

}

function getSong(songTitle) {
	var song = '';
	//Testing if user input a song to search
	if(!songTitle) {
		song = 'The Sign';
	}
	else {
		song = songTitle;
	}

	//new Spotify instance
	var spotify = new Spotify({
		id: spotifyKeys.client_id,
		secret: spotifyKeys.client_secret
	});

	//Spotify API Query
	spotify.search({ type: 'track', query: song, limit: '1' }, function(err, data) {
		if (err) {
			return console.log('Error occurred: ' + err);
		}
		console.log('Artist: ' + data.tracks.items[0].artists[0].name); 
		console.log('Song Title: ' + data.tracks.items[0].name); 
		if(!data.tracks.items[0].preview_url) {
			console.log('No Preview Available')
		}
		else {
		console.log('Preview: ' + data.tracks.items[0].preview_url); 
		}
		console.log('From the Album: ' + data.tracks.items[0].album.name); 
	});
}

function getMovie(movieTitle) {
	var movie = '';

	//Test to see if user input a movie title
	if(!movieTitle) {
		movie = 'Mr. Nobody';
	}
	else {
		movie = movieTitle;
	}

	//API call to OMDB
	request('http://www.omdbapi.com/?apikey=' + omdbKeys +'&t=' + movie, function (err, response, data){
		if (err) {
			return console.log('Error occurred: ' + err);
		}
		else {
			var data = JSON.parse(data);
			console.log(data.Title); 
			console.log('Released in: ' + data.Year); 
			console.log('IMDB Rating: ' + data.Ratings[0].Value); 
			console.log('Rotten Tomatoes Rating: ' + data.Ratings[1].Value); 
			console.log('Produced in: ' + data.Country); 
			console.log('Language: ' + data.Language); 
			console.log(data.Plot); 
			console.log('Starring: ' + data.Actors); 
		}
	})
}

function doIt(){

}