var express = require('express');
var app = express();
var server = require('http').Server(app);
var request = require('request');
var fs = require("fs");
var Q = require("q");
var router = express.Router();
var port = 9000;


// FOR REQUIRING LOCAL JAVASCRIPT FILES.
var dictCities = {};
var started = false;

var startUp = function(){
  var provinces = ["AB", "BC", "MB", "NB", "NL", "NT", "NS", "NU", "ON", "PE", "QC", "SK", "YT"];
  var the_promises = [];

  for (var i = 0; i < provinces.length; i++){
    var csv;
    var fileName = "../DataSet/json/" + provinces[i] + ".json";
    var temp = provinces[i];
    if (!fs.existsSync(fileName)) {
      switch (provinces[i]) {
        case "AB":
        csv = '../DataSet/csv/alberta-eng.csv';
        break;
        case "BC":
        csv = '../DataSet/csv/british-columbia-colombie-britannique-eng.csv';
        break;
        case "MB":
        csv = '../DataSet/csv/manitoba-eng.csv';
        break;
        case "NB":
        csv = '../DataSet/csv/new-brunswick-nouveau-brunswick-eng.csv';
        break;
        case "NL":
        csv = '../DataSet/csv/newfoundland-and-labrador-terre-neuve-et-labrador-eng.csv';
        break;
        case "NT":
        csv = '../DataSet/csv/northwest-territories-territoires-du-nord-ouest-eng.csv';
        break;
        case "NS":
        csv = '../DataSet/csv/nova-scotia-nouvelle-ecosse-eng.csv';
        break;
        case "NU":
        csv = '../DataSet/csv/nunavut-eng.csv';
        break;
        case "ON":
        csv = '../DataSet/csv/ontario-eng.csv';
        break;
        case "PE":
        csv = '../DataSet/csv/prince-edward-island-ile-du-prince-edouard-eng.csv';
        break;
        case "QC":
        csv = '../DataSet/csv/quebec-eng.csv';
        break;
        case "SK":
        csv = '../DataSet/csv/saskatchewan-eng.csv';
        break;
        case "YT":
        csv = '../DataSet/csv/yukon-eng.csv';
        break;
      }
      the_promises.push(writeData(temp, csv, fileName));
    }
    else{
      the_promises.push(readData(temp, fileName));
    }
  }
  return Q.all(the_promises).then(function(){
    dictCities["totalCost"] = 0;
    dictCities["totalProj"] = 0;
    dictCities["totalCitiesReq"] = 0;
    dictCities["totalGreen"] = 0;
    dictCities["totalTransit"] = 0;
    dictCities["totalSocial"] = 0;
    dictCities["totalMisc"] = 0;
    Object.keys(dictCities).forEach(function(key) {
      if(key != "totalCost" && key != "totalProj" && key !="totalCitiesReq" && key !="totalGreen" && key !="totalTransit" && key !="totalSocial" && key !="totalMisc"){
        dictCities["totalCost"] += parseFloat(dictCities[key].cost);
        dictCities["totalProj"] += parseFloat(dictCities[key].proj);
        dictCities["totalCitiesReq"] += parseFloat(dictCities[key].numCities);
        dictCities["totalGreen"] += parseFloat(dictCities[key].greenTot);
        dictCities["totalTransit"] += parseFloat(dictCities[key].transitTot);
        dictCities["totalSocial"] += parseFloat(dictCities[key].socialTot);
        dictCities["totalMisc"] += parseFloat(dictCities[key].miscTot);
      }
    });
    dictCities["totalCost"] = Math.round(dictCities["totalCost"]);
    dictCities["totalProj"] = Math.round(dictCities["totalProj"]);
    dictCities["totalCitiesReq"] = Math.round(dictCities["totalCitiesReq"]);
    dictCities["totalGreen"] = Math.round(dictCities["totalGreen"]);
    dictCities["totalTransit"] = Math.round(dictCities["totalTransit"]);
    dictCities["totalSocial"] = Math.round(dictCities["totalSocial"]);
    dictCities["totalMisc"] = Math.round(dictCities["totalMisc"]);
  });
}

// FOR READING IN DATA FROM FILESYSTEM.
var readData = function(temp, json) {
  var deferred = Q.defer();
  fs.readFile(json, 'utf8', function (err,data) {
    dictCities[temp] = JSON.parse(data);
    // Only for adding associations
    // loadUtil(dictCities,temp).then(function(result){
    //   var newName = json + "_reloaded";
    //   fs.writeFile(newName, JSON.stringify(result), "utf8");
    // })
    deferred.resolve(); // fulfills the promise with `data` as the value
  })
  return deferred.promise; // the promise is returned
}

// Does not work in bulk
var writeData = function(temp, csv, json){
  var deferredWD = Q.defer();
  fs.readFile(csv, 'utf8', function (err,data1) {
    var allTextLines = data1.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');
    var lines = {};
    var provinceSpent = 0; var totalApps = 0; var provCities = 0;
    var wcPromises = [];
    for (var i = 1; i < allTextLines.length; i++) {
      var data = allTextLines[i].split(',');
      if (data.length == headers.length) {
        var tarr = [];
        for (var j = 0; j < headers.length; j++) {
          tarr.push(data[j]);
        }
        provinceSpent += parseFloat(tarr[2]);

        if(lines[tarr[0]] == undefined){
          wcPromises.push(grepCoord(tarr[0], temp));
          lines[tarr[0]] = {
            projects: [{title: tarr[1].trim(), cost: parseFloat(tarr[2])}],
            sum: parseFloat(tarr[2]),
            numApps: 1,
          };
          totalApps++;
          provCities++;
        }
        else{
          // do something for existing ones.
          lines[tarr[0]].projects.push({title: tarr[1].trim(), cost: parseFloat(tarr[2])});
          lines[tarr[0]].sum += parseFloat(tarr[2]);
          lines[tarr[0]].numApps++;
          totalApps++;
        }
      }
    }

    dictCities[temp] = {data: lines, cost: provinceSpent.toFixed(2), proj: totalApps, numCities: provCities};
    Q.all(wcPromises).then(function(greppedPromises){
      receiveCoord(temp, greppedPromises).then(function(){
        fs.writeFile(json, JSON.stringify(dictCities[temp]), "utf8");
        deferredWD.resolve();
        return deferredWD.promise;
      });
    });
  });
}

var receiveCoord = function(prov, coordPromises){
  var deferred = [];
  for (var i in coordPromises){
    var deferredP = Q.defer();
    var parsed = JSON.parse(coordPromises[i]).geonames[0];
    if(parsed != undefined){
      if(dictCities[prov].data[parsed.name] != undefined){
        dictCities[prov].data[parsed.name].lat = parseFloat(parsed.lat);
        dictCities[prov].data[parsed.name].lng = parseFloat(parsed.lng);
        dictCities[prov].data[parsed.name].pop = parsed.population;
      }
      else{
        dictCities[prov].data[parsed.toponymName].lat = parseFloat(parsed.lat);
        dictCities[prov].data[parsed.toponymName].lng = parseFloat(parsed.lng);
        dictCities[prov].data[parsed.toponymName].pop = parsed.population;
      }
    }
    deferredP.resolve();
    deferred.push(deferredP);
  }
  return Q.all(deferred);
}

var grepCoord = function(city, prov){
  var deferred = Q.defer();

  var adminCode1;
  // Get correct province.
  switch (prov) {
    case "AB":
    adminCode1 = "01";
    break;
    case "BC":
    adminCode1 = "02";
    break;
    case "MB":
    adminCode1 = "03";
    break;
    case "NB":
    adminCode1 = "04";
    break;
    case "NL":
    adminCode1 = "05";
    break;
    case "NT":
    adminCode1 = "13";
    break;
    case "NS":
    adminCode1 = "07";
    break;
    case "NU":
    adminCode1 = "14";
    break;
    case "ON":
    adminCode1 = "08";
    break;
    case "PE":
    adminCode1 = "09";
    break;
    case "QC":
    adminCode1 = "10";
    break;
    case "SK":
    adminCode1 = "11";
    break;
    case "YT":
    adminCode1 = "12";
    break;
  }

  var query = "http://api.geonames.org/searchJSON?name_equals=" + city + "&adminCode1=" + adminCode1 + "&featureClass=P&orderby=population&maxRows=1&country=CA&username=bi436";
  request(query, function(error, response, body){
    if(!error && response.statusCode == 200){
      deferred.resolve(body);
    }
    else{
      console.log(query);
      console.log("Broken" + error);
      deferred.resolve(body);
    }
  })
  return deferred.promise;
}

