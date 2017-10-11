var exports = module.exports={};
var fs = require('fs');
var _ = require('underscore');
var moment = require('moment');
var mongoose = require('mongoose');
var cry = require('crypto');
var mailapi = require("./mset_mail.js");
var receiptz = require("./receipt.js");

mongoose.connect('mongodb://localhost/msetdb', function(err){
  if(err){
    console.log(err);
  }else{
    console.log('successfully connected to msetdb mongodb');
  }
});

var userSchema = mongoose.Schema({	
  userid:String,
  username:String,
  password:String,
  transPIN:String,
  phone:String,
  email:String,
  status:String,
  nationality:String,
  nationalID:String,
  crtstamp:String,
  prefs:Array,
  stime:{type:Date, default:Date.now}
});

var activateSchema = mongoose.Schema({	
  userid:String,
  acttoken:String,
  actcode:String,
  actstatus:String,
  stime:{type:Date, default:Date.now}
});

var companySchema = mongoose.Schema({	
  compid:String,
  compname:String,
  category:String,
  address:Object,
  pitchtext:String,
  videourl:String,
  description:String,
  banner:String,
  logo:String,
  userid:Object,
  target:String,
  period:Object,
  compregid:String,
  sharepercent:String,
  cashpolicy:String,
  crtstamp:String,
  otherdetails:String,
  status:String,
  follow:Array,
  stime:{type:Date, default:Date.now}
});

var storySchema = mongoose.Schema({	
  compid:String,
  text:String,
  image:String,
  status:String,
  crtstamp:String,
  stime:{type:Date, default:Date.now}
});

var transactionSchema = mongoose.Schema({	
  transid:String,
  transtype:String,
  transtext:String,
  accountx:String,
  accounty:String,
  crtstamp:String,
  stime:{type:Date, default:Date.now}
});

var notificationSchema = mongoose.Schema({	
  src:Object,
  dest:Object,
  text:String,
  status:String,
  crtstamp:String,
  stime:{type:Date, default:Date.now}
});

var comp_accSchema = mongoose.Schema({	
  compid:String,
  shareprice:Number,
  avail_shares:Number,
  sold_shares:Number,
  credit:Number,
  owners:Array,
  status:String,
  stime:{type:Date, default:Date.now}
});

var invest_accSchema = mongoose.Schema({	
  userid:String,
  credit:Number,
  status:String,
  shares:Array,
  stime:{type:Date, default:Date.now}
});

var sessionSchema = mongoose.Schema({	
  userid:String,
  expire:String,
  stime:{type:Date, default:Date.now}
});

var logSchema = mongoose.Schema({	
  userid:String,
  logs:Array,
  stime:{type:Date, default:Date.now}
});

var categorySchema = mongoose.Schema({	
  catname:String,
  catimg:String,
  stime:{type:Date, default:Date.now}
});

var recieptSchema = mongoose.Schema({  
  accountid:String,
  recieptid:String,
  receiptpdf:String,
  transid:String,
  name:String,
  amount:String,
  otherdetails:Array,
  stime:{type:Date, default:Date.now}
});

var historySchema = mongoose.Schema({  
  accountx:String,
  compname:String,
  transid:String,
  transtype:String,
  otherdetails:Array,
  stime:{type:Date, default:Date.now}
});


var dbuser = mongoose.model('user',userSchema);
var dbact = mongoose.model('activation',activateSchema);
var dbcomp = mongoose.model('company',companySchema);
var dbstory = mongoose.model('story',storySchema);
var dbtrans = mongoose.model('transaction',transactionSchema);
var dbnots = mongoose.model('notification',notificationSchema);
var dbcompacc = mongoose.model('compacc',comp_accSchema);
var dbinvestacc = mongoose.model('investacc',invest_accSchema);
var dbsess = mongoose.model('session',sessionSchema);
var dblog = mongoose.model('log',logSchema);
var dbcat = mongoose.model('category',categorySchema);
var dbreciept = mongoose.model('reciept',recieptSchema);
var dbhistory = mongoose.model('history',historySchema);

function md5hash(string) {
  return cry.createHash('md5').update(string).digest('hex');
}

function sha512hash(string) {
  return cry.createHash('sha512').update(string).digest('hex');
}

function sha256hash(string) {
  return cry.createHash('sha256').update(string).digest('hex');
}

