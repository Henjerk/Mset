var exports = module.exports={};
var fs = require('fs');
var _ = require('underscore');
var moment = require('moment');
var mongoose = require('mongoose');
var cry = require('crypto');
var mailapi = require("./mset_mail.js");
var smsapi = require("./sms_server.js");
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
  likes:Array,
  comments:Array,
  share:Array,
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

var receiptSchema = mongoose.Schema({  
  accountid:String,
  receiptid:String,
  receiptpdf:String,
  transid:String,
  name:String,
  amount:String,
  otherdetails:Array,
  stime:String
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
var dbreceipt = mongoose.model('reciept',receiptSchema);

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


exports.add_user = function(xusername, xpassword, xphone, xemail, nation, nationid, prefz, callback){
  check_user(xemail,xphone,nationid,function(resp){
    if(resp==null){
	  var xuserid = "U"+generateID_A(9);
	  var xpin = generateID_A(6);
	  var xtoken = "AC"+generateID_A(7);
	  var xcode = "MA"+generateID_A(6);
	  var pinhash = md5hash(sha256hash(sha512hash(sha512hash(xpin)+"henjerher")));
	  var passkey = md5hash(sha512hash(sha256hash(sha512hash(xpassword)+"553m134ty4")));
	  var xstamp = new Date().getTime()/1000;
	  var addx = dbuser({userid:xuserid,username:xusername,password:passkey,transPIN:pinhash,phone:xphone,email:xemail,status:'pending',nationality:nation,nationalID:nationid,crtstamp:xstamp,prefs:prefz});
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
	      mail_activation(xtoken,xusername,xpin,xcode,xemail,prefz);
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

function mail_activation(tokenx,xname,pinx,codex,xemail,simy){
  var message = "Hello "+xname+", \n\nYour MICROSTOCKS account has been createed. Guard the following credentials jealously as the are key to your account safety, use and access. \n\n ACTIVATION TOKEN : "+tokenx+" \n TRANSACTION PIN : "+pinx+" \n ACTIVATION CODE : "+codex+" \n\nYour account wont be active until you verify by clicking the link below. \n\nAs part of MSET, you’re helping entrepreneurs and dreamers bring their ideas to life, from startups to small scale enterprises - and so much more.";
  mailapi.send_mail(xemail,"microstocks8@gmail.com",message,"MSET Account Activation",function(resp){
   console.log(resp);
  });
  console.log(message);
  get_similar_companies(simy);
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
          find_potential_contacts(cat,cname);
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

exports.get_user_comp=function(xuser,callback){
  dbcomp.find({'follow.id':{$in:[xuser]}},function(err, xdata){
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
              var summary = "successfully bought "+xshr+" worth "+xcre+", at a cost of "+xtot+", from startup - "+xname;
              record_buy_transaction(xtot,xcre,xu,xcompid,summary,"5994",xshr,xname);
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
              var summary = "successfully bought "+xshr+" shares worth "+xcre+", at a cost of "+xtot+", from startup - "+xname;
              record_buy_transaction(xtot,xcre,xu,xcompid,summary,"5994",xshr,xname);
            }
          });
      }
    }
  });
}

function record_buy_transaction(ttot,tcre,tsacc,tdacc,ttxt,type,tshr,tname){
 var nowstamp = new Date().getTime()/1000;
 var trnid = "T"+generateID_B(15);
 var addx = dbtrans({transid:trnid,transtype:type,transtext:ttxt,accountx:tsacc.id,accounty:tdacc,crtstamp:nowstamp});
 addx.save(function(err){
  if(err){
    console.log(err);
  }else{
    console.log("== tranaction : "+trnid+" --> "+ttxt);
    var cmp = {}; cmp.id = tdacc; cmp.name = tname;
    add_notification(tsacc,cmp,ttxt);
    add_buy_reciept(tsacc,trnid,ttot,"50",type,cmp,tshr,tcre);
  }
 });
}

exports.add_story = function(stxt,spic,scmp,callback){
 var nowstamp = new Date().getTime()/1000;
 var addx = dbstory({compid:scmp,text:stxt,image:spic,status:"active",crtstamp:nowstamp});
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

function add_buy_reciept(racc,rtransid,ramt,rtransfee,rtranstype,rcomp,rshr,rprice){
 var nowstamp = new Date().getTime()/1000;
 var recid = "R"+generateID_B(18);
 var rec = {};
 rec.fee = rtransfee;
 rec.type = rtranstype;
 rec.comp = rcomp.id;
 rec.share = rshr;
 rec.price = rprice;
 var addx = dbreceipt({accountid:racc.id,receiptid:recid,receiptpdf:"",transid:rtransid,name:racc.name,amount:ramt,otherdetails:rec,stime:nowstamp});
 addx.save(function(err){
  if(err){
    console.log(err);
  }else{
   var timex = moment.unix(nowstamp).format("LLLL");
   receiptz.gen_buy_html(racc.name,rtransid,recid,timex,rcomp.name,rshr,rprice,rtransfee,ramt);
  }
 });
}

exports.update_receipt_pdf=function(rcid,rpdf){
  dbreceipt.findOneAndUpdate({receiptid:rcid},{receiptpdf:rpdf},{new: true},function(err,dta){
   if(err){
    console.log(err);
   }else{
    console.log(dta);
   }
  });
}

exports.get_company_stories = function(scmp,callback){
  dbstory.find({'compid':scmp},function(err, xdata){
    if(err){ 
      console.log(err);
    }else{
      callback(xdata);
    }
  });
}

exports.admin_get_all_campaigns_via_status=function(astate,callback){
  dbcomp.find({status:astate},function(err, xdata){
    if(err){ 
      console.log(err);
    }else{
      callback(xdata);
    }
  });
}

exports.admin_get_all_campaigns=function(callback){
  dbcomp.find(function(err, xdata){
    if(err){ 
      console.log(err);
    }else{
      callback(xdata);
    }
  });
} 

exports.admin_get_all_users=function(callback){
  dbuser.find(function(err, xdata){
    if(err){ 
      console.log(err);
    }else{
      callback(xdata);
    }
  });
}

exports.admin_get_all_users_via_status=function(astate,callback){
  dbuser.find({status:astate},function(err, xdata){
    if(err){ 
      console.log(err);
    }else{
      callback(xdata);
    }
  });
}

exports.admin_get_all_transactions=function(callback){
  dbtrans.find(function(err, xdata){
    if(err){ 
      console.log(err);
    }else{
      callback(xdata);
    }
  });
}

exports.admin_get_all_transactions_via_type=function(atype,callback){
  dbtrans.find({transtype:atype},function(err, xdata){
    if(err){ 
      console.log(err);
    }else{
      callback(xdata);
    }
  });
}

exports.get_chats_heads = function(userid,callback){
  dbnots.find({$or:[{'dest.id':userid},{'src.id':userid}]},function(err, xdata){
    if(err){ 
      console.log(err);
    }else{
      var chatheads = []; 
      for(var p=0; p<xdata.length; p++){
        if(xdata[p].src.id==userid){
          if(_.findLastIndex(chatheads, { name: xdata[p].dest.name, id: xdata[p].dest.id })<0){
            chatheads.push(xdata[p].dest);
          }
        }else{
          if(_.findLastIndex(chatheads, { name: xdata[p].src.name, id: xdata[p].src.id })<0){
            chatheads.push(xdata[p].src);
          }
        }
        if(p==xdata.length-1){
          callback(chatheads);
        }
      }
    }
  });
}

exports.get_chats=function(ma,mb,callback){
  dbnots.find({$or:[{'dest.id':ma,'src.id':mb},{'dest.id':mb,'src.id':ma}]},function(err, xdata){
    if(err){ 
      console.log(err);
    }else{
      callback(xdata);
    }
  });
}

exports.stats_backers_v_time=function(callback){
  dbtrans.find({"transtype" : "5994"},function(err, xdata){
    if(err){ 
      console.log(err);
    }else{
      var ty = []; 
      for(var p=0; p<xdata.length; p++){
        var dte = moment.unix(xdata[p].crtstamp).format('YYYY-MM-DD');
        var mx = moment(dte, 'YYYY-MM-DD');
        var dt = {}; dt.id=xdata[p]._id; dt.date=dte, dt.week=mx.format("W");
        ty.push(dt);
        if(p==xdata.length-1){
          var ku = _.groupBy(ty, 'week');
          callback(ku);
        }
      }
    }
  });
}

exports.check_fav_company=function(compid,uid,unme,callback){
  followset = {'id':uid,'name':unme};
  dbcomp.findOne({compid:compid,'follow.id':followset.id},function(err,dta){
    if(err){
      console.log(err);
    }else{
      if(dta==null){
        var xres = {};
        xres.code = "10";           
        xres.message = "company not favourited";
        xres.data = compid+"=="+uid;
        callback(xres);
      }else{
        var xres = {};
        xres.code = "20";           
        xres.message = "Company already favourited";
        xres.data = compid+"=="+uid;
        callback(xres); 
      }
    }
  });
}

exports.add_fav_company=function(compid,uid,unme,callback){
  followset = {'id':uid,'name':unme};
  dbcomp.findOne({compid:compid,'follow.id':followset.id},function(err,dta){
    if(err){
      console.log(err);
    }else{
      if(dta==null){
          dbcomp.findOneAndUpdate({compid:compid}, {$addToSet:{follow:followset}},{new:true},function(err,dta){
            if(err){
              console.log(err);
            }else{
                var xres = {};
                xres.code = "10";           
                xres.message = "added company to your favourites";
                xres.data = compid+"=="+uid;
                callback(xres); 
            }
          });
      }else{
        var xres = {};
        xres.code = "20";           
        xres.message = "Company already favourited";
        xres.data = compid+"=="+uid;
        callback(xres); 
      }
    }
  });
}

exports.remove_fav_company=function(compid,uid,unme,callback){
  followset = {'id':uid,'name':unme};
  dbcomp.update({compid:compid}, {$pull:{"follow":followset}}, function(err,dta){
    if(err){
      console.log(err);
    }else{
      var xres = {};
      xres.code = dta.nModified;           
      xres.message = "removing from favourited";
      xres.data = compid+"=="+uid;
      callback(xres); 
    }
  });
}

exports.get_inv_acc=function(userx,callback){
  dbinvestacc.findOne({userid:userx},function(err,dta){
   if(err){
     console.log(err);
   }else{
     if(dta==null){
        var xres = {};
        xres.code = "5";           
        xres.message = "no investor account";
        xres.data = userx;
        callback(xres); 
     }else{
        var xres = {};
        xres.code = "15";           
        xres.message = "investor account";
        xres.data = dta;
        callback(xres); 
     }
   }
  });
}

exports.sell_ind_shares=function(indata,callback){

  check_user_pin(indata.uid,indata.pin,function(resp){
    if(resp==null){
      var xres = {};
      xres.code = "2";
      xres.message = "wrong transaction pin";
      xres.data = indata;
      callback(xres);
    }else{
        get_ind_comp_shrs(indata.uid,indata.cid,function(resp){
          if(resp<indata.shr){
            var xres = {};
            xres.code = "3";
            xres.message = "insufficient shares amount";
            xres.data = indata;
            callback(xres);
          }else{
            var xres = {};
            xres.code = "3";
            xres.message = "Generating sell broadcast message";
            xres.data = indata;
            callback(xres); 
            get_comp_followers(indata.cid,indata.unme,indata.uid,indata.cnme,indata.shr);
          }
        });
    }
  });

}


function get_ind_comp_shrs(userx,compid,callback){
  dbinvestacc.findOne({userid:userx},function(err,dta){
   if(err){
     console.log(err);
   }else{
     var myx = _.findLastIndex(dta.shares,{id:compid});
     var mys = dta.shares[myx];
     callback(mys.shr);
   }
  });
}

function get_comp_followers(compid,uname,uid,cnme,shrs){
  dbcomp.findOne({compid:compid},function(err, xdata){
    if(err){ 
      console.log(err);
    }else{
      var setx = xdata.follow;
       for(var p=0; p<setx.length; p++){
          if(setx[p].id==uid){

          }else{
            var xdest = {};
            xdest.id=setx[p].id;
            xdest.name=setx[p].name;
            var xsrc = {};
            xsrc.id=uid;
            xsrc.name=uname;
            var idt = ">>>"+compid+"---"+cnme+"---"+uid+"---"+uname+"---"+shrs+">>>";
            var shrmessage = idt+"Individual  -- "+shrs+" -- Company Shares for sale for company -- "+cnme+" -- click link to buy the shares";
            add_notification(xdest,xsrc,shrmessage);
          }
       }
    }
  });
}

function validate_ind_buy_params(ktotal,kpx,kbyrid,kbyrnme,ksllrid,ksllrnme,kshrs,kpin,kcompnme,kcompid,callback){
  check_user_pin(kbyrid,kpin,function(resp){
    if(resp==null){
      var xres = {};
      xres.code = "2";
      xres.message = "wrong transaction pin";
      xres.data = kbyrid+"--"+kpin;
      callback(xres);
    }else{
      get_user_credit(kbyrid,function(resp){
        if(resp==null){
            var xres = {};
            xres.code = "3";
            xres.message = "invalid investor account";
            xres.data = kbyrid+"--"+kbyrnme;
            callback(xres);
        }else{
           if(parseInt(resp.credit)<parseInt(ktotal)){
              var xres = {};
              xres.code = "4";
              xres.message = "insufficient funds";
              xres.data = kbyrid+"--"+ktotal+"--"+resp.credit;
              callback(xres);
           }else{
              get_comp_acc(kcompid,function(resp){
                if(resp==null){
                  var xres = {};
                  xres.code = "5";
                  xres.message = "invalid company";
                  xres.data = buid.id+"--"+bcomp;
                  callback(xres);
                }else{
                  get_ind_comp_shrs(ksllrid,kcompid,function(resp){
                    if(resp<kshrs){
                      var xres = {};
                      xres.code = "6";
                      xres.message = "insufficient shares amount";
                      xres.data = ksllrid+"--"+kcompid;
                      callback(xres);
                    }else{
                      update_investor_shares_ind_buy_trans(kcompid,kcompnme,kshrs,kpx,ktotal,ksllrnme,ksllrid,kbyrid,kbyrnme,function(resp){
                        callback(resp);
                      });
                    }
                  });
                }
              });
           }
        }
      });
    }
  });            
}

exports.buy_ind_shares=function(indata,callback){
  var kpx = indata.shr*indata.shareprice;
  var totx = kpx+50;
  validate_ind_buy_params(totx,kpx,indata.buyerid,indata.buyernme,indata.uid,indata.uname,indata.shr,indata.pin,indata.compnme,indata.compid,function(resp){
    callback(resp);
  });
}

function update_investor_shares_ind_buy_trans(xcompid,xcompnme,xshr,xpx,xtot,xname,xid,yid,yname,callback){
  dbinvestacc.findOne({userid:yid,"shares.id":xcompid},function(err,dta){
    if(err){
      console.log(err);
    }else{
      var shrset = {};
      shrset.id = xcompid;
      shrset.shr = parseInt(xshr);
      if(dta==null){
        dbinvestacc.findOneAndUpdate({userid:yid},{$addToSet:{shares:shrset},$inc:{credit:-xtot}},{new: true},function(err,dta){
            if(err){
              console.log(err);
            }else{
              console.log(dta);
              var trn = {};
              trn.cost = xtot;
              trn.cre = xpx;
              trn.ui = {id:yid,name:yname};
              trn.comp = {id:xcompid,xcompnme};
              trn.seller = {id:xid,name:xname};
              trn.shr = xshr;
              var xres = {};
              xres.code = "10";
              xres.message = "successfully bought shares";
              xres.data = trn;
              callback(xres);
              var summary = "successfully bought "+xshr+" worth "+xpx+", at a cost of "+xtot+", from - "+xname+" for comapny "+xcompnme;
              record_ind_buy_transaction(xtot,xpx,trn.ui,trn.seller,summary,"18194",xshr,trn.comp);
            }
        });
      }else{
          dbinvestacc.findOneAndUpdate({userid:yid,"shares.id":xcompid},{$inc:{credit:-xtot,"shares.$.shr":parseInt(xshr)}},{new: true},function(err,dta){
            if(err){
              console.log(err);
            }else{
              console.log(dta);
              var trn = {};
              trn.cost = xtot;
              trn.cre = xpx;
              trn.ui = {id:yid,name:yname};
              trn.comp = {id:xcompid,xcompnme};
              trn.seller = {id:xid,name:xname};
              trn.shr = xshr;
              var xres = {};
              xres.code = "10";
              xres.message = "successfully bought shares";
              xres.data = trn;
              callback(xres);
              var summary = "successfully bought "+xshr+" worth "+xpx+", at a cost of "+xtot+", from - "+xname+" for comapny "+xcompnme;
              record_ind_buy_transaction(xtot,xpx,trn.ui,trn.seller,summary,"18194",xshr,trn.comp);
              update_investor_shares_ind_sell_trans(xcompid,xcompnme,xshr,xpx,xtot,xname,xid,yid,yname);
            }
          });
      }
    }
  });
}

function record_ind_buy_transaction(ttot,tcre,tsacc,tdacc,ttxt,type,tshr,tcomp){
 var nowstamp = new Date().getTime()/1000;
 var trnid = "T"+generateID_B(15);
 var addx = dbtrans({transid:trnid,transtype:type,transtext:ttxt,accountx:tsacc.id,accounty:tdacc.id,crtstamp:nowstamp});
 addx.save(function(err){
  if(err){
    console.log(err);
  }else{
    console.log("== tranaction : "+trnid+" --> "+ttxt);
    add_notification(tsacc,tcomp,ttxt);
    add_ind_buy_reciept(tsacc,trnid,ttot,"50",type,tcomp,tshr,tcre,ttxt,tdacc);
  }
 });
}

function add_ind_buy_reciept(racc,rtransid,ramt,rtransfee,rtranstype,rcomp,rshr,rprice,rtxt,rdacc){
 var nowstamp = new Date().getTime()/1000;
 var recid = "R"+generateID_B(18);
 var rec = {};
 rec.fee = rtransfee;
 rec.type = rtranstype;
 rec.comp = rcomp.id;
 rec.share = rshr;
 rec.seller = rdacc.id;
 rec.price = rprice;
 var addx = dbreceipt({accountid:racc.id,receiptid:recid,receiptpdf:"",transid:rtransid,name:racc.name,amount:ramt,otherdetails:rec,stime:nowstamp});
 addx.save(function(err){
  if(err){
    console.log(err);
  }else{
   var timex = moment.unix(nowstamp).format("LLLL");
   receiptz.gen_ind_buy_html(racc.name,rtransid,recid,timex,rcomp.name,rshr,rprice,rtransfee,ramt,rtxt);
  }
 });
}

function update_investor_shares_ind_sell_trans(xcompid,xcompnme,xshr,xpx,xtot,xname,xid,yid,yname){
      dbinvestacc.findOneAndUpdate({userid:xid,"shares.id":xcompid},{$inc:{credit:xpx,"shares.$.shr":-parseInt(xshr)}},{new: true},function(err,dta){
        if(err){
          console.log(err);
        }else{
          console.log(dta);
          var trn = {};
          trn.cost = xtot;
          trn.cre = xpx;
          trn.ui = {id:yid,name:yname};
          trn.comp = {id:xcompid,xcompnme};
          trn.seller = {id:xid,name:xname};
          trn.shr = xshr;
          var summary = "successfully sold "+xshr+" worth "+xpx+", at a cost of "+xtot+", to - "+xname+" for comapny "+xcompnme;
            record_ind_sell_transaction(xtot,xpx,trn.ui,trn.seller,summary,"18694",xshr,trn.comp);
          }
      });
}

function record_ind_sell_transaction(ttot,tcre,tsacc,tdacc,ttxt,type,tshr,tcomp){
 var nowstamp = new Date().getTime()/1000;
 var trnid = "T"+generateID_B(15);
 var addx = dbtrans({transid:trnid,transtype:type,transtext:ttxt,accountx:tsacc.id,accounty:tdacc.id,crtstamp:nowstamp});
 addx.save(function(err){
  if(err){
    console.log(err);
  }else{
    console.log("== tranaction : "+trnid+" --> "+ttxt);
    add_notification(tdacc,tcomp,ttxt);
  }
 });
}

exports.get_my_follow_stories=function(fllset){
  dbstory.find({'compid':{$in: ['CMUF75Z2HAY654','CZTLT4AGNA4Z47']}},function(err, xdata){
    if(err){ 
      console.log(err);
    }else{
      console.log(xdata);
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

exports.change_camp_status=function(xcompid,code,callback){
      dbcomp.findOneAndUpdate({compid:xcompid},{status:code},{new: true},function(err,dta){
        if(err){
          console.log(err);
        }else{
            var xres = {};
            xres.code = "1";
            xres.message = "compaign has been activated";
            xres.data = xcompid;
            callback(xres);
        }
      });
}

exports.deposit_funds=function(useridx,amount,phone,callback){
      var hj = parseInt(amount)
      dbinvestacc.findOneAndUpdate({userid:useridx},{$inc:{credit:hj}},{new: true},function(err,dta){
        if(err){
          console.log(err);
        }else{
            var xres = {};
            xres.code = "1";
            xres.message = "UGX. "+amount+" has been deposited onto your MSET account.";
            xres.data = dta;
            callback(xres);
        }
      });
}

function get_similar_companies(simx){
  dbcomp.find({'category':{$in:simx}},function(err, xdata){
    if(err){ 
      console.log(err);
    }else{
      var tumi = [];
      var sandie = [];
      for(var k=0; k<xdata.length; k++){
        var regina = {};
        regina.id = xdata[k].userid.id;
        regina.name = xdata[k].userid.name;
        regina.category = xdata[k].category;
        tumi.push(regina);
        sandie.push(xdata[k].userid.id);
        if(k==xdata.length-1){
          get_similar_contacts(sandie,function(resp){
            send_similar_email(tumi,resp);
          });
        }
      }
    }
  });
}

function get_similar_contacts(tumix,callback){
  dbuser.find({'userid':{$in:tumix}},function(err, xdata){
    if(err){ 
      console.log(err);
    }else{
      callback(xdata);
    } 
  });
}

function send_similar_email(setx,sety){
  var rebecca = [];
  for(var p=0; p<setx.length; p++){
    var ind = _.findLastIndex(sety, {userid:setx[p].id});
    var messx = "Dear "+setx[p].name+". An investor interested in "+setx[p].category+" startups has joined MICROSTOCKS.";
    var messy = {};
    messy.mess = messx;
    var indy = _.findLastIndex(rebecca, {mess:messx});
    if(indy<0){
      console.log(messx);
      rebecca.push(messy);
      mailapi.send_mail(sety[ind].email,"microstocks8@gmail.com",messx,"Microstocks potential investor",function(resp){
        console.log(resp);
       });
      /*smsapi.send_sms(sety[ind].phone,messx,function(resp){
        console.log(resp);
       });*/
    }
  }
}

function find_potential_contacts(catx,namex){
  dbuser.find({'prefs':{$in:[catx]}},function(err, xdata){
    if(err){ 
      console.log(err);
    }else{
      for(var h=0; h<xdata.length; h++){
        var messx = "Dear "+xdata[h].username+". An startup -- "+namex+" -- in category "+catx+" has been registered on MICROSTOCKS.";
        console.log(messx);
        mailapi.send_mail(xdata[h].email,"microstocks8@gmail.com",messx,"Microstocks viable startup",function(resp){
          console.log(resp);
        });
        /*smsapi.send_sms(sety[ind].phone,messx,function(resp){
          console.log(resp);
        });*/
      }
    } 
  });
}



/*get_inv_acc('UAGEF3TZ7V56',function(resp){
 console.log(resp);
});*/

//get_chats("UAGEF3TZ7V56","1001");

//get_chats_heads("UAGEF3TZ7V56");

//admin_get_all_pending_campaigns();

/*var xu = {};
    xu.id='UAGEF3TZ7V56';
    xu.name='jose ssembatya';*/

//receiptz.gen_buy_html("Tusubira Jeremy Francis","TDHUIHUHU4673","RCIEEB54637BB","Wednesday, June 7, 2017 2:30 AM","Mosquito Zapper Lantern: A Mosquito’s Nightmare","45","100000","50","100050");

/*update_comp_shares("CZTLT4AGNA4Z47","34","20000",xu,function(resp){
 console.log(resp);
});*/

/*generate_buy_session("UAGEF3TZ7V56",function(resp){
  console.log(resp);
});*/

/*validate_buy_params("20000","UAGEF3TZ7V56","Y7EWLL56","CZTLT4AGNA4Z47","10",function(resp){
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


