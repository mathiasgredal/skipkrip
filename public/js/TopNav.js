/*
var button1 = "<a href = \"index.html\" > Skip The Kripp</a>"
var button2 = "<a href = \"All Videos.html\" > All The Videos</a>"
var button3 = "<a href = \"Missing Timestamps.html\" > Jobs For Skipperino</a>"
var button4 = "<a href = \"#about\" >About</a>"
var javascript = "<a href = \"javascript:void(0);\"class = \"icon\"onclick = \"myFunction()\">&#9776;</a>"

//var topNavInnerHTML = button1 + button2 + button3 + button4 + javascript;
var topNavInnerHTML = ""

document.getElementById( "myTopnav" )
	.innerHTML = topNavInnerHTML;

function myFunction()
{
	var x = document.getElementById( "myTopnav" );
	if ( x.className === "topnav" )
	{
		x.className += " responsive";
	}
	else
	{
		x.className = "topnav";
	}
}
*/
/*
// this sets the class select to the page we are on
$( function ( ) {
	$( "a" ).each( function ( ) {
		if ( $( this ).attr( "href" ) == window.location.pathname ) {
			$( this ).addClass( "select" );
		}
	});
});
*/

var list = $( "#NavElementList" );

var childs = list[0].children;

//if (!$( list ).hasClass( "responsive" )) {

MoveToCorrectPage( );

// ads a function to the mouseenter event
for ( var i = 0; i < childs.length - 2; i++ ) {
	list.children( ).eq( i ).mouseenter( function ( ) {
		MoveToSelectedPage( this );
	});
}

// on mouseleave this moves the line to the page we are on
list.mouseleave( function ( ) {
	MoveToCorrectPage( );
})

function MoveToCorrectPage( ) {
	$( ".border" ).css( "transform", "translateX(" + (GetDistance($( ".select" ).index( )) + ( $( ".select" ).outerWidth( true ) / 2 )) + "px)" + " scaleX(" + $( ".select" ).outerWidth( true ) + ")" );
	// add support for webkit
	$( ".border" ).css( "-webkit-transform", "translateX(" + (GetDistance($( ".select" ).index( )) + ( $( ".select" ).outerWidth( true ) / 2 )) + "px)" + " scaleX(" + $( ".select" ).outerWidth( true ) + ")" );

}

function MoveToSelectedPage( currentElement ) {
	$( ".border" ).css( "transform", "translateX(" + (GetDistance($( currentElement ).index( )) + ( $( currentElement ).outerWidth( true ) / 2 )) + "px)" + " scaleX(" + $( currentElement ).outerWidth( true ) + ")" );
	// add support for webkit
	$( ".border" ).css( "-webkit-transform", "translateX(" + (GetDistance($( currentElement ).index( )) + ( $( currentElement ).outerWidth( true ) / 2 )) + "px)" + " scaleX(" + $( currentElement ).outerWidth( true ) + ")" );

	//} else {
	// it is responsive design mode
	//$( ".border" ).css( "display", "none" );
}

function GetDistance( index ) {
	var length = 0;

	var totalLength = 0;

	for ( var i = 0; i < childs.length - 2; i++ ) {
		totalLength += $(childs[i]).outerWidth( true );
	}

	for ( var i = 0; i < index; i++ ) {
		length += $(childs[i]).outerWidth( true );
	}

	return length - totalLength;
}

function myFunction( ) {
	var x = document.getElementById( "NavElementList" );
	if ( x.className === "topnav" ) {
		x.className += " responsive";
	} else {
		x.className = "topnav";
	}
}
