var xmlHttp = new XMLHttpRequest();
var URL = "http://127.0.0.1:9000/api/all";
xmlHttp.open( "GET", URL, false );
xmlHttp.send( null );
var DATA = JSON.parse(xmlHttp.responseText)

