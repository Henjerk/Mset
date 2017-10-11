<?php


?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Microstocks</title>
    <link rel="icon" type="image/x-icon" href="imgz/logo.png" />
    <link rel="shortcut icon" type="image/x-icon" href="vimgz/logo.png" />
    <script type="text/JavaScript" src="jquery-2.1.1.js"></script>
    <script type="text/JavaScript" src="mset.js"></script>
    <link rel="stylesheet" type="text/css" media="all" href="mset.css">
    <link rel="stylesheet" type="text/css" media="all" href="modalstyle.css">
    <script type="text/JavaScript" src="modalBox.js"></script>
    <link rel="stylesheet" type="text/css" href="jquery.mobile-1.4.5.css">
    <script type="text/JavaScript" src="jquery.mobile-1.4.5.js"></script>
    <script type="text/JavaScript" src="socket.js"></script>
  </head>
  <body body class="whole" align="center">

     <div data-role="page" class="wrapper" id="login" align="center">
        <div class="diva"></br></br>
          <div class="">
            <img src="imgz/logo.png" alt="" style="height:80px; width:80px;">
          </div>
          <div class="fhed3">MICROSTOCKS</div>
          <form class="" id="logform" data-role="none">
            <input type="email" class="di" id="a1" data-role="none" placeholder="Email" required></br>
            <input type="password" class="di" id="a2" data-role="none" placeholder="Password" required></br>
            <input type="submit" name="" class="ds" value="Login" data-role="none"></br></br>
            <a href="#signup" class="hrf" data-role="none" data-transition="slide"><input type="button" name="" class="ds2" value="Sign Up" data-role="none"></a></br></br>
          </form></br>
          <div class="fk" align="center"><div class="ftxt2">Forgot your password?</div></div>
        </div>
     </div>

     <div data-role="page" class="wrapper" id="signup" align="center">
        <div class="diva2"></br>
          <img src="imgz/logo.png" alt="" style="height:60px; width:60px;">
          <div class="fhed3" style="font-size:18px;">MICROSTOCKS</div>
          <form class="" id="signupform" data-role="none">
            <input type="text" class="di" id="b1" data-role="none" placeholder="First & Last Name" required></br>
            <input type="email" class="di" id="b2" data-role="none" placeholder="Email" required></br>
            <input type="number" class="di" id="b7" data-role="none" placeholder="Phone" required></br>
            <select data-role="none" class="dst" id='b3'>
             <option value="" data-role="none" selected>Nationality</option>
             <option value="" data-role="none">Uganda</option>
             <option value="" data-role="none">Kenya</option>
             <option value="" data-role="none">Tanzania</option>
             <option value="" data-role="none">Rwanda</option>
             <option value="" data-role="none">Burundi</option>
             <option value="" data-role="none">Other</option>
            </select></br>
            <div class="categorydiv">
              <div class="cattext">Select atleast one category</div>
              <div class="checkcat">
                 <input type="checkbox" data-role="none" id="cat1" class="checkitem" value="Agribusiness">Agribusiness<br>
                 <input type="checkbox" data-role="none" id="cat2" class="checkitem" value="Manufacturing">Manufacturing<br>
                 <input type="checkbox" data-role="none" id="cat3" class="checkitem" value="Medical / Health">Medical / Health<br>
                 <input type="checkbox" data-role="none" id="cat4" class="checkitem" value="Food / Bevarages">Food / Bevarages<br>
                 <input type="checkbox" data-role="none" id="cat5" class="checkitem" value="Energy / Green-tech">Energy / Green-tech<br>
              </div>
              <div class="checkcat">
                 <input type="checkbox" data-role="none" id="cat6" class="checkitem" value="Tech / Software">Tech / Software<br>
                 <input type="checkbox" data-role="none" id="cat7" class="checkitem" value="Fashion">Fashion<br>
                 <input type="checkbox" data-role="none" id="cat8" class="checkitem" value="Transportation">Transportation<br>
                 <input type="checkbox" data-role="none" id="cat9" class="checkitem" value="Media / Film">Media / Film<br>
                 <input type="checkbox" data-role="none" id="cat10" class="checkitem" value="Laundry">Laundry<br>
              </div>
            </div></br>
            <input type="text" class="di" id="b4" data-role="none" placeholder="Notional-ID No" required></br>
            <input type="password" class="di" id="b5" data-role="none" placeholder="Password" required></br>
            <input type="password" class="di" id="b6" data-role="none" placeholder="Confirm Password" required></br>
            <input type="submit" name="" class="ds" value="Create Account" data-role="none"></br></br>
          </form></br>
          <a href="#login" class="hrf" data-role="none" data-transition="slide"><div class="fk" align="center"><div class="ftxt2">Already have account? Login Here</div></div></a>
        </div>
     </div>

  </body>
</html>
