<?php  ?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Microstocks | Activation</title>
    <link rel="icon" type="image/x-icon" href="../imgz/logo.png" />
    <link rel="shortcut icon" type="image/x-icon" href="../vimgz/logo.png" />
    <script type="text/JavaScript" src="../jquery-2.1.1.js"></script>
    <link rel="stylesheet" type="text/css" media="all" href="../mset.css">
    <script type="text/JavaScript" src="../socket.js"></script>
  </head>
  <body>
    <div align="center"></br></br>
      <div class="fhedx" style="font-size:15px;">Activate your Microstocks account using the</br> credentials sent to your Email address.</div>
      <div class="diva"></br></br>
        <div class="">
          <img src="../imgz/logo.png" alt="" style="height:80px; width:80px;">
        </div>
        <div class="fhedx" style="font-size:17px;">MICROSTOCKS</div>
        <div class="fhedx" style="font-size:15px;">Account Activation</div></br>
        <form class="" id="actform" data-role="none">
          <input type="text" class="di" id="c1" data-role="none" placeholder="Activation Token" required></br>
          <input type="text" class="di" id="c2" data-role="none" placeholder="Activation Code" required></br>
          <input type="submit" name="" class="ds" value="Activate Account" data-role="none"></br></br>
        </form></br>
        <div class="fk" align="center"><div class="ftxt2">Resend Activation Credentials?</div></div>
      </div>

    </div>
    <script type="text/javascript">
     $(document).ready(function(){
       var socket = io(ter);

       $('#actform').on('submit', function()
        {
          var c1 = $('#c1').val().trim();
          var c2 = $('#c2').val().trim();
          var dataset = {};
          dataset.c1 = c1;
          dataset.c2 = c2;
          socket.emit('activationreq',dataset);
          return false;
        });

        socket.on('activationres',function(datad){
         console.log(datad);
        });

     });
    </script>
  </body>
</html>
