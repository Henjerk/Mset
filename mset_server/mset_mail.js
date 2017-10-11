var api_key = 'key-7980c1c4366ab5de828772d045822836';
var domain = 'victoryuganda.com';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

exports.send_mail = function(mto,mfrom,mtext,msubj,callback){		
	var data = {
		from: mfrom,
		to: mto,
		subject: msubj,
		text: mtext
	};	 
    mailgun.messages().send(data, function (error, body) {
    	if(error){
            console.log(error);
    	}else{
          	console.log(body);
		    console.log(data);
		    callback(body);
    	}
    });	
}
