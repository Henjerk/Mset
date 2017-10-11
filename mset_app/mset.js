$(document).ready(function(){

  var socket = io(ter);

  $('#logform').on('submit', function()
   {
     var a1 = $('#a1').val();
     var a2 = $('#a2').val();
     var logdata = {};
     logdata.a1 = a1;
     logdata.a2 = a2;
     socket.emit('loginreq',logdata);
     return false;
   });

   socket.on('loginres',function(datad){
    var logx = datad.data;
    if(logx.code==4){
      alert("Error while logging in, Please try again with the correct credentials");
    }else if(logx.code==3){
      alert("Your account is pending activation, please activate your account to proceed");
      window.location.href = "activation";
    }else if (logx.code==2){
      var uidx = {};
      uidx.id=logx.data.userid;
      uidx.name=logx.data.username;
      $.getJSON('sess.php', {req:"setid",uid:uidx},function(data){
        $.each(data, function(key, value){
          if(value.codex==20){
            window.location = "app";
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
            window.location = "app";
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
     var b3 = $('#b3 option:checked').text();
     var b4 = $('#b4').val();
     var b5 = $('#b5').val();
     var b6 = $('#b6').val();
     var b7 = $('#b7').val();
     if(b5!=b6){
       alert("passwords donot match");
     }else{
       var n = $( "input:checked" ).length;
       if(n<=0){
         alert("Please select atleast one category");
       }else{
         var favset = [];
         for(var k=1; k<=10; k++){
           var idx = "cat"+k;
           if(document.getElementById(idx).checked==true){
             favset.push($('#'+idx).val());
           }
         }
         var signdata = {};
         signdata.b1 = b1;
         signdata.b2 = b2;
         signdata.b3 = b3;
         signdata.b4 = b4;
         signdata.b5 = b5;
         signdata.b7 = b7;
         signdata.b8 = favset;
         socket.emit('signupreq',signdata);
       }
     }
     return false;
   });

   socket.on('signupres',function(datad){
    alert(datad.data.message);
    if(datad.data.code==1){
      window.location = "activation";
    }else{
      alert("Error while creating account, please try again");
    }
  });

});
