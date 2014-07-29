//unit test here
var http = require('http');

exports.Test = {
    "Verify WelchAlln is running": function (test) {
        test.expect(2);
        
	var testBuffer = null;
	
	//The url we want is: '127.0.0.1:9233/WelchAllyn/Device/GetDevices'
	var options = {
	  host: '127.0.0.1',
	  port:  9233,
	  path: '/WelchAllyn/Device/GetDevices'
	};
	callback = function(response) {console.log('callback called');
	  var str = '';
	  //another chunk of data has been recieved, so append it to `str`
	  response.on('data', function (chunk) {
	    str += chunk;
	  });
	  //the whole response has been recieved, so we just print it out here
	  response.on('end', function () {
	    console.log('Data Recieved from WlechAllyn: '+str);
	    testBuffer = str;	    
	  });
	}
	http.get("http://127.0.0.1:9233/WelchAllyn/Device/GetDevices", function(res) {
	if (res == null){console.log('null returned')}
    console.log("Received response: " + res.statusCode);
	});
	var server = http.request(options, callback);
        //soapSave.retrieve(data , callBackTest);
    server.on("error", function(e){
									  console.log("Got error: " + e.message);
									});

    setTimeout(function(){
        	
        	test.ok(testBuffer != null, "response from welchAllyn not found");//test passed
            test.equal(true, true, 'shoud pass');//future test
            test.done();
            server.end();
        }, 2000);
    //while(true){}
       
    }

}