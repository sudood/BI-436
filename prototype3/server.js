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
    dictCities["total"] = 0;
    Object.keys(dictCities).forEach(function(key) {
      if(key != "total"){
        dictCities["total"] += parseFloat(dictCities[key].cost);
      }
    });
  });
}

// FOR READING IN DATA FROM FILESYSTEM.

var readData = function(temp, json) {
  var deferred = Q.defer();
  fs.readFile(json, 'utf8', function (err,data) {
    dictCities[temp] = JSON.parse(data);
    deferred.resolve(); // fulfills the promise with `data` as the value
  })
  return deferred.promise; // the promise is returned
}

var writeData = function(temp, csv, json){
  var deferred = Q.defer();
  fs.readFile(csv, 'utf8', function (err,data) {
    processData(temp, data);
    fs.writeFile(json, JSON.stringify(dictCities[temp]), "utf8");
    deferred.resolve(); // fulfills the promise with `data` as the value
  });
  return deferred.promise;
}

var processData = function (prov, allText) {
  var allTextLines = allText.split(/\r\n|\n/);
  var headers = allTextLines[0].split(',');
  var lines = {};
  var provinceSpent = 0;

  for (var i = 1; i < allTextLines.length; i++) {
    var data = allTextLines[i].split(',');
    if (data.length == headers.length) {
      var tarr = [];
      for (var j = 0; j < headers.length; j++) {
        tarr.push(data[j]);
      }
      provinceSpent += parseFloat(tarr[2]);
      if(lines[tarr[0]] == undefined){
        lines[tarr[0]] = {
          projects: [{title: tarr[1], cost: parseFloat(tarr[2])}],
          sum: parseFloat(tarr[2]),
          numApps: 0
        };
      }
      else{
        // do something for existing ones.
        lines[tarr[0]].projects.push({title: tarr[1], cost: parseFloat(tarr[2])});
        lines[tarr[0]].sum += parseFloat(tarr[2]);
        lines[tarr[0]].numApps++;
      }
    }
  }
  dictCities[prov] = {data: lines, cost: provinceSpent.toFixed(2)};
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
// });


// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
 res.json({ message: 'hooray! welcome to our api!' });
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
  console.log("BI-436 Server Listening: http://127.0.0.1:9000")
});
