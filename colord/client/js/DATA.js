var xmlHttp = new XMLHttpRequest();
var URL = "http://127.0.0.1:9000/api/all";
xmlHttp.open( "GET", URL, false );
xmlHttp.send( null );
var DATA = JSON.parse(xmlHttp.responseText);

var CA_total_spending_by_location = Math.round(Number(DATA.totalCost/1000000));
var CA_proj = Math.round(Number(DATA.totalProj));
var CA_spending_per_capita = Math.round(Number(DATA.totalCost/35160000));
var CA_green = Math.round(Number(DATA.totalGreen/1000000));
var CA_transit = Math.round(Number(DATA.totalTransit/1000000));
var CA_social = Math.round(Number(DATA.totalSocial/1000000));

var NL_total_spending_by_location = Math.round(Number(DATA['NL']['cost']/1000000));
var NL_spending_per_capita = Math.round(DATA['NL']['cost']/526977);
var NL_green = Math.round(DATA['NL']['greenTot']/1000000);
var NL_transit = Math.round(DATA['NL']['transitTot']/1000000);
var NL_social = Math.round(DATA['NL']['socialTot']/1000000);

var PE_total_spending_by_location = Math.round(Number(DATA['PE']['cost']/1000000));
var PE_spending_per_capita = Math.round(DATA['PE']['cost']/146283);
var PE_green = Math.round(DATA['PE']['greenTot']/1000000);
var PE_transit = Math.round(DATA['PE']['transitTot']/1000000);
var PE_social = Math.round(DATA['PE']['socialTot']/1000000);

var NS_total_spending_by_location = Math.round(Number(DATA['NS']['cost']/1000000));
var NS_spending_per_capita = Math.round(DATA['NS']['cost']/942926);
var NS_green = Math.round(DATA['NS']['greenTot']/1000000);
var NS_transit = Math.round(DATA['NS']['transitTot']/1000000);
var NS_social = Math.round(DATA['NS']['socialTot']/1000000);

var NB_total_spending_by_location = Math.round(Number(DATA['NB']['cost']/1000000));
var NB_spending_per_capita = Math.round(DATA['NB']['cost']/753914);
var NB_green = Math.round(DATA['NB']['greenTot']/1000000);
var NB_transit = Math.round(DATA['NB']['transitTot']/1000000);
var NB_social = Math.round(DATA['NB']['socialTot']/1000000);

var QC_total_spending_by_location = Math.round(Number(DATA['QC']['cost']/1000000));
var QC_spending_per_capita = Math.round(DATA['QC']['cost']/8215000);
var QC_green = Math.round(DATA['QC']['greenTot']/1000000);
var QC_transit = Math.round(DATA['QC']['transitTot']/1000000);
var QC_social = Math.round(DATA['QC']['socialTot']/1000000);

var ON_total_spending_by_location = Math.round(Number(DATA['ON']['cost']/1000000));
var ON_spending_per_capita = Math.round(DATA['ON']['cost']/13600000);
var ON_green = Math.round(DATA['ON']['greenTot']/1000000);
var ON_transit = Math.round(DATA['ON']['transitTot']/1000000);
var ON_social = Math.round(DATA['ON']['socialTot']/1000000);

var MB_total_spending_by_location = Math.round(Number(DATA['MB']['cost']/1000000));
var MB_spending_per_capita = Math.round(DATA['MB']['cost']/1282000);
var MB_green = Math.round(DATA['MB']['greenTot']/1000000);
var MB_transit = Math.round(DATA['MB']['transitTot']/1000000);
var MB_social = Math.round(DATA['MB']['socialTot']/1000000);

var AB_total_spending_by_location = Math.round(Number(DATA['AB']['cost']/1000000));
var AB_spending_per_capita = Math.round(DATA['AB']['cost']/4146000);
var AB_green = Math.round(DATA['AB']['greenTot']/1000000);
var AB_transit = Math.round(DATA['AB']['transitTot']/1000000);
var AB_social = Math.round(DATA['AB']['socialTot']/1000000);

var SK_total_spending_by_location = Math.round(Number(DATA['SK']['cost']/1000000));
var SK_spending_per_capita = Math.round(DATA['SK']['cost']/1130000);
var SK_green = Math.round(DATA['SK']['greenTot']/1000000);
var SK_transit = Math.round(DATA['SK']['transitTot']/1000000);
var SK_social = Math.round(DATA['SK']['socialTot']/1000000);

var BC_total_spending_by_location = Math.round(Number(DATA['BC']['cost']/1000000));
var BC_spending_per_capita = Math.round(DATA['BC']['cost']/4631000);
var BC_green = Math.round(DATA['BC']['greenTot']/1000000);
var BC_transit = Math.round(DATA['BC']['transitTot']/1000000);
var BC_social = Math.round(DATA['BC']['socialTot']/1000000);

var YT_total_spending_by_location = Math.round(Number(DATA['YT']['cost']/1000000));
var YT_spending_per_capita = Math.round(DATA['YT']['cost']/33897);
var YT_green = Math.round(DATA['YT']['greenTot']/1000000);
var YT_transit = Math.round(DATA['YT']['transitTot']/1000000);
var YT_social = Math.round(DATA['YT']['socialTot']/1000000);

var NT_total_spending_by_location = Math.round(Number(DATA['NT']['cost']/1000000));
var NT_spending_per_capita = Math.round(DATA['NT']['cost']/41462);
var NT_green = Math.round(DATA['NT']['greenTot']/1000000);
var NT_transit = Math.round(DATA['NT']['transitTot']/1000000);
var NT_social = Math.round(DATA['NT']['socialTot']/1000000);

var NU_total_spending_by_location = Math.round(Number(DATA['NU']['cost']/1000000));
var NU_spending_per_capita = Math.round(DATA['NU']['cost']/31906);
var NU_green = Math.round(DATA['NU']['greenTot']/1000000);
var NU_transit = Math.round(DATA['NU']['transitTot']/1000000);
var NU_social = Math.round(DATA['NU']['socialTot']/1000000);
