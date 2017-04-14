var express = require( 'express' );
var request = require( 'request' );
var math = require( 'mathjs' );
var youtube = require( "youtube-api" )
var cors = require( 'cors' );
const fs = require( 'fs' );
const path = require( 'path' );
var app = express();


app.get( '/', function ( req, res )
{
	res.send( 'Hello World!' );
} );

app.use( cors() );

app.use( express.static( 'public' ) );

app.listen( 3000, function ()
{
	console.log( 'Example app listening on port 3000!' );
} );


var numvids = 0;


function VideoInfo( name, skipSeconds, id )
{
	this.name = name;
	this.skipSeconds = skipSeconds;
	this.id = id;
}



var videoInfos = new Array();

var playlistId = "PL3kmT1mmaRnGdkZGVJbcLfg_oGk32vk2v";

var url;

url = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=" + playlistId + "&maxResults=50&key=AIzaSyDbxSATyacB_sLnnKp9bI8qi_iRGtHw1Do";

var content;

StartLoadingVideos();

setInterval( function ()
{
	StartLoadingVideos();
}, 600000 );

function StartLoadingVideos()
{
	numvids = 0;
	videoInfos = new Array();
	falsevids = 0;

	request(
	{
		url: url,
		json: true
	}, function ( error, response, body )
	{

		if ( !error && response.statusCode === 200 )
		{
			content = body;
			LoadPageOfVideos( content ); // comment this to stop seach
		}
	} )
}

function LoadPageOfVideos( tempContent )
{
	for ( var i = 0; i < tempContent.items.length; i++ )
	{
		numvids++;
		GetSkipSeconds( tempContent.items[ i ].snippet.title, tempContent.items[ i ].snippet.resourceId.videoId, function ( vidName, skipsec, vidId )
		{
			var videoInfo3 = new VideoInfo( vidName, skipsec, vidId );
			videoInfos.push( videoInfo3 );

		} );
	}
	var tempUrl = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=" + playlistId + "&maxResults=50&" + "pageToken=" + tempContent.nextPageToken + "&key=AIzaSyDbxSATyacB_sLnnKp9bI8qi_iRGtHw1Do";
	request(
	{
		url: tempUrl,
		json: true
	}, function ( error, response, body )
	{
		if ( !error && response.statusCode === 200 )
		{
			console.log( tempUrl );
			tempContent = body;
			if ( tempContent.nextPageToken != null )
			{
				LoadPageOfVideos( tempContent );
				console.log( tempContent.nextPageToken );
			}
			else
			{
				LoadLastPage( tempContent );
			}
		}
	} )
}

function LoadLastPage( tempContent )
{
	for ( var i = 0; i < tempContent.items.length; i++ )
	{
		numvids++;
		GetSkipSeconds( tempContent.items[ i ].snippet.title, tempContent.items[ i ].snippet.resourceId.videoId, function ( vidName, skipsec, vidId )
		{
			var videoInfo3 = new VideoInfo( vidName, skipsec, vidId );
			videoInfos.push( videoInfo3 );

		} );
	}

	// we are done loading playlist and comments
	setTimeout( function ()
	{
		console.log( JSON.stringify( videoInfos, null, 2 ) );
		console.log( numvids + " numvids" );
		console.log( videoInfos.length + " array length" );
		fs.writeFile( __dirname + "/public/info.json", JSON.stringify( videoInfos, null, 2 ), function ( err )
		{
			if ( err )
			{
				return console.log( err );
			}

			console.log( "The file was saved!" );
		} );

	}, 10000 );

}

function GetSkipSeconds( videoName, videoId, callback )
{
	var skipperinoId = "UCFHXs8mxhNsOgA_NwaPIz4w";
	var searchTerms = "GrimPatronino"
	var commentContent;

	var url = "https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=" + videoId + "&maxResults=100&searchTerms=" + searchTerms + "&key=AIzaSyDbxSATyacB_sLnnKp9bI8qi_iRGtHw1Do";

	request(
	{
		url: url,
		json: true
	}, function ( error, response, body )
	{
		var tempskipsec;
		if ( !error && response.statusCode === 200 )
		{
			commentContent = body;
			var skiptime = -1;
			for ( var i = 0; i < commentContent.items.length; i++ )
			{
				if ( commentContent != null )
				{
					try
					{
						if ( commentContent.items[ i ].snippet.topLevelComment.snippet.authorChannelId.value == skipperinoId )
						{
							skiptime = SecondsFromURL( commentContent.items[ i ].snippet.topLevelComment.snippet.textDisplay );
						}
					}
					catch ( error )
					{

					}
				}
			}
			callback( videoName, skiptime, videoId );
		}
	} )
	//return this.SecondsFromURL();
}

function SecondsFromURL( secondUrl )
{
	//<a href="http://www.youtube.com/watch?v=Hajderl73aE&amp;t=6m17s">6:17</a>

	var timeIndex = secondUrl.indexOf( "amp;t=" );
	if ( timeIndex == -1 )
	{
		return -1;
	}
	var timeString = secondUrl.substring( timeIndex + 6 );
	var minuteIndex = timeString.indexOf( "m" )
	var secondIndex = timeString.indexOf( "s" );
	var minutes = TryParseInt( timeString.substring( 0, minuteIndex ), 0 );

	var seconds = TryParseInt( timeString.substring( minuteIndex + 1, secondIndex ), 0 );
	return minutes * 60 + seconds;

}


function TryParseInt( str, defaultValue )
{
	var retValue = defaultValue;
	if ( str !== null )
	{
		if ( str.length > 0 )
		{
			if ( !isNaN( str ) )
			{
				retValue = parseInt( str );
			}
		}
	}
	return retValue;
}
