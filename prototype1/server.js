var express = require('express');
var app = express();
var server = require('http').Server(app);
var request = require('request');
var fs = require("fs");
var Q = require("q");
var router = express.Router();
var port = 9000;


var dictCities = {};

// fs.readFile('../DataSet/csv/alberta-test.csv', 'utf8', function (err,data) {
//   processData("AB", data);
//     // res.send(JSON.stringify(res));
// });

// FOR REQUIRING LOCAL JAVASCRIPT FILES.
// var algo = require('./astar.js');
// var graphDef = require('./graph_definition.js');

// FOR READING IN DATA FROM FILESYSTEM.
// fs.readFile('../DataSet/alberta-eng.csv', 'utf8', function (err,data) {
//   processData("AB", data);
//   // console.log(dictCities["AB"]);
// });
// fs.readFile('../DataSet/british-columbia-colombie-britannique-eng.csv', 'utf8', function (err,data) {
//   processData("BC", data);
// });
// fs.readFile('../DataSet/manitoba-eng.csv', 'utf8', function (err,data) {
//   processData("MB", data);
// });
// fs.readFile('../DataSet/new-brunswick-nouveau-brunswick-eng.csv', 'utf8', function (err,data) {
//   processData("NB", data);
// });
// fs.readFile('../DataSet/newfoundland-and-labrador-terre-neuve-et-labrador-eng.csv', 'utf8', function (err,data) {
//   processData("NL", data);
// });
// fs.readFile('../DataSet/northwest-territories-territoires-du-nord-ouest-eng.csv', 'utf8', function (err,data) {
//   processData("NT", data);
// });
// fs.readFile('../DataSet/nova-scotia-nouvelle-ecosse-eng.csv', 'utf8', function (err,data) {
//   processData("NS", data);
// });
// fs.readFile('../DataSet/nunavut-eng.csv', 'utf8', function (err,data) {
//   processData("NU", data);
// });
// fs.readFile('../DataSet/ontario-eng.csv', 'utf8', function (err,data) {
//   processData("ON", data);
// });
// fs.readFile('../DataSet/prince-edward-island-ile-du-prince-edouard-eng.csv', 'utf8', function (err,data) {
//   processData("PE", data);
// });
// fs.readFile('../DataSet/quebec-eng.csv', 'utf8', function (err,data) {
//   processData("QC", data);
// });
// fs.readFile('../DataSet/saskatchewan-eng.csv', 'utf8', function (err,data) {
//   processData("SK", data);
// });
// fs.readFile('../DataSet/yukon-eng.csv', 'utf8', function (err,data) {
//   processData("YT", data);
// });

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
  dictCities[prov] = {data: lines, cost: provinceSpent};
}

// ROUTING
router.route('/province/:id')

// get example
.get(function(req, res) {
  var fileName = "../DataSet/json/" + req.params.id + ".json";
  if (!fs.existsSync(fileName)) {
    fs.readFile('../DataSet/csv/alberta-eng.csv', 'utf8', function (err,data) {
      processData("AB", data);
      fs.writeFile(fileName, JSON.stringify(dictCities[req.params.id]), "utf8");
      res.send(JSON.stringify(dictCities[req.params.id]));
    });
  }
  else{
      fs.readFile(fileName, 'utf8', function (err,data) {
      if (err) {
        res.send(err);
      }
      res.send(data);
    })
  }
});

router.route('/all')

// get example
.get(function(req, res) {
  res.send(JSON.stringify(dictCities));
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
  console.log("BI-436 Server Listening on Port 9000")
});
