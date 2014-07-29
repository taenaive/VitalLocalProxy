var express = require('express');
var router = express.Router();
var http = require('http');

/* GET home page. */
router.get('/', function(req, res) {
  	var sig = req.body;
  	 console.log(sig);
	//The url we want is: '127.0.0.1:9233/WelchAllyn/Device/GetDevices'
	var options = {
	  host: '127.0.0.1:9233',
	  path: sig,
	};
	var callback = function(response) {
	  var str = '';
	  //another chunk of data has been recieved, so append it to `str`
	  response.on('data', function (chunk) {
	    str += chunk;
	  });
	  //the whole response has been recieved, so we just print it out here
	  response.on('end', function () {
	    console.log(str);
	    res.send(str);	
	  });
	}
	http.request(options, callback).end();

	  //res.render('index', { title: 'Express' });
	});

module.exports = router;
