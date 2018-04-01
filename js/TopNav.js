var list = $( "#NavElementList" );

var childs = list[0].children;

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
	$( ".border" ).css( "-webkit-transform", "translateX(" + (GetDistance($( ".select" ).index( )) + ( $( ".select" ).outerWidth( true ) / 2 )) + "px)" + " scaleX(" + $( ".select" ).outerWidth( true ) + ")" );

}

function MoveToSelectedPage( currentElement ) {
	$( ".border" ).css( "transform", "translateX(" + (GetDistance($( currentElement ).index( )) + ( $( currentElement ).outerWidth( true ) / 2 )) + "px)" + " scaleX(" + $( currentElement ).outerWidth( true ) + ")" );
	$( ".border" ).css( "-webkit-transform", "translateX(" + (GetDistance($( currentElement ).index( )) + ( $( currentElement ).outerWidth( true ) / 2 )) + "px)" + " scaleX(" + $( currentElement ).outerWidth( true ) + ")" );
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
