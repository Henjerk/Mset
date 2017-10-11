// We need this to build our post string
var exports = module.exports={};

var querystring = require('querystring');
var https       = require('https');
// Your login credentials
var username = 'UNDERDOG';
var apikey   = 'cffef5d9033011a244866c3e6416c57e6417cb8018e9ad503ebc689f165922f4';

exports.send_sms=function(nx,xtxt,callback){
 if(nx.match(/^[0-9]+$/)==null){
  callback("invalid phone number --",nx);
 }else{ 
  if(nx.length==10){
   var nxx = nx.substring(0, 3); 
   if(nxx=="070"||nxx=="079"||nxx=="077"||nxx=="078"||nxx=="075"){
    var gn = "+256"+nx.substring(1, 10); 
    callback("good number",gn);
    sendMessage(gn,xtxt,function(resp){
      callback(resp);
    });
   }else{
    callback("invalid phone number -- ",nx);
   } 
  }else if(nx.length==12){
   var nxx = nx.substring(0, 5);  
   if(nxx=="25670"||nxx=="25679"||nxx=="25677"||nxx=="25678"||nxx=="25675"){
    //callback("good number",nx);
    var gn = "+"+nxx; 
    sendMessage(gn,xtxt,function(resp){
      callback(resp);
    });
   }else{
    callback("invalid phone number -- ",nx);
   } 
  }else{
   callback("invalid phone number -- ",nx);
  }
 }
}

function sendMessage(xnumber,xtext,callback) {
    
    // Define the recipient numbers in a comma separated string
    // Numbers should be in international format as shown
    var to = xnumber;
    
    // And of course we want our recipients to know what we really do
    var message = xtext;
    
    // Build the post string from an object
    
    var post_data = querystring.stringify({
        'username' : username,
        'to'       : to,
        'message'  : message
    });
    
    var post_options = {
        host   : 'api.africastalking.com',
        path   : '/version1/messaging',
        method : 'POST',
        
        rejectUnauthorized : false,
        requestCert        : true,
        agent              : false,
        
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Content-Length': post_data.length,
            'Accept': 'application/json',
            'apikey': apikey
        }
    };
    
    var post_req = https.request(post_options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            var jsObject   = JSON.parse(chunk);
            var recipients = jsObject.SMSMessageData.Recipients;
            if ( recipients.length > 0 ) {
                for (var i = 0; i < recipients.length; ++i ) {
                    var logStr  = 'number=' + recipients[i].number;
                    logStr     += ';cost='   + recipients[i].cost;
                    logStr     += ';status=' + recipients[i].status; // status is either "Success" or "error message"
                    //console.log(logStr);
                    callback(logStr);
                    }
                } else {
                    console.log('Error while sending: ' + jsObject.SMSMessageData.Message);
            }
        });
    });
    
    // Add post parameters to the http request
    post_req.write(post_data);
    
    post_req.end();
}