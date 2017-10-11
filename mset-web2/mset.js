$(document).ready(function(){

  var socket = io(ter);
  var xu;
  var xcomp;
  var xcmpacc;
  var shrset;
  var xcmpgn = {};
  var sellset;

  $(".buypopup").hide();
  $(".sellpopup").hide();
  $(".nustorydiv").hide();

  $.getJSON('../sess.php', {req:"getid"},function(data){
    $.each(data, function(key, value){
      $(".alexu").html(value.userid.name);
      xu = {id:value.userid.id,name:value.userid.name};
    });
  });


  $('#logform').on('submit', function()
   {
     var a1 = $('#a1').val();
     var a2 = $('#a2').val();
     var logdata = {};
     logdata.a1 = a1;
     logdata.a2 = a2;
     socket.emit('loginreq',logdata);
      //console.log("successfully logged in");
          //alert("successfully logged in");
     return false;
   });

   socket.on('loginres',function(datad){
    var logx = datad.data;
    if(logx.code==4){
      alert("Error while logging in, Please try again with the correct credentials");
    }else if(logx.code==3){
      alert("Your account is pending activation, please activate your account to proceed");
      window.location.href = "untitled.html";
    }else if (logx.code==2){
      console.log(logx);
      var uidx = {};
      uidx.id=logx.data.userid;
      uidx.name=logx.data.username;
      $.getJSON('sess.php', {req:"setid",uid:uidx},function(data){
        $.each(data, function(key, value){
          if(value.codex==20){
            window.location = "profile.php";
          }else{
            alert("Try logging in again");
          }
        });
      });
    }else if (logx.code==1){
      var uidx = {};
      uidx.id=logx.data.userid;
      uidx.name=logx.data.username;
      $.getJSON('sess.php', {req:"setid",uid:uidx},function(data){
        $.each(data, function(key, value){
          if(value.codex==20){
            window.location = "profile.php";
          }else{
            alert("Try logging in again");
          }
        });
      });
    }
  });

  $('#signupform').on('submit', function()
   {
     var b1 = $('#b1').val();
     var b2 = $('#b2').val();
     var b3 = $('#b3 option:selected').text();
     var b4 = $('#b4').val();
     var b5 = $('#b5').val();
     var b6 = $('#b6').val();
     var b7 = $('#b7').val();
     if(b5!=b6){
       alert("passwords donot match");
     }else{
       var signdata = {};
       signdata.b1 = b1;
       signdata.b2 = b2;
       signdata.b3 = b3;
       signdata.b4 = b4;
       signdata.b5 = b5;
       signdata.b7 = b7;
       socket.emit('signupreq',signdata);
     }
     return false;
   });

   socket.on('signupres',function(datad){
    console.log(datad);
        window.location.href= "untitled.html";
  });

   socket.emit('getfeaturedcompsreq');
   socket.on('getfeaturedres',function(datad){
    console.log(datad);
    $("#featured").html("");
         var featuredset = datad.data;
         for(var j=0; j<4; j++){   
           var heading = featuredset[j].compname;

           var cardimage = featuredset[j].banner;

           var cardbody = featuredset[j].description;

           var compidd = featuredset[j].compid;

           //alert(compidd);

           var tgt = numberWithCommas(featuredset[j].target);
           var jerry = '<div class="middle-section-column w-col w-col-3" data-ix="featured-card"><div class="div-block"><img height="200" src="images/proj/'+cardimage+'"><h4 class="heading" id='+compidd+'>'+heading+'</h4><p class="paragraph" >'+cardbody+'</p><div class="div-block-28"></div><div class="div-block-14"><div class="raised-cash"><strong>Raised:'+tgt+'</strong></div></div></div></div>'
            
            $('#featured').append(jerry);
         }
  });

 function numberWithCommas(x){
      return x.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
    }


//explore section
    $('#explorecat1').click(function () {
      var categoryid = "Tech / Software";
        $.get('henry.php',{req:'setid',uid:categoryid},function(resp,status){
         console.log(resp);
        });
        window.open("category.html","_self");
});
     $('#explorecat2').click(function () {
   //alert($(this).text());
   var categoryid = "Clothing";
        $.get('henry.php',{req:'setid',uid:categoryid},function(resp,status){
         console.log(resp);
        });
        window.open("category.html","_self");
});
      $('#explorecat3').click(function () {
  // alert($(this).text());
  var categoryid = "Software";
        $.get('henry.php',{req:'setid',uid:categoryid},function(resp,status){
         console.log(resp);
        });
        window.open("category.html","_self");

});
       $('#explorecat4').click(function () {
  // alert($(this).text());
      var categoryid = "Food Processing";
        $.get('henry.php',{req:'setid',uid:categoryid},function(resp,status){
         console.log(resp);
        });
        window.open("category.html","_self");
  
  }); 
      $('#explorecat5').click(function () {
   //alert($(this).text());
var categoryid = "Lifestyle";
        $.get('henry.php',{req:'setid',uid:categoryid},function(resp,status){
         console.log(resp);
        });
        window.open("category.html","_self");
  
  }); 
        $('#explorecat6').click(function () {
 //  alert($(this).text());
var categoryid = "Technology";
        $.get('henry.php',{req:'setid',uid:categoryid},function(resp,status){
         console.log(resp);
        });
        window.open("category.html","_self"); 
});
 $('#actform').on('submit', function()
        {
          var c1 = $('#c1').val();
          var c2 = $('#c2').val();
          var dataset = {};
          dataset.c1 = c1;
          dataset.c2 = c2;
          socket.emit('activationreq',dataset);
          return false;
        });
        socket.on('activationres',function(datad){
         console.log(datad);
         window.location.href= "profile.html";
        });

 $('#regform').on('submit', function()
   {
     var e1 = $('#e1').val();
     var e2 = $('#e2 option:selected').text();
     var e3 = $('#e3').attr('imgdata');
     var e4 = $('#e4').val();
     var e5 = $('#e5').val();
     var e6 = $('#e6').val();
     var e7 = $('#e7').val();
     var e8 = $('#e8').val();
     var e9 = $('#e9').attr('imgdata');
     var e10 = $('#e10').val();
     var e11 = $('#e11').val();
     var e12 = $('#e12 option:selected').text();
     var e13 = $('#e13').val();
     var e14 = $('#e14').val();
     var e15 = $('#e15 option:selected').text();
     var e16 = $('#e16 option:selected').text();
     if(e16=="I Don't Agree To Terms and Conditions"){
       alert("Agree To Terms and Conditions");
     }else{
       var dataset = {};
       dataset.e1 = e1;
       dataset.e2 = e2;
       dataset.e3 = e3;
       dataset.e4 = e4;
       dataset.e5 = e5;
       dataset.e6 = e6;
       dataset.e7 = e7;
       dataset.e8 = e8;
       dataset.e9 = e9;
       dataset.e10 = e10;
       dataset.e11 = e11;
       dataset.e12 = e12;
       dataset.e13 = e13;
       dataset.e14 = e14;
       dataset.e15 = e15;
       dataset.e16 = e16;
       dataset.e17 = xu;
       socket.emit('compregreq',dataset);
     }
     return false;
   });

   socket.on('compregres',function(datad){
    console.log(datad);
   });


     $('#featured').on('click','.heading', function()
      {
        var stid = $(this).attr("id");
        $.get('henry.php',{req:'setid',uid:stid},function(resp,status){
         console.log(resp);
        });
        window.open("companyprofile.html","_self");
      });



     
});


