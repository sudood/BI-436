var express = require('express');
var app = express();
var server = require('http').Server(app);
var request = require('request');
var fs = require("fs");

// // For requiring local javascript files.

// var algo = require('./astar.js');
// var graphDef = require('./graph_definition.js');

// For reading in data from filesystem.

// fs.readFile('data/coordinates/something.json', 'utf8', function (err,data) {
//   var geo_nodes = JSON.parse(data);
//   for (var ind in geo_nodes.features) {
//     g.addNode(g, geo_nodes.features[ind]);
//   }
// });

var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});
//
// router.route('/buildings')
//
// // get example
// .get(function(req, res) {
//   if (!fs.existsSync("./uwapi_results.json")) {
//     request('https://api.uwaterloo.ca/v2/buildings/list.geojson?key=2a7eb4185520ceff7b74992e7df4f55e', function (error, response, body) {
//       var BuildingResults = {};
//       if (!error && response.statusCode == 200) {
//         var inBuildings = JSON.parse(body);
//
//         for (var ind in inBuildings.features) {
//           if (ind != 0) {
//             BuildingResults[inBuildings.features[ind].properties.building_code] = {name: inBuildings.features[ind].properties.building_name, coordinates: inBuildings.features[ind].geometry.coordinates};
//           }
//         }
//       }
//       fs.writeFile( "uwapi_results.json", JSON.stringify(BuildingResults), "utf8");
//       res.send(JSON.stringify(BuildingResults));
//     })
//   }
// });

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


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

app.use(express.static('client'));

app.get('/*', function(req, res, next){
  var url = req.url;
  //Checking for urls like ../../passwd etc
  if(!url.match(/\.\.+?\//)){
    res.sendFile(req.url, {root:'./client'});
  } else if(url === '/'){
    next();
  } else {
    res.status(405).send('Did you try something naughty?');
  }
});

app.get('/', function(req, res){
  res.sendFile('index.html', {root:'./client'});
});

//Config checks process.env, otherwise sets to 9000
var port = process.env.PORT || 9000;

module.exports.listen = function(){
  server.listen(port, function(){
    console.log('Server listening on port', port);
  });
};
