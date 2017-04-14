var isAscending = false;

function SortArray( temptempVideoInfo, sortType )
{
	var temptemptempVideoInfo = new Array();

	switch ( sortType )
	{
	case "Name":
		NameSort( temptempVideoInfo, function ( sortedArray )
		{
			temptemptempVideoInfo = sortedArray;
		} );
		break;

	case "Skip Seconds":
		SkipSecondsSort( temptempVideoInfo, function ( sortedArray )
		{
			temptemptempVideoInfo = sortedArray;
		} );
		break;

	case "Date":
		DateSort( temptempVideoInfo, function ( sortedArray )
		{
			temptemptempVideoInfo = sortedArray;
		} );
		break;


	default:

	}

}



function NameSort( videoInfoArray, callback )
{
	var sortedArray = videoInfoArray;

	sortedArray.sort( function ( a, b )
	{
		var str1 = a;
		var str2 = b;

		var substringedName1 = str1.name.substring( 0, 13 );
		var substringedName2 = str2.name.substring( 0, 13 );

		if ( substringedName1 == "[Hearthstone]" )
		{
			str1.name = str1.name.substring( 14 );
		}
		if ( substringedName2 == "[Hearthstone]" )
		{
			str2.name = str2.name.substring( 14 );
		}



		if ( str1.name.toLowerCase() < str2.name.toLowerCase() )
		{
			return -1;
		}
		if ( str1.name.toLowerCase() > str2.name.toLowerCase() )
		{
			return 1;
		}
		return 0;

	} );
	callback( sortedArray );
}

function SkipSecondsSort( videoInfoArray, callback )
{
	var sortedArray = videoInfoArray;


	sortedArray.sort( function ( a, b )
	{
		var str1 = a;
		var str2 = b;

		var substringedName1 = str1.name.substring( 0, 13 );
		var substringedName2 = str2.name.substring( 0, 13 );


		if ( substringedName1 === "[Hearthstone]" )
		{
			str1.name = str1.name.substring( 13 );
		}
		if ( substringedName2 === "[Hearthstone]" )
		{
			str2.name = str2.name.substring( 13 );
		}

		return a.skipSeconds - b.skipSeconds;
	} );
	callback( sortedArray );
}

function DateSort( videoInfoArray, callback )
{
	var sortedArray = videoInfoArray;

	sortedArray.sort( function ( a, b )
	{
		var str1 = a;
		var str2 = b;

		var substringedName1 = str1.name.substring( 0, 13 );
		var substringedName2 = str2.name.substring( 0, 13 );


		if ( substringedName1 === "[Hearthstone]" )
		{
			str1.name = str1.name.substring( 13 );
		}
		if ( substringedName2 === "[Hearthstone]" )
		{
			str2.name = str2.name.substring( 13 );
		}

		return new Date( b.date ) - new Date( a.date );

	} );
	callback( sortedArray );
}