var loadUtil = function(dict, prov){
  var deferred = Q.defer();
  var green = 0; var transit = 0; var social = 0; var misc = 0;
  var greenKeywords = ["lagoon", "pump", "beach", "creek", "wastewater", "park", "forest", "grasslands", "water", "sewage", "plant", "clean", "energy", "culvert", "brook", "trail", "sanitation", "pumping", "well", "sewer", "reservoir", "recycling"];
  var transitKeywords = ["terminal", "airport", "highway", "road", "avenue", "street", "route", "port", "transit", "subway", "boulevard", "station", "rail", "Paving", "bridge", "bike", "path", "lane"];
  var socialKeywords = ["housing", "senior", "care", "library", "ymca", "centre", "hall", "museum", "conservatory", "heritage", "community", "pool", "theatre", "family", "recreation"];
  // For each key (city) in data
  for (var key in dict[prov].data){
    // For each project within each city within each province
    for (var obj1 = 0; obj1 < dict[prov].data[key].projects.length; obj1++){
      var flagG = false;
      var flagT = false;
      var flagS = false;
      var assoc = [];
      var tempLine = dict[prov].data[key].projects[obj1].title.trim().toLowerCase().split(" ");
      // Associate (keywords with association)
      for (var l = 0; l < tempLine.length; l++){
        if(flagG && flagT && flagS){break;}
        if(!flagG){
          if(greenKeywords.indexOf(tempLine[l]) > -1){
            assoc.push("Green");
            flagG = true;
            green += parseFloat(dict[prov].data[key].projects[obj1].cost);
          }
        }
        if(!flagT){
          if(transitKeywords.indexOf(tempLine[l]) > -1){
            assoc.push("Transit");
            flagT = true;
            transit += parseFloat(dict[prov].data[key].projects[obj1].cost);
          }
        }
        if(!flagS){
          if(socialKeywords.indexOf(tempLine[l]) > -1){
            assoc.push("Social");
            flagS = true;
            social += parseFloat(dict[prov].data[key].projects[obj1].cost);
          }
        }
      }
      if(assoc.length == 0){
        misc+= parseFloat(dict[prov].data[key].projects[obj1].cost);
      }
      dict[prov].data[key].projects[obj1].association = assoc;
    }
  }
  debugger;
  dict[prov].greenTot = Math.round(green);
  dict[prov].transitTot = Math.round(transit);
  dict[prov].socialTot = Math.round(social);
  dict[prov].miscTot = Math.round(misc);
  deferred.resolve(dict[prov]);
  return deferred.promise;
}

// ROUTING
router.route('/province/:id')

// get example
.get(function(req, res) {
  if(started){
    res.send(JSON.stringify(dictCities[req.params.id]));
  }
  else{
    startUp().then(function(){
      started = true;
      res.send(JSON.stringify(dictCities[req.params.id]));
    })
  }
});

router.route('/all')

// get example
.get(function(req, res) {
  if(started){
    res.send(JSON.stringify(dictCities));
  }
  else{
    startUp().then(function(){
      started = true;
      res.send(JSON.stringify(dictCities));
    })
  }
});

router.route('/load')

// get example
.get(function(req, res) {
  if(started){
    res.send(JSON.stringify(dictCities));
  }
  else{
    startUp().then(function(){
      started = true;
      res.send(JSON.stringify(dictCities));
    })
  }
});

// router.route('/contact-form')
//
// .post(function(req,res){
//   var transporter = nodemailer.createTransport('smtps://@smtp.gmail.com');
//   var data = req.body;
//
//   transporter.sendMail({
//     from: 'unavfydp@gmail.com',
//     cc: data.contactEmail,
//     to: 'unavfydp@gmail.com',
//     subject: 'Support Message: ' + data.contactReason + ' from ' + data.contactName,
//     text: data.contactMsg
//   })
//   res.json(data);
//public trans, green infra, and then social infra, other

// });


// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!'});
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

app.use(express.static('client'));
app.get('/*', function(req, res, next){
  var url = req.url;
  if(!url.match(/\.\.+?\//)){
    res.sendFile(req.url, {root:'./client'});
  } else if(url === '/'){
    next();
  } else {
    res.status(404).send('NOT FOUND');
  }
});
app.get('/', function(req, res){
  res.sendFile('index.html', {root:'./client'});
});
module.exports.listen = function(){
  server.listen(port, function(){
    console.log('Server listening on port', port);
  });
};
app.listen(port, function() {
  console.log("BI-436 Server Listening on http://127.0.0.1:9000")
});