function generateID_A(nx){
  var text = "";
  var possible = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  for( var i=0; i<nx; i++ ){
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  var dt = new Date();
  return text+dt.getSeconds();
}

function generateID_B(nx){
  var text = "";
  var possible = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  for( var i=0; i<nx; i++ ){
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  var dt = new Date();
  return text+dt.getSeconds();
}

function generateID_C(nx){
	var token = cry.randomBytes(nx);
	return token.toString('hex');;
}


exports.add_user = function(xusername, xpassword, xphone, xemail, nation, nationid, callback){
  check_user(xemail,xphone,nationid,function(resp){
    if(resp==null){
	  var xuserid = "U"+generateID_A(9);
	  var xpin = generateID_A(6);
	  var xtoken = "AC"+generateID_A(7);
	  var xcode = "MA"+generateID_A(6);
	  var pinhash = md5hash(sha256hash(sha512hash(sha512hash(xpin)+"henjerher")));
	  var passkey = md5hash(sha512hash(sha256hash(sha512hash(xpassword)+"553m134ty4")));
	  var xstamp = new Date().getTime()/1000;
	  var addx = dbuser({userid:xuserid,username:xusername,password:passkey,transPIN:pinhash,phone:xphone,email:xemail,status:'pending',nationality:nation,nationalID:nationid,crtstamp:xstamp});
	  addx.save(function(err){
	    if(err){
	      console.log(err);
	    }else{
	      var xres = {};
	      xres.code = "1";
	      xres.message = "successfully added new user item";
	      xres.data = xuserid+"--"+xpin+"--"+xusername+"--"+xemail;
	      callback(xres);
	      add_investor_acc(xuserid);
	      mail_activation(xtoken,xusername,xpin,xcode,xemail);
	      set_activation_code(xuserid,xtoken,xcode);
	      var xdest = {};
	      xdest.id=xuserid;
	      xdest.name=xusername;
	      var xsrc = {};
	      xsrc.id='1001';
	      xsrc.name='MSET';
	      add_notification(xdest,xsrc,"Welcome "+xusername+" to MSET \nYour MSET journey has begun. Together we’re helping entrepreneurs everywhere bring their projects from rough sketches to reality.");
	    }
	  });
    }else{
      	var xres = {};
	    xres.code = "2";
	    xres.message = "Sorry, user with exact details already exists";
	    xres.data = resp;
	    callback(xres);
    }
  });

}

function mail_activation(tokenx,xname,pinx,codex,xemail){
  var message = "Hello "+xname+", \n\nYour MICROSTOCKS account has been createed. Guard the following credetials jealously as the are key to your account safety, use and access. \n\n ACTIVATION TOKEN : "+tokenx+" \n TRANSACTION PIN : "+pinx+" \n ACTIVATION CODE : "+codex+" \n\nYour account wont be active until you verify by clicking the link below. \n\nAs part of MSET, you’re helping entrepreneurs and dreamers bring their ideas to life, from startups to small scale enterprises - and so much more.";
  /*mailapi.send_mail(xemail,"underdoginstinct@gmail.com",message,"MSET Account Activation",function(resp){
   console.log(resp);
  });*/
  console.log(message);
}

function check_user(xemail,xphone,xnid,callback){
  dbuser.findOne({$or:[{'email':xemail},{'nationalID':xnid},{'phone':xphone}]}, function(err, xdata){
    if(err){ 
      console.log(err);
    }else{
      callback(xdata);
    }
  });
}

function set_activation_code(userx,utoken,codex){
  	var addx = dbact({userid:userx,acttoken:utoken,actcode:codex,actstatus:'pending'});
	addx.save(function(err){
	    if(err){
	      console.log(err);
	    }else{
          console.log("added actcode for "+userx);
	    }
	});
}

exports.check_activation_code = function(utoken,codex,callback){
  dbact.findOneAndUpdate({acttoken:utoken,actcode:codex,actstatus:'pending'},{actstatus:'used'},{new: true},function(err,dta){
   if(err){
     console.log(err);
   }else{
     console.log(dta);
     if(dta==null){
      var xres = {};
	   xres.code = "2";
	   xres.message = "Either credentials are wrong or already used";	
       callback(xres);
     }else{
	    change_act_status(dta.userid,"activation_ok",function(resp){
	      callback(resp);
	    });
     }
   }
  });
}

function change_act_status(userx,statusx,callback){
  dbuser.findOneAndUpdate({userid:userx},{status:statusx},{new: true},function(err,dta){
   if(err){
     console.log(err);
   }else{ 
     var xres = {};
	   xres.code = "1";
	   xres.message = "successfully Activated";
     callback(xres);
   }
  });
}

function change_comp_status(compx,statusx){
  dbcomp.findOneAndUpdate({compid:compx},{status:statusx},{new: true},function(err,dta){
   if(err){
     console.log(err);
   }else{
     console.log(dta);
   }
  });
}


exports.login_user = function(yemail, ypass, callback){
  var passkey = md5hash(sha512hash(sha256hash(sha512hash(ypass)+"553m134ty4")));	
  dbuser.findOne({'email':yemail,'password':passkey}, function(err, xdata){
    if(err){ 
      console.log(err);
    }else if(xdata==null){
      	var xres = {};
	      xres.code = "4";
	      xres.message = "invalid details";
	      xres.data = yemail+"---"+ypass;
	      callback(xres);
    }else{
      if(xdata.status=="pending"){
        var xres = {};
	      xres.code = "3";
	      xres.message = "pending";
	      xres.data = yemail+"---"+ypass;
	      callback(xres);
      }else if(xdata.status=="verification_ok"){
        var xres = {};
	      xres.code = "1";
	      xres.message = "verification_ok";
	      xres.data = xdata;
	      callback(xres);
      }else if(xdata.status=="activation_ok"){
        var xres = {};
	      xres.code = "2";
	      xres.message = "activation_ok";
	      xres.data = xdata;
	      callback(xres);
      }
    }
  });
}

function check_company(cname,cregid,callback){
  dbcomp.findOne({$or:[{'compregid':cregid},{'compname':cname}]}, function(err, xdata){
    if(err){ 
      console.log(err);
    }else{
      callback(xdata);
    }
  });
}

exports.get_company=function(cregid,callback){
  dbcomp.findOne({'compid':cregid}, function(err, xdata){
    if(err){ 
      console.log(err);
    }else{
      callback(xdata);
    }
  });
}

exports.add_company = function(cname,cat,addr,ptxt,vd,desc,bnr,lgo,uid,tgt,prd,rgid,px,chp,prc,othr,callback){
  check_company(cname,rgid,function(resp){
    if(resp==null){
      var xstamp = new Date().getTime()/1000;
      var xcompid = "C"+generateID_A(11);	
      var expire_date = {};
      expire_date.prd = prd;
      expire_date.stamp = get_expiry_date(prd);

      var addx = dbcomp({compid:xcompid,category:cat,compname:cname,address:addr,pitchtext:ptxt,videourl:vd,description:desc,banner:bnr,logo:lgo,userid:uid,target:tgt,period:expire_date,compregid:rgid,sharepercent:prc,cashpolicy:chp,crtstamp:xstamp,otherdetails:othr,status:'pending'});
  	  addx.save(function(err){
  	    if(err){
  	      console.log(err);
  	    }else{
  	      var xres = {};
  	      xres.code = "1";
  	      xres.message = "successfully added new company";
  	      xres.data = xcompid+"--"+cname+"--"+ptxt+"--"+rgid;
  	      callback(xres);

  	      add_comp_acc(xcompid,tgt,px);

  	      var xsrc = {};
  	      xsrc.id='1001';
  	      xsrc.name='MSET';
  	      add_notification(uid,xsrc,"Your company "+xcompid+"--"+cname+"--"+ptxt+"--"+rgid+" has been successfully created and awaiting MSET verification");
  	    }
  	  });
    }else{
       	var xres = {};
	    xres.code = "2";
	    xres.message = "sorry, company with similar details already exists";
	    xres.data = resp;
	    callback(xres);
    } 
  });
}

function add_notification(xdest,xfrom,xtext){
	var xstamp = new Date().getTime()/1000;
  var addx = dbnots({dest:xdest,src:xfrom,status:'unread',text:xtext,crtstamp:xstamp});
	addx.save(function(err){
	    if(err){
	      console.log(err);
	    }else{
          console.log("added message for "+xdest);
	    }
	});
}

function add_category(xcatname,xcatimg,callback){
  var addx = dbcat({catname:xcatname,catimg:xcatimg});
	addx.save(function(err){
	    if(err){
	      console.log(err);
	    }else{
          callback("successfully added category -- "+xcatname);
	    }
	});
}

function get_all_categories(callback){
  dbcat.find(function(err, xdata){
    if(err){ 
      console.log(err);
    }else{
      callback(xdata);
    }
  });
}

function get_all_users(callback){
  dbuser.find(function(err, xdata){
    if(err){ 
      console.log(err);
    }else{
      callback(xdata);
    }
  });
}

exports.get_all_companies = function(callback){
  dbcomp.find(function(err, xdata){
    if(err){ 
      console.log(err);
    }else{
      callback(xdata);
    }
  });
}

exports.get_my_companies = function(xval,callback){
  dbcomp.find({'userid.id':xval},function(err, xdata){
    if(err){ 
      console.log(err);
    }else{
      callback(xdata);
    }
  });
}

function add_to_follow(xuser,xcomp,callback){
    dbcomp.findOneAndUpdate({compid:xcomp},{$addToSet:{follow:xuser}},{new: true},function(err,usr){
       if(err){
         console.log(err); 
       }else{
         callback(usr);
       }
    });
}

function get_user_comp(xuser,callback){
  dbcomp.find({follow:{$in:[xuser]}},function(err, xdata){
    if(err){ 
      console.log(err);
    }else{
      callback(xdata);
    }
  });
}

function add_comp_acc(compx,tgtx,pxx){
  var ash = tgtx/pxx;
  var addx = dbcompacc({compid:compx,avail_shares:ash,sold_shares:0,credit:0,status:"",shareprice:pxx});
	addx.save(function(err){
	    if(err){
	      console.log(err);
	    }else{
        console.log("successfully craeted company trading account for -- "+compx);
	    }
	});
}

function add_investor_acc(userx){
  var addx = dbinvestacc({userid:userx,credit:0,status:"",shares:""});
	addx.save(function(err){
	    if(err){
	      console.log(err);
	    }else{
          console.log("successfully craeted investor account for -- "+userx);
	    }
	});
}

function get_expiry_date(ed){
  var jose;	
  if(ed=="2 months"){
   jose = new Date(moment().add(2, 'months').format()).getTime()/1000;
  }else if(ed=="4 months"){
   jose = new Date(moment().add(4, 'months').format()).getTime()/1000;
  }else if(ed=="6 months"){
   jose = new Date(moment().add(6, 'months').format()).getTime()/1000;
  }else if(ed=="10 months"){
   jose = new Date(moment().add(10, 'months').format()).getTime()/1000;
  }else if(ed=="1 year"){
   jose = new Date(moment().add(1, 'year').format()).getTime()/1000;
  }
  return jose;
}

function get_comp_acc(xcompid,callback){
  dbcompacc.findOne({'compid':xcompid}, function(err, xdata){
    if(err){ 
      console.log(err);
    }else{
      callback(xdata);
    }
  });
}

exports.get_comp_acc_x = function(indata,callback){
  dbcompacc.findOne({'compid':indata.cid}, function(err, xdata){
    if(err){ 
      console.log(err);
    }else{
      callback(xdata);
    }
  });
}

exports.generate_buy_session=function(xuserid,callback){
  var nowstamp = new Date().getTime()/1000;
  var expstamp = nowstamp+120;
  dbsess.findOneAndUpdate({userid:xuserid},{expire:expstamp},{new: true, upsert : true },function(err,dta){
    if(err){
      console.log(err);
    }else{
      callback(dta);
    }
  });
}

 function generate_buy_session(xuserid,callback){
  var nowstamp = new Date().getTime()/1000;
  var expstamp = nowstamp+120;
  dbsess.findOneAndUpdate({userid:xuserid},{expire:expstamp},{new: true, upsert : true },function(err,dta){
    if(err){
      console.log(err);
    }else{
      callback(dta);
    }
  });
}
// -----------buying company shares...............
exports.validate_buy_params=function(btot,buid,bpin,bcomp,bshr,bshrcre,bname,callback){
  check_user_pin(buid.id,bpin,function(resp){
    if(resp==null){
      var xres = {};
      xres.code = "2";
      xres.message = "wrong transaction pin";
      xres.data = buid.id+"--"+bpin;
      callback(xres);
    }else{
      get_user_credit(buid.id,function(resp){
        if(resp==null){
            var xres = {};
            xres.code = "3";
            xres.message = "invalid investor account";
            xres.data = buid.id+"--"+btot;
            callback(xres);
        }else{
           if(parseInt(resp.credit)<parseInt(btot)){
              var xres = {};
              xres.code = "4";
              xres.message = "insufficient funds";
              xres.data = buid.id+"--"+btot+"--"+resp.credit;
              callback(xres);
           }else{
              get_comp_acc(bcomp,function(resp){
                if(resp==null){
                  var xres = {};
                  xres.code = "5";
                  xres.message = "invalid company";
                  xres.data = buid.id+"--"+bcomp;
                  callback(xres);
                }else{
                  if(parseInt(resp.avail_shares)<parseInt(bshr)){
                    var xres = {};
                    xres.code = "6";
                    xres.message = "Out of bound shares";
                    xres.data = buid.id+"--"+bshr+"--"+resp.avail_shares;
                    callback(xres); 
                  }else{
                    check_user_buy_sess(buid.id,function(resp){
                        if(resp==null){
                          var xres = {};
                          xres.code = "7";
                          xres.message = "no transaction session";
                          xres.data = buid.id+"--"+bcomp;
                          callback(xres);
                        }else{
                          var nowstamp = new Date().getTime()/1000;
                          if(resp.expire<nowstamp){
                            var xres = {};
                            xres.code = "8";
                            xres.message = "expired session";
                            xres.data = buid.id+"--"+resp.expire;
                            callback(xres); 
                          }else{
                            update_comp_shares(bcomp,bshr,bshrcre,buid,btot,bname,function(resp){
                             callback(resp);
                            });
                          }
                        }
                    });
                  }
                }
              });
           }
        }
      });
    }
  });            
}
//------buying individual shares...................
function validate_ind_buy_params(btot,buid,selid,bpin,bcomp,bshr,bshrcre,bname,callback){
  check_user_pin(buid.id,bpin,function(resp){
     console.log(resp);
    if(resp==null){
      var xres = {};
      xres.code = "2";
      xres.message = "wrong transaction pin";
      xres.data = buid.id+"--"+bpin;
      
      //callback(xres);
    }else{
      get_user_credit(buid.id,function(resp){
        if(resp==null){
            var xres = {};
            xres.code = "3";
            xres.message = "invalid investor account";
            xres.data = buid.id+"--"+btot;
             console.log(xres.message);
            //callback(xres);
        }else{
           if(parseInt(resp.credit)<parseInt(btot)){
              var xres = {};
              xres.code = "4";
              xres.message = "insufficient funds";
              xres.data = buid.id+"--"+btot+"--"+resp.credit;
               console.log(xres.message);
             // callback(xres);
           }else{
                    check_user_buy_sess(buid.id,function(resp){
                        if(resp==null){
                          var xres = {};
                          xres.code = "7";
                          xres.message = "no transaction session";
                          xres.data = buid.id+"--"+bcomp;
                           console.log(xres.message);
                         // callback(xres);
                        }else{
                          var nowstamp = new Date().getTime()/1000;
                          if(resp.expire<nowstamp){
                            var xres = {};
                            xres.code = "8";
                            xres.message = "expired session";
                            xres.data = buid.id+"--"+resp.expire;
                             console.log(xres.message);
                          //  callback(xres); 
                          }else{
                            var trnid = "T"+generateID_B(15);
                            update_ind_investor_shares(bcomp,bshr,bshrcre,buid,btot,bname,trnid,function(resp){
                             callback(resp);
                               });

                              update_ind_seller_shares(bcomp,bshr,bshrcre,selid,btot,bname,trnid,function(resp){
                             callback(resp);
                               });
                          }
                        }
                    });
           }
        }
      });
    }
  });            
}

function update_ind_investor_shares(xcompid,xshr,xcre,xu,xtot,xname,trnsid,callback){
  dbinvestacc.findOne({userid:xu.id,"shares.id":xcompid},function(err,dta){
    if(err){
      console.log(err);
    }else{
      var shrset = {};
      shrset.id = xcompid;
      shrset.shr = parseInt(xshr);
      if(dta==null){
          dbinvestacc.findOneAndUpdate({userid:xu.id},{$addToSet:{shares:shrset},$inc:{credit:-xtot}},{new: true},function(err,dta){
            if(err){
              console.log(err);
            }else{
              console.log(dta);
              var trn = {};
              trn.cost = xtot;
              trn.cre = xcre;
              trn.ui = xu;
              trn.comp = xcompid;
              trn.shr = xshr;
              var xres = {};
              xres.code = "10";
              xres.message = "successfully bought shares";
              xres.data = trn;
              callback(xres); 
              var summary = "successfully bought "+xshr+" worth "+xcre+", at a cost of "+xtot+" from startup "+xname;
              record_ind_transaction(xtot,xcre,xu.id,xcompid,summary,"18194",xshr,xname,trnsid);
            }
          });
      }else{
          dbinvestacc.findOneAndUpdate({userid:xu.id,"shares.id":xcompid},{$inc:{credit:-xtot,"shares.$.shr":xshr}},{new: true},function(err,dta){
            if(err){
              console.log(err);
            }else{
              console.log(dta);
              var trn = {};
              trn.cost = xtot;
              trn.cre = xcre;
              trn.ui = xu;
              trn.comp = xcompid;
              trn.shr = xshr;
              var xres = {};
              xres.code = "10";
              xres.message = "successfully bought shares";
              xres.data = trn;
              callback(xres);
              var summary = "Successfully bought "+xshr+" shares worth "+xcre+", at a cost of "+xtot+", from startup - "+xname;
              record_ind_transaction(xtot,xcre,xu.id,xcompid,summary,"18194",xshr,xname,trnsid);
            }
          });
      }
    }
  });
}

function update_ind_seller_shares(xcompid,xshr,xcre,sid,xtot,xname,trnsid,callback){
  dbinvestacc.findOne({userid:sid,"shares.id":xcompid},function(err,dta){
    if(err){
      console.log(err);
    }else{
      var shrset = {};
      shrset.id = xcompid;
      shrset.shr = parseInt(xshr);
      if(dta==null){
          dbinvestacc.findOneAndUpdate({userid:sid},{$addToSet:{shares:shrset},$inc:{credit:+xcre}},{new: true},function(err,dta){
            if(err){
              console.log(err);
            }else{
              console.log(dta);
              var trn = {};
              trn.cost = xtot;
              trn.cre = xcre;
              trn.ui = xu;
              trn.comp = xcompid;
              trn.shr = xshr;
              var xres = {};
              xres.code = "10";
              xres.message = "successfully sold shares";
              xres.data = trn;
              callback(xres); 
              var summary = "successfully sold "+xshr+" worth "+xcre+", at a cost of "+xtot+" from startup "+xname;
              record_ind_transaction(xtot,xcre,sid,xcompid,summary,"18694",xshr,xname,trnsid);

            }
          });
      }else{
          dbinvestacc.findOneAndUpdate({userid:sid,"shares.id":xcompid},{$inc:{credit:+xcre,"shares.$.shr":-xshr}},{new: true},function(err,dta){
            if(err){
              console.log(err);
            }else{
              console.log(dta);
              var trn = {};
              trn.cost = xtot;
              trn.cre = xcre;
              trn.ui = xu;
              trn.comp = xcompid;
              trn.shr = xshr;
              var xres = {};
              xres.code = "10";
              xres.message = "successfully sold shares";
              xres.data = trn;
              callback(xres);
              var summary = "Successfully sold "+xshr+" shares worth "+xcre+", at a cost of "+xtot+", from startup - "+xname;
              record_ind_transaction(xtot,xcre,sid,xcompid,summary,"18694",xshr,xname,trnsid);
            }
          });
      }
    }
  });
}


function record_ind_transaction(ttot,tcre,tsacc,tdacc,ttxt,type,tshr,tname,trnid){
 var nowstamp = new Date().getTime()/1000;
 //var trnid = "T"+generateID_B(15);
 var addx = dbtrans({transid:trnid,transtype:type,transtext:ttxt,accountx:tsacc,accounty:tdacc,crtstamp:nowstamp});
 addx.save(function(err){
  if(err){
    console.log(err);
  }else{
    console.log("== tranaction : "+trnid+" --> "+ttxt);
    var cmp = {};
    cmp.id = tdacc;
    cmp.name = tname;
    add_notification(tsacc,cmp,ttxt);
    //gen_buy_reciept(tsacc.id,"reciept_pdf",trnid,"Kawuma henry","shs:25000","shs:50","Buying","Mosquito Zapper Lantern: A Mosquito’s Nightmare","5","2550");
  }
 });
}

//-------------end of buying ind shares.........

function get_user_credit(xid,callback){
  dbinvestacc.findOne({userid:xid}, function(err, xdata){
    if(err){ 
      console.log(err);
    }else{
      callback(xdata);
    }
  });
}

function get_user(xid,callback){
  dbuser.findOne({userid:xid}, function(err, xdata){
    if(err){ 
      console.log(err);
    }else{
      callback(xdata);
    }
  });
}

function check_user_pin(xid,xpin,callback){
  var pinhash = md5hash(sha256hash(sha512hash(sha512hash(xpin)+"henjerher")));
  dbuser.findOne({userid:xid,transPIN:pinhash},function(err, xdata){
    if(err){ 
      console.log(err);
    }else{
      callback(xdata);
    }
  });
}

function check_user_buy_sess(xid,callback){
  dbsess.findOne({userid:xid}, function(err, xdata){
    if(err){ 
      console.log(err);
    }else{
      callback(xdata);
    }
  });
}

function update_comp_shares(xcompid,xshr,xcre,xu,xtot,xname,callback){
  xshr = parseInt(xshr);
  xcre = parseInt(xcre);
  dbcompacc.findOneAndUpdate({compid:xcompid},{$inc:{sold_shares:xshr,avail_shares:-xshr,credit:xcre}},{new: true},function(err,dta){
    if(err){
      console.log(err);
    }else{
      var ownset = {};
      ownset.id = xu.id;
      ownset.name = xu.name;
      ownset.shr = xshr;
      dbcompacc.findOne({compid:xcompid,"owners.id":xu.id},function(err,dta){
       if(err){
         console.log(err);
       }else{
         if(dta==null){
           console.log("null");
           dbcompacc.findOneAndUpdate({compid:xcompid},{$addToSet:{owners:ownset}},{new: true},function(err,dta){
              if(err){
                console.log(err);
              }else{
                console.log(dta);
                update_investor_shares(xcompid,xshr,xcre,xu,xtot,xname,function(resp){
                 callback(resp);
                });
              }
           });
         }else{
            console.log("not null");
            dbcompacc.findOneAndUpdate({compid:xcompid,"owners.id":xu.id},{$inc:{"owners.$.shr":xshr}},{new: true},function(err,dta){
              if(err){
                console.log(err);
              }else{
                console.log(dta);
                update_investor_shares(xcompid,xshr,xcre,xu,xtot,xname,function(resp){
                 callback(resp);
                });
              }
           });
         }
       }
      });
    }
  });
}

function update_investor_shares(xcompid,xshr,xcre,xu,xtot,xname,callback){
  dbinvestacc.findOne({userid:xu.id,"shares.id":xcompid},function(err,dta){
    if(err){
      console.log(err);
    }else{
       var trnid = "T"+generateID_B(15);
      var shrset = {};
      shrset.id = xcompid;
      shrset.shr = parseInt(xshr);
      if(dta==null){
          dbinvestacc.findOneAndUpdate({userid:xu.id},{$addToSet:{shares:shrset},$inc:{credit:-xcre}},{new: true},function(err,dta){
            if(err){
              console.log(err);
            }else{
              console.log(dta);
              var trn = {};
              trn.cost = xtot;
              trn.cre = xcre;
              trn.ui = xu;
              trn.comp = xcompid;
              trn.shr = xshr;
              var xres = {};
              xres.code = "10";
              xres.message = "successfully bought shares";
              xres.data = trn;
              callback(xres); 
              var summary = "successfully bought "+xshr+" worth "+xcre+", at a cost of "+xtot+" from startup "+xname;
              record_transaction(xtot,xcre,xu,xcompid,summary,"5994",xshr,xname,trnid);
            }
          });
      }else{
          dbinvestacc.findOneAndUpdate({userid:xu.id,"shares.id":xcompid},{$inc:{credit:-xcre,"shares.$.shr":xshr}},{new: true},function(err,dta){
            if(err){
              console.log(err);
            }else{
              console.log(dta);
              var trn = {};
              trn.cost = xtot;
              trn.cre = xcre;
              trn.ui = xu;
              trn.comp = xcompid;
              trn.shr = xshr;
              var xres = {};
              xres.code = "10";
              xres.message = "successfully bought shares";
              xres.data = trn;
              callback(xres);
              var summary = "Successfully bought "+xshr+" shares worth "+xcre+", at a cost of "+xtot+", from startup - "+xname;
              record_transaction(xtot,xcre,xu,xcompid,summary,"5994",xshr,xname,trnid);
            }
          });
      }
    }
  });
}

function record_transaction(ttot,tcre,tsacc,tdacc,ttxt,type,tshr,tname,trnid){
 var nowstamp = new Date().getTime()/1000;
 //var trnid = "T"+generateID_B(15);
 var addx = dbtrans({transid:trnid,transtype:type,transtext:ttxt,accountx:tsacc.id,accounty:tdacc,crtstamp:nowstamp});
 addx.save(function(err){
  if(err){
    console.log(err);
  }else{
    console.log("== tranaction : "+trnid+" --> "+ttxt);
    var cmp = {};
    cmp.id = tdacc;
    cmp.name = tname;
    add_notification(tsacc,cmp,ttxt);
   // gen_buy_reciept(tsacc.id,"reciept_pdf",trnid,"Kawuma henry","shs:25000","shs:50","Buying","Mosquito Zapper Lantern: A Mosquito’s Nightmare","5","2550");
  }
 });
}


function gen_buy_reciept(raccid,rrecdpf,rtransid,rname,ramt,rtransfee,rtranstype,rcomp,rshr,rprice){
 var nowstamp = new Date().getTime()/1000;
 var recid = "R"+generateID_B(18);
 var rec = {};
 rec.fee = rtransfee;
 rec.transaction_type = rtranstype;
 rec.company = rcomp;
 rec.shares_bought = rshr;
 rec.price = rprice;
 var addx = dbreciept({accountid:raccid,recieptid:recid,receiptpdf:rrecdpf,transid:rtransid,name:rname,amount:ramt,otherdetails:rec,stime:nowstamp});
 addx.save(function(err){
  if(err){
    console.log(err);
  }else{
   
  }
 });
}

function gen_sell_reciept(raccid,rrecdpf,rtransid,rname,ramt,rtranstype,rcomp,rsold,rshr,rprice){
 var nowstamp = new Date().getTime()/1000;
 var recid = "S"+generateID_B(18);
 var rec = {};
 rec.transaction_type = rtranstype;
 rec.company = rcomp;
 rec.shares_sold = rshr;
 rec.price = rprice;
 var addx = dbreciept({accountid:raccid,recieptid:recid,receiptpdf:rrecdpf,transid:rtransid,name:rname,amount:ramt,otherdetails:rec,stime:nowstamp});
 addx.save(function(err){
  if(err){
    console.log(err);
  }else{
   
  }
 });
}

function deposit_reciept(raccid,rrecdpf,rtransid,rname,ramt,rtranstype){
 var nowstamp = new Date().getTime()/1000;
 var recid = "D"+generateID_B(18);
 var rec = {};
 rec.transaction_type = rtranstype;
 var addx = dbreciept({accountid:raccid,recieptid:recid,receiptpdf:rrecdpf,transid:rtransid,name:rname,amount:ramt,otherdetails:rec,stime:nowstamp});
 addx.save(function(err){
  if(err){
    console.log(err);
  }else{
   
  }
 });
}

function deposit_transaction(tsacc,damt,dnumb,type){
var nowstamp = new Date().getTime()/1000;
 var trnid ="T"+generateID_B(15);
 var ttxt = "You have deposited shs : "+damt+" worth on your MSET account";
 var addx = dbtrans({transid:trnid,transtype:type,transtext:ttxt,accountx:tsacc.id,accounty:dnumb,crtstamp:nowstamp});
 addx.save(function(err){
  if(err){
    console.log(err);
  }else{
    console.log("== tranaction : "+trnid+" --> "+ttxt);
    transaction_history(xu,xu.name+"'s account",trnid,"Deposit",damt,"0",damt)
 }
 });
}

exports.add_story = function(stxt,spic,scmp,callback){
 var addx = dbstory({compid:scmp,text:stxt,image:spic,status:"active"});
  addx.save(function(err){
  if(err){
    console.log(err);
  }else{
    var xres = {};
    xres.code = "1";           
    xres.message = "successfully added story";
    xres.data = scmp;
    callback(xres); 
  }
 });
}

exports.get_all_featured_companies = function(callback){
  dbcomp.find(function(err, xdata){
    if(err){ 
      console.log(err);
    }else{
      callback(xdata);
    }
  });
}

exports.get_all_explore_companies = function(categ,callback){
  dbcomp.find({'category':categ},function(err, xdata){
    if(err){ 
      console.log(err);
    }else{
      callback(xdata);
    }
  });
}


exports.get_my_companies = function(xval,callback){
  dbcomp.find({'userid.id':xval},function(err, xdata){
    if(err){ 
      console.log(err);
    }else{
      callback(xdata);
    }
  });
}

exports.get_user_info=function(xval,callback){
  dbinvestacc.findOne({'userid':xval},function(err, xdata){
    if(err){ 
      console.log(err);
    }else{
      callback(xdata);
    }
  });
}

exports.get_company_info=function(xval,callback){
  dbstory.find({'compid':xval},function(err, xdata){
    if(err){ 
      console.log(err);
    }else{
      callback(xdata);
    }
  });
}

exports.admin_get_all_transactions_via_id=function(userid,callback){
  dbtrans.find({$or:[{'accountx':userid},{'accounty':userid}]},function(err, xdata){
    if(err){ 
      console.log(err);
    }else{
      callback(xdata);
    }
  });
}


/*function transaction_history(thaccid,thcomp,thtransid,thtranstype,thamt,thfee,thtot){
 var nowstamp = new Date().getTime()/1000;
 var rec = {};
 rec.transaction_tot = thtot;
 rec.transaction_fee = thfee;
 rec.transaction_amt = thamt;
 var addx = dbhistory({accountx:thaccid.id,compname:thcomp,transid:thtransid,transtype:thtranstype,otherdetails:rec,stime:nowstamp});
 addx.save(function(err){
  if(err){
    console.log(err);
  }else{
   
  }
 });
}*/



var xu = {};
    xu.id='UAGEF3TZ7V56';
    xu.name='jose ssembatya';

//gen_buy_reciept("UAGEF3TZ7V56","reciept_pdf","TfNrCP18CMR4rTEO20","jose ssembatya","shs:25000","shs:50","Buying","Mosquito Zapper Lantern: A Mosquito’s Nightmare","5","shs:2550");

///gen_sell_reciept("UZFYKSWZBP18","reciept_pdf","TfNrCP18CMR4rTEO20","Kawuma henry","shs:25000","Selling","Mosquito Zapper Lantern: A Mosquito’s Nightmare","5","shs:2550");

//deposit_reciept("UZFYKSWZBP18","reciept_pdf","TfNrCP18CMR4rTEO20","Kabazi herbert","shs:25000","Deposit");

//receiptz.gen_buy_comp_html("Tusubira Jeremy Francis","TDHUIHUHU4673","RCIEEB54637BB","Wednesday, June 7, 2017 2:30 AM","Mosquito Zapper Lantern: A Mosquito’s Nightmare","45","100000","50","100050");

//receiptz.gen_sell_html("Tusubira Jeremy Francis","TDHUIHUHU4673","SWQpVGdKlJdvCjol3zT43","Wednesday, June 7, 2017 2:30 AM","Mosquito Zapper Lantern: A Mosquito’s Nightmare","Kawuma Henry","45","100000","100000");

//receiptz.gen_deposit_html("Tusubira Jeremy Francis","TDHUIHUHU4673","DUb1znRygrk69gog2hA33","Wednesday, June 7, 2017 2:30 AM","100000","100000");

//receiptz.gen_buy_ind_html("Tusubira Jeremy Francis","TDHUIHUHU4673","RCIEEB54637BC","Wednesday, June 7, 2017 2:30 AM","Mosquito Zapper Lantern: A Mosquito’s Nightmare","Kawuma henry","45","100000","50","100050");

/*update_comp_shares("CZTLT4AGNA4Z47","34","20000",xu,function(resp){
 console.log(resp);
});*/

/*generate_buy_session("UAGEF3TZ7V56",function(resp){
  console.log(resp);
});*/

/*generate_buy_session("UAGEF3TZ7V56",function(resp){
  console.log(resp);
});*/

/*validate_buy_params("20000","UAGEF3TZ7V56","Y7EWLL56","CZTLT4AGNA4Z47","10",function(resp){
    console.log(resp);
  });*/

 /* check_user_pin("UAGEF3TZ7V56","Y7EWLL56",function(resp){
    console.log(resp);
  });*/

 // deposit_transaction(xu,"4000","0700676825","2292");

 /*validate_ind_buy_params("250",xu,"UR2T2WPF9412","Y7EWLL56","CZTLT4AGNA4Z47",10,200,"Juiced Boards",function(resp){
  console.log(resp);
 });*/

  /*check_user_pin("UAGEF3TZ7V56","Y7EWLL56",function(resp){
    console.log(resp);
  });*/

/*get_comp_av_shares("CDAJAQKMXLJM20",function(resp){
  console.log(resp);
});*/

/*add_user("kato paul","kato12345","0772456789","katopaul@gmail.com","uganda","4563hgyegye67423",function(resp){
 console.log(resp);	
});*/

//add_notification("{'id':'UAGEF3TZ7V56','name':'jose ssembatya'}","{'id':'1001','name':'mset'}","hello user");

/*add_company("tidy wear","laundry","makerere kikoni plot ab234","The on demand solution to laundry. we do your laundry so you can have more time for other important stuff.","https://www.youtube.com/tidywear","The on demand solution to laundry. we do your laundry so you can have more time for other important stuff. With the web and mobile platforms, you can place your order and we pickup and deliver after washing and ironing ","tidy.png","tidywear.png",xu,"500000","2 years","ADE456G","4000","policy A","60","interested in dormant patners","pending",function(resp){
 console.log(resp);
});*/

/*login_user("remmijunior@gmail.com","jose12345",function(resp){
  console.log(resp);
});*/

/*get_all_users(function(rsp){
 console.log(rsp);
});*/

/*add_to_follow("UAGEF3TZ7V56","C2KK4B725NJB20",function(resp){
  console.log(resp);
});*/

/*get_user_comp("UAGEF3TZ7V56",function(resp){
  console.log(resp);
});*/


