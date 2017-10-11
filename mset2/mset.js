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
    console.log(datad);
    alert(datad.data.message);
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
  });

});
