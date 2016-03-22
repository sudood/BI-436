var xmlHttp = new XMLHttpRequest();
var URL = "http://127.0.0.1:9000/api/all";
xmlHttp.open( "GET", URL, false );
xmlHttp.send( null );
var DATA = JSON.parse(xmlHttp.responseText);

var NL_total_spending_by_location = Number(DATA['NL']['cost']);
var NL_spending_per_capita = Number(DATA['NL']['cost']/526977);

var PE_total_spending_by_location = Number(DATA['PE']['cost']);
var PE_spending_per_capita = Number(DATA['PE']['cost']/146283);

var NS_total_spending_by_location = Number(DATA['NS']['cost']);
var NS_spending_per_capita = Number(DATA['NS']['cost']/942926);

var NB_total_spending_by_location = Number(DATA['NB']['cost']);
var NB_spending_per_capita = Number(DATA['NB']['cost']/753914);

var QC_total_spending_by_location = Number(DATA['QC']['cost']);
var QC_spending_per_capita = Number(DATA['QC']['cost']/8215000);

var ON_total_spending_by_location = Number(DATA['ON']['cost']);
var ON_spending_per_capita = Number(DATA['ON']['cost']/13600000);

var MB_total_spending_by_location = Number(DATA['MB']['cost']);
var MB_spending_per_capita = Number(DATA['MB']['cost']/1282000);

var AB_total_spending_by_location = Number(DATA['AB']['cost']);
var AB_spending_per_capita = Number(DATA['AB']['cost']/4146000);

var SK_total_spending_by_location = Number(DATA['SK']['cost']);
var SK_spending_per_capita = Number(DATA['SK']['cost']/1130000);

var BC_total_spending_by_location = Number(DATA['BC']['cost']);
var BC_spending_per_capita = Number(DATA['BC']['cost']/4631000);

var YT_total_spending_by_location = Number(DATA['YT']['cost']);
var YT_spending_per_capita = Number(DATA['YT']['cost']/33897);

var NT_total_spending_by_location = Number(DATA['NT']['cost']);
var NT_spending_per_capita = Number(DATA['NT']['cost']/41462);

var NU_total_spending_by_location = Number(DATA['NU']['cost']);
var NU_spending_per_capita = Number(DATA['NU']['cost']/31906);

