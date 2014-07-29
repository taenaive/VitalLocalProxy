var express = require('express');
var router = express.Router();
var http = require('http');

/* GET home page. */
router.get('/:name', function(req, res) {
  	//var sig = req.url;req.query;deviceid
  	// console.log('Sig value.. =' + req.params.name + req.query.deviceid);
	//The url we want is: '127.0.0.1:9233/WelchAllyn/Device/GetDevices'
	var qString = (req.query.deviceid === undefined) ? '' : ('?deviceid='+req.query.deviceid);
	//console.log('Query value =' + qString);
	var options = {
	  host: '127.0.0.1',
	  port:  9233,
	  path:  '/WelchAllyn/Device/'+req.params.name + qString
	};
	var callback = function(response) {
	  var str = '';
	  //another chunk of data has been recieved, so append it to `str`
	  response.on('data', function (chunk) {
	    str += chunk;
	  });
	  //the whole response has been recieved, so we just print it out here
	  response.on('end', function () {
	    //console.log(str);
	    res.send(str);	
	  });
	}
	var server=http.server =http.get(options, callback);
	server.on("error", function(e){
									  console.log("Got error: " + e.message);
									});	
	  //res.render('index', { title: 'Express' });
	});

module.exports = router;
