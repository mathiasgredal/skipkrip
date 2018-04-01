var express = require( 'express' );
var cors = require( 'cors' );
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
