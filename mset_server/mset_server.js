var server = require('http').createServer(handler);
var io = require('socket.io').listen(server);
var fs = require('fs');
var dbx = require("./mset_a.js");

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
    dbx.add_user(indata.b1,indata.b5,indata.b7,indata.b2,indata.b3,indata.b4,indata.b8,function(feedb) {
     console.log(feedb);  
     socket.emit('signupres',{restxt:'sign up response',data:feedb}); 
    });
  });

  socket.on('activationreq',function(indata){
    console.log("incoming activation req = "+indata);
    dbx.check_activation_code(indata.c1,indata.c2,function(feedb) {
     console.log(feedb);  
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

  socket.on('getcompstoriesreq',function(indata){
    console.log("incoming comp storires req");
    dbx.get_company_stories(indata.cid,function(feedb) {
     console.log(feedb);  
     socket.emit('getcompstoriesres',{restxt:'comp storires response',data:feedb}); 
    });
  });

  socket.on('admingetallcampsreq',function(){
    console.log("incoming admingetallcamps req");
    dbx.admin_get_all_campaigns(function(feedb) {
     console.log(feedb);  
     socket.emit('admingetallcampsres',{restxt:'all admin get all camps response',data:feedb}); 
    });
  });

  socket.on('admingetallcampsviastatereq',function(indata){
    console.log("incoming admingetallcampsviastate req");
    dbx.admin_get_all_campaigns_via_status(indata.ste,function(feedb) {
     console.log(feedb);  
     socket.emit('admingetallcampsviastateres',{restxt:'all admin get all camps via state response',data:feedb}); 
    });
  });

  socket.on('admingetallusersviastatereq',function(indata){
    console.log("incoming admingetallusersviastate req");
    dbx.admin_get_all_users_via_status(indata.ste,function(feedb) {
     console.log(feedb);  
     socket.emit('admingetallusersviastateres',{restxt:'all admin get all users via state response',data:feedb}); 
    });
  });

  socket.on('admingetallusersreq',function(){
    console.log("incoming admingetallusers req");
    dbx.admin_get_all_users(function(feedb) {
     console.log(feedb);  
     socket.emit('admingetallusersres',{restxt:'all admin get all users response',data:feedb}); 
    });
  });

  socket.on('admingetalltransreq',function(){
    console.log("incoming admingetalltrans req");
    dbx.admin_get_all_transactions(function(feedb) {
     console.log(feedb);  
     socket.emit('admingetalltransres',{restxt:'all admin get all trans response',data:feedb}); 
    });
  });

  socket.on('admingetalltransviatypereq',function(indata){
    console.log("incoming admingetalltransviatype req");
    dbx.admin_get_all_transactions_via_type(indata.ate,function(feedb) {
     console.log(feedb);  
     socket.emit('admingetalltransviatyperes',{restxt:'all admin get all trans response',data:feedb}); 
    });
  });

  socket.on('admingetcompaccreq',function(indata){
    console.log("incoming admingetcompacc req");
    dbx.get_comp_acc_x(indata,function(feedb) {
     console.log(feedb);  
     socket.emit('admingetcompaccres',{restxt:'admin comp acc response',data:feedb}); 
    });
  });

  socket.on('getchatheadsreq',function(indata){
    console.log("incoming getchatheads req");
    dbx.get_chats_heads(indata.id,function(feedb) {
     console.log(feedb);  
     socket.emit('getchatheadsres',{restxt:'get chat heads  response',data:feedb}); 
    });
  });


  socket.on('getchatmessreq',function(indata){
    console.log("incoming getchatmess req");
    dbx.get_chats(indata.ma,indata.mb,function(feedb) {
     console.log(feedb);  
     socket.emit('getchatmessres',{restxt:'get getchatmess response',data:feedb}); 
    });
  });

  socket.on('statsbackersvtimereq',function(){
    console.log("incoming statsbackersvtime req");
    dbx.stats_backers_v_time(function(feedb) {
     console.log(feedb);  
     socket.emit('statsbackersvtimeres',{restxt:'get statsbackersvtime response',data:feedb}); 
    });
  });

  socket.on('addfavreq',function(indata){
    console.log("incoming addfav req");
    dbx.add_fav_company(indata.cmpid,indata.uid,indata.unme,function(feedb) {
     console.log(feedb);  
     socket.emit('addfavres',{restxt:'add favourite response',data:feedb}); 
    });
  });

  socket.on('rmefavreq',function(indata){
    console.log("incoming rmefav req");
    dbx.remove_fav_company(indata.cmpid,indata.uid,indata.unme,function(feedb) {
     console.log(feedb);  
     socket.emit('rmefavres',{restxt:'remove favourite response',data:feedb}); 
    });
  });

  socket.on('chkiffavreq',function(indata){
    console.log("incoming chkiffav req");
    dbx.check_fav_company(indata.cmpid,indata.uid,indata.unme,function(feedb) {
     console.log(feedb);  
     socket.emit('chkiffavres',{restxt:'check if favourite response',data:feedb}); 
    });
  });

  socket.on('getinvaccreq',function(indata){
    console.log("incoming getinvacc req");
    dbx.get_inv_acc(indata.uid,function(feedb) {
     console.log(feedb);  
     socket.emit('getinvaccres',{restxt:'get investor account response',data:feedb}); 
    });
  });

  socket.on('getcompreq3',function(indata){
    console.log("incoming getcomp3 req");
    dbx.get_company(indata.cid,function(feedb) {
     console.log(feedb);  
     socket.emit('getcompres3',{restxt:'comp 3 response',data:feedb}); 
    });
  });

  socket.on('getcompaccreq3',function(indata){
    console.log("incoming getcompacc req");
    dbx.get_comp_acc_x(indata,function(feedb) {
     console.log(feedb);  
     socket.emit('getcompaccres3',{restxt:'comp acc 3 response',data:feedb}); 
    });
  });


  socket.on('sellshrsreq',function(indata){
    console.log("incoming sellshrs req");
    dbx.sell_ind_shares(indata,function(feedb) {
     console.log(feedb);  
     socket.emit('sellshrsres',{restxt:'comp sellshrs response',data:feedb}); 
    });
  });

  socket.on('buyindshrsreq',function(indata){
    console.log("incoming sellshrs req");
    dbx.buy_ind_shares(indata,function(feedb) {
     console.log(feedb);  
     socket.emit('buyindshrsres',{restxt:'comp buyindshrs response',data:feedb}); 
    });
  });

  socket.on('getcompaccreq5',function(indata){
    console.log("incoming getcompacc 5 req");
    dbx.get_comp_acc_x(indata,function(feedb) {
     console.log(feedb);  
     socket.emit('getcompaccres5',{restxt:'comp acc 5 response',data:feedb}); 
    });
  });

  socket.on('getmyfollowsetreq',function(indata){
    console.log("incoming getmyfollowset req");
    dbx.get_user_comp(indata.id,function(feedb) {
     console.log(feedb);  
     socket.emit('getmyfollowsetres',{restxt:'getmyfollowset response',data:feedb}); 
    });
  });

  socket.on('getfollowstoryreq',function(indata){
    console.log("incoming getmyfollowset req");
    dbx.get_user_comp(indata.id,function(feedb) {
     console.log(feedb);  
     socket.emit('getfollowstoryres',{restxt:'getmyfollowset response',data:feedb}); 
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

  socket.on('admincompstatereq',function(indata){
    console.log("incoming admincompstatereq req");
    dbx.change_camp_status(indata.cid,indata.code,function(feedb) {
     console.log(feedb);  
     socket.emit('admincompstateres',{restxt:'admincompstatereq response',data:feedb}); 
    });
  });

  socket.on('depositreq',function(indata){
    console.log("incoming deposit req");
    dbx.deposit_funds(indata.uid,indata.amount,indata.phone,function(feedb) {
     console.log(feedb);  
     socket.emit('depositres',{restxt:'deposit response',data:feedb}); 
    });
  });

  socket.on('getinvaccreq2',function(indata){
    console.log("incoming getinvacc req");
    dbx.get_inv_acc(indata.id,function(feedb) {
     console.log(feedb);  
     socket.emit('getinvaccres2',{restxt:'get investor account response',data:feedb}); 
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
      var fileloc = "/Volumes/MAC OS X/Applications/XAMPP/htdocs/mset/images/proj/"+filename;
      fs.writeFile(fileloc, imgdata, 'base64', function(err) {
        if(err){
            console.log(err);
        }
      });
    }
	  return filename;
  }

});                                                