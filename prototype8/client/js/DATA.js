var xmlHttp = new XMLHttpRequest();
var URL = "http://127.0.0.1:9000/api/all";
xmlHttp.open( "GET", URL, false );
xmlHttp.send( null );
var DATA = JSON.parse(xmlHttp.responseText);

var NL_total_spending_by_location = Math.round(Number(DATA['NL']['cost']));
var NL_spending_per_capita = Math.round(DATA['NL']['cost']/526977);
var NL_green = Math.round(DATA['NL']['greenTot']);
var NL_transit = Math.round(DATA['NL']['transitTot']);
var NL_social = Math.round(DATA['NL']['socialTot']);

var PE_total_spending_by_location = Math.round(Number(DATA['PE']['cost']));
var PE_spending_per_capita = Math.round(DATA['PE']['cost']/146283);
var PE_green = Math.round(DATA['PE']['greenTot']);
var PE_transit = Math.round(DATA['PE']['transitTot']);
var PE_social = Math.round(DATA['PE']['socialTot']);

var NS_total_spending_by_location = Math.round(Number(DATA['NS']['cost']));
var NS_spending_per_capita = Math.round(DATA['NS']['cost']/942926);
var NS_green = Math.round(DATA['NS']['greenTot']);
var NS_transit = Math.round(DATA['NS']['transitTot']);
var NS_social = Math.round(DATA['NS']['socialTot']);

var NB_total_spending_by_location = Math.round(Number(DATA['NB']['cost']));
var NB_spending_per_capita = Math.round(DATA['NB']['cost']/753914);
var NB_green = Math.round(DATA['NB']['greenTot']);
var NB_transit = Math.round(DATA['NB']['transitTot']);
var NB_social = Math.round(DATA['NB']['socialTot']);

var QC_total_spending_by_location = Math.round(Number(DATA['QC']['cost']));
var QC_spending_per_capita = Math.round(DATA['QC']['cost']/8215000);
var QC_green = Math.round(DATA['QC']['greenTot']);
var QC_transit = Math.round(DATA['QC']['transitTot']);
var QC_social = Math.round(DATA['QC']['socialTot']);

var ON_total_spending_by_location = Math.round(Number(DATA['ON']['cost']));
var ON_spending_per_capita = Math.round(DATA['ON']['cost']/13600000);
var ON_green = Math.round(DATA['ON']['greenTot']);
var ON_transit = Math.round(DATA['ON']['transitTot']);
var ON_social = Math.round(DATA['ON']['socialTot']);

var MB_total_spending_by_location = Math.round(Number(DATA['MB']['cost']));
var MB_spending_per_capita = Math.round(DATA['MB']['cost']/1282000);
var MB_green = Math.round(DATA['MB']['greenTot']);
var MB_transit = Math.round(DATA['MB']['transitTot']);
var MB_social = Math.round(DATA['MB']['socialTot']);

var AB_total_spending_by_location = Math.round(Number(DATA['AB']['cost']));
var AB_spending_per_capita = Math.round(DATA['AB']['cost']/4146000);
var AB_green = Math.round(DATA['AB']['greenTot']);
var AB_transit = Math.round(DATA['AB']['transitTot']);
var AB_social = Math.round(DATA['AB']['socialTot']);

var SK_total_spending_by_location = Math.round(Number(DATA['SK']['cost']));
var SK_spending_per_capita = Math.round(DATA['SK']['cost']/1130000);
var SK_green = Math.round(DATA['SK']['greenTot']);
var SK_transit = Math.round(DATA['SK']['transitTot']);
var SK_social = Math.round(DATA['SK']['socialTot']);

var BC_total_spending_by_location = Math.round(Number(DATA['BC']['cost']));
var BC_spending_per_capita = Math.round(DATA['BC']['cost']/4631000);
var BC_green = Math.round(DATA['BC']['greenTot']);
var BC_transit = Math.round(DATA['BC']['transitTot']);
var BC_social = Math.round(DATA['BC']['socialTot']);

var YT_total_spending_by_location = Math.round(Number(DATA['YT']['cost']));
var YT_spending_per_capita = Math.round(DATA['YT']['cost']/33897);
var YT_green = Math.round(DATA['YT']['greenTot']);
var YT_transit = Math.round(DATA['YT']['transitTot']);
var YT_social = Math.round(DATA['YT']['socialTot']);

var NT_total_spending_by_location = Math.round(Number(DATA['NT']['cost']));
var NT_spending_per_capita = Math.round(DATA['NT']['cost']/41462);
var NT_green = Math.round(DATA['NT']['greenTot']);
var NT_transit = Math.round(DATA['NT']['transitTot']);
var NT_social = Math.round(DATA['NT']['socialTot']);

var NU_total_spending_by_location = Math.round(Number(DATA['NU']['cost']));
var NU_spending_per_capita = Math.round(DATA['NU']['cost']/31906);
var NU_green = Math.round(DATA['NU']['greenTot']);
var NU_transit = Math.round(DATA['NU']['transitTot']);
var NU_social = Math.round(DATA['NU']['socialTot']);

