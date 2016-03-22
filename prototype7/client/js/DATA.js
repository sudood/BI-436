var xmlHttp = new XMLHttpRequest();
var URL = "http://127.0.0.1:9000/api/all";
xmlHttp.open( "GET", URL, false );
xmlHttp.send( null );
var DATA = JSON.parse(xmlHttp.responseText);

var NL_total_spending_by_location = Math.round(Number(DATA['NL']['cost']));
var NL_spending_per_capita = Math.round(DATA['NL']['cost']/526977);

var PE_total_spending_by_location = Math.round(Number(DATA['PE']['cost']));
var PE_spending_per_capita = Math.round(DATA['PE']['cost']/146283);

var NS_total_spending_by_location = Math.round(Number(DATA['NS']['cost']));
var NS_spending_per_capita = Math.round(DATA['NS']['cost']/942926);

var NB_total_spending_by_location = Math.round(Number(DATA['NB']['cost']));
var NB_spending_per_capita = Math.round(DATA['NB']['cost']/753914);

var QC_total_spending_by_location = Math.round(Number(DATA['QC']['cost']));
var QC_spending_per_capita = Math.round(DATA['QC']['cost']/8215000);

var ON_total_spending_by_location = Math.round(Number(DATA['ON']['cost']));
var ON_spending_per_capita = Math.round(DATA['ON']['cost']/13600000);

var MB_total_spending_by_location = Math.round(Number(DATA['MB']['cost']));
var MB_spending_per_capita = Math.round(DATA['MB']['cost']/1282000);

var AB_total_spending_by_location = Math.round(Number(DATA['AB']['cost']));
var AB_spending_per_capita = Math.round(DATA['AB']['cost']/4146000);

var SK_total_spending_by_location = Math.round(Number(DATA['SK']['cost']));
var SK_spending_per_capita = Math.round(DATA['SK']['cost']/1130000);

var BC_total_spending_by_location = Math.round(Number(DATA['BC']['cost']));
var BC_spending_per_capita = Math.round(DATA['BC']['cost']/4631000);

var YT_total_spending_by_location = Math.round(Number(DATA['YT']['cost']));
var YT_spending_per_capita = Math.round(DATA['YT']['cost']/33897);

var NT_total_spending_by_location = Math.round(Number(DATA['NT']['cost']));
var NT_spending_per_capita = Math.round(DATA['NT']['cost']/41462);

var NU_total_spending_by_location = Math.round(Number(DATA['NU']['cost']));
var NU_spending_per_capita = Math.round(DATA['NU']['cost']/31906);

