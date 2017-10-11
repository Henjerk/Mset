var server = require('http').createServer(handler);
var io = require('socket.io').listen(server);
var fs = require('fs');
//var dbx1 = require("./profile.js");
var dbx = require("./mset_a.js");

//var dbx1 = require("./profile.js");

server.listen(6825);
console.log(" *** server listening on port 6825 *** ");

function handler(request, response){	
 console.log("connection == "+request.url); 
};

io.sockets.on('connection', function(socket){

  socket.on('loginreq',function(indata){
    console.log("incoming login req");
    dbx.login_user(indata.a1,indata.a2,function(feedb) {
     console.log(feedb);  
     socket.emit('loginres',{restxt:'login response',data:feedb}); 
    });
  });

  socket.on('signupreq',function(indata){
    console.log("incoming signup req = "+indata);
    dbx.add_user(indata.b1,indata.b5,indata.b7,indata.b2,indata.b3,indata.b4,function(feedb) {
     console.log(feedb);  
     socket.emit('signupres',{restxt:'sign up response',data:feedb}); 
    });
  });

  socket.on('activationreq',function(indata){
    console.log("incoming activation req = "+indata);
    dbx.check_activation_code(indata.c1,indata.c2,function(feedb) {
     console.log(feedb+"myfeed");  
     socket.emit('activationres',{restxt:'activation response',data:feedb}); 
    });
  });

  socket.on('compregreq',function(indata){
    console.log("incoming company register req = "+indata);
    var logox = save_image(indata.e3);
    var bannerx = save_image(indata.e9); 
    dbx.add_company(indata.e1,indata.e2,indata.e5,indata.e6,indata.e10,indata.e7,bannerx,logox,indata.e17,indata.e11,indata.e12,indata.e4,indata.e13,indata.e15,indata.e14,indata.e8,function(feedb) {
     console.log(feedb);  
     socket.emit('compregres',{restxt:'company registration response',data:feedb}); 
    });
  });


  socket.on('getallcompreq',function(){
    console.log("incoming getallcomp req");
    dbx.get_all_companies(function(feedb) {
     console.log(feedb);  
     socket.emit('getallcompres',{restxt:'all companies response',data:feedb}); 
    });
  });

  socket.on('getcompaccreq',function(indata){
    console.log("incoming getcompacc req");
    dbx.get_comp_acc_x(indata,function(feedb) {
     console.log(feedb);  
     socket.emit('getcompaccres',{restxt:'comp acc response',data:feedb}); 
    });
  });

  socket.on('getfeaturedcompsreq',function(){
    console.log("incoming featured req");
    dbx.get_all_featured_companies(function(feedb) {
     console.log(feedb);  
     socket.emit('getfeaturedres',{restxt:'comp acc response',data:feedb}); 
    });
  });

  socket.on('getexplorecompsreq',function(indata){
    console.log("incoming explore req");
    dbx.get_all_explore_companies(indata,function(feedb) {
     console.log(feedb);  
     socket.emit('getexploreres',{restxt:'comp acc response',data:feedb}); 
    });
  });

  socket.on('getcompaccreq2',function(indata){
    console.log("incoming getcompacc req");
    dbx.get_comp_acc_x(indata,function(feedb) {
     console.log(feedb);  
     socket.emit('getcompaccres2',{restxt:'comp acc 2 response',data:feedb}); 
    });
  });

  socket.on('getcompxaccreq',function(indata){
    console.log("incoming getcompxacc req");
    dbx.get_comp_acc_x(indata,function(feedb) {
     console.log(feedb);  
     socket.emit('getcompxaccres',{restxt:'compx acc response',data:feedb}); 
    });
  });

  socket.on('getcompreq',function(indata){
    console.log("incoming getcomp req");
    dbx.get_company(indata.cid,function(feedb) {
     console.log(feedb);  
     socket.emit('getcompres',{restxt:'comp response',data:feedb}); 
    });
  });

  socket.on('buyshrsreq',function(indata){
    console.log("incoming buy shares req");
    var trncst = indata.tx+50;
    dbx.validate_buy_params(trncst,indata.ui,indata.px,indata.ci,indata.sx,indata.tx,indata.nm,function(feedb) {
     console.log(feedb);  
     socket.emit('buyshrsres',{restxt:'buy shares response',data:feedb}); 
    });
  });

   socket.on('buysindhrsreq',function(indata){
    console.log("incoming ind buy shares req");
    var trncst = indata.tx+50;
    dbx.validate_ind_buy_params(trncst,indata.ui,indata.px,indata.ci,indata.sx,indata.tx,indata.nm,function(feedb) {
     console.log(feedb);  
     socket.emit('buyindshrsres',{restxt:'buy individual shares response',data:feedb}); 
    });
  });

  socket.on('cresessreq',function(indata){
    console.log("incoming create buy session req");
    dbx.generate_buy_session(indata,function(feedb) {
     console.log(feedb);  
     socket.emit('cresessres',{restxt:'buy session response',data:feedb}); 
    });
  });

  socket.on('mycompreq',function(indata){
    console.log("incoming my companies req");
    dbx.get_my_companies(indata.id,function(feedb) {
     console.log(feedb);  
     socket.emit('mycompres',{restxt:'my companies response',data:feedb}); 
    });
  });

  socket.on('newstroyreq',function(indata){
    console.log("incoming new story req");
    var storypic = save_image(indata.pic);
    dbx.add_story(indata.story,storypic,indata.cmp,function(feedb) {
     console.log(feedb);  
     socket.emit('newstroyres',{restxt:'new story response',data:feedb}); 
    });
  });

  socket.on('userreq',function(indata){
    console.log("incoming userdata");
    dbx.get_user_info(indata,function(feedb) {
     console.log(feedb);  
     socket.emit('userres',{restxt:'user response',data:feedb}); 
    });
  });

    socket.on('compregreq',function(indata){
    console.log("incoming company register req = "+indata);
    var logox = save_image(indata.e3);
    var bannerx = save_image(indata.e9); 
    dbx.add_company(indata.e1,indata.e2,indata.e5,indata.e6,indata.e10,indata.e7,bannerx,logox,indata.e17,indata.e11,indata.e12,indata.e4,indata.e13,indata.e15,indata.e14,indata.e8,function(feedb) {
     console.log(feedb);  
     socket.emit('compregres',{restxt:'company registration response',data:feedb}); 
    });
  });

    socket.on('activationreq',function(indata){
    console.log("incoming activation req = "+indata);
    dbx.check_activation_code(indata.c1,indata.c2,function(feedb) {
     console.log(feedb);  
     socket.emit('activationres',{restxt:'activation response',data:feedb}); 
    });
  });

      socket.on('getcompreq5',function(indata){
    console.log("incoming getcomp5 req");
    dbx.get_company(indata,function(feedb) {
     console.log(feedb);  
     socket.emit('getcompres5',{restxt:'comp response',data:feedb}); 
    });
  });

    socket.on('getcompinforeq',function(indata){
    console.log("incoming getcompinfor req");
    dbx.get_company_info(indata,function(feedb) {
    console.log(feedb);  
    socket.emit('getcompinfores',{restxt:'comp response',data:feedb}); 
    });
  });

     socket.on('getalltransviaidreq',function(indata){
    console.log("incoming admingetalltransviaid req");
    dbx.admin_get_all_transactions_via_id(indata,function(feedb) {
     console.log(feedb);  
     socket.emit('getalltransviaidres',{restxt:' get all trans response',data:feedb}); 
    });
  });


  function generateID_B_X(nx){
	  var text = "";
	  var possible = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	  for( var i=0; i<nx; i++ ){
	    if(i==7){
          text += possible.charAt(Math.floor(Math.random() * possible.length))+"553mb4ty4";
	    }else{
          text += possible.charAt(Math.floor(Math.random() * possible.length));
	    }
	  }
	  var dt = new Date();
	  return text+dt.getSeconds();
  }

  function save_image(imgdata){
    if(imgdata==""||imgdata==null||imgdata==" "){
      var filename = "";
    }else{
      var filename = generateID_B_X(15)+".png";
      var fileloc = "/Volumes/MacintoshHD/Applications/XAMPP/htdocs/mset/images/proj/"+filename;
      fs.writeFile(fileloc, imgdata, 'base64', function(err) {
        if(err){
            console.log(err);
        }
      });
    }
	  return filename;
  }

});                                                