<?php
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Microstocks | Dashboard</title>
    <link rel="icon" type="image/x-icon" href="../imgz/logo.png" />
    <link rel="shortcut icon" type="image/x-icon" href="../vimgz/logo.png" />
    <script type="text/JavaScript" src="../jquery-2.1.1.js"></script>
    <script type="text/JavaScript" src="admin.js"></script>
    <link rel="stylesheet" type="text/css" media="all" href="../mset.css">
    <link rel="stylesheet" type="text/css" media="all" href="../modalstyle.css">
    <script type="text/JavaScript" src="../modalBox.js"></script>
    <link rel="stylesheet" type="text/css" href="../jquery.mobile-1.4.5.css">
    <script type="text/JavaScript" src="../jquery.mobile-1.4.5.js"></script>
    <script type="text/JavaScript" src="../socket.js"></script>
    <script type="text/JavaScript" src="../moment.js"></script>
  </head>
  <body class="whole" align="center">
    <div data-role="page" class="wrappery" id="home">
       <div data-role="panel" data-display='overlay' class='panelx' id="mypanel1" align='center'>
         <div class="upp"></br>
           <img src="../imgz/logox.png" height="70px"  width="70px" alt="logo"></br>
           <div class="alex"><b>MICROSTOCKS</b></div>
           <div class="alexu">Kabazi Herbert</div></br>
         </div>
         <div class="menulist">
           <a href="#" class="alnk" data-role='none' data-transition="slideup" style="text-decoration:none;"><button class="ui-btn ui-corner-all ui-btn-icon-left ui-icon-mail" style="color:#CD7222; font-size:14px; text-align:left;"> &nbsp; Notifications <span class="ui-li-count ui-btn-up-c ui-btn-corner-all bub">12</span></button></a>
           <a href="#transactions" class="alnk"  data-role='none' data-transition="slideup" style="text-decoration:none;"><button class="ui-btn ui-corner-all ui-btn-icon-left ui-icon-recycle" style="color:#CD7222; font-size:14px; text-align:left;"> &nbsp; Transactions</button></a>
           <a href="#campaigns" class="alnk"  data-role='none' data-transition="slideup" style="text-decoration:none;"><button class="ui-btn ui-corner-all ui-btn-icon-left ui-icon-grid" style="color:#CD7222; font-size:14px; text-align:left;"> &nbsp; Campaigns</button></a>
           <a href="#users" class="alnk"  data-role='none' data-transition="slideup" style="text-decoration:none;"><button class="ui-btn ui-corner-all ui-btn-icon-left ui-icon-user" style="color:#CD7222; font-size:14px; text-align:left;"> &nbsp; Users</button></a>
           <a href="#" class="alnk" data-role='none' data-transition="slideup" style="text-decoration:none;"><button class="ui-btn ui-corner-all ui-btn-icon-left ui-icon-calendar" style="color:#CD7222; font-size:14px; text-align:left;"> &nbsp; Statistics</button></a>
         </div>
      </div>
      <div data-role="header" data-position="fixed" style="">
        <ul class='navxlist'>
          <li style="float:left; margin-left:10px;"><img src="../imgz/logox.png" width="35px" height="35px" alt="logo" style="padding:2px;"/></li>
          <li style="float:left;"><div class='navdivc'>MICROSTOCKS</div></li>
          <li><a data-role="none" href="#mypanel1"><img src="../imgz/setx.png" width="26px" height="26px" alt="logo" style=""/></a></li>
        </ul>
      </div>
    </div>

    <div data-role="page" class="wrappery" id="campaigns">
       <div data-role="panel" data-display='overlay' class='panelx' id="mypanel2" align='center'>
         <div class="upp"></br>
           <img src="../imgz/logox.png" height="70px"  width="70px" alt="logo"></br>
           <div class="alex"><b>MICROSTOCKS</b></div>
           <div class="alexu">Kabazi Herbert</div></br>
         </div>
         <div class="menulist">
           <a href="#" class="alnk" data-role='none' data-transition="slideup" style="text-decoration:none;"><button class="ui-btn ui-corner-all ui-btn-icon-left ui-icon-mail" style="color:#CD7222; font-size:14px; text-align:left;"> &nbsp; Notifications <span class="ui-li-count ui-btn-up-c ui-btn-corner-all bub">12</span></button></a>
           <a href="#transactions" class="alnk"  data-role='none' data-transition="slideup" style="text-decoration:none;"><button class="ui-btn ui-corner-all ui-btn-icon-left ui-icon-recycle" style="color:#CD7222; font-size:14px; text-align:left;"> &nbsp; Transactions</button></a>
           <a href="#campaigns" class="alnk"  data-role='none' data-transition="slideup" style="text-decoration:none;"><button class="ui-btn ui-corner-all ui-btn-icon-left ui-icon-grid" style="color:#CD7222; font-size:14px; text-align:left;"> &nbsp; Campaigns</button></a>
           <a href="#users" class="alnk"  data-role='none' data-transition="slideup" style="text-decoration:none;"><button class="ui-btn ui-corner-all ui-btn-icon-left ui-icon-user" style="color:#CD7222; font-size:14px; text-align:left;"> &nbsp; Users</button></a>
           <a href="#" class="alnk" data-role='none' data-transition="slideup" style="text-decoration:none;"><button class="ui-btn ui-corner-all ui-btn-icon-left ui-icon-calendar" style="color:#CD7222; font-size:14px; text-align:left;"> &nbsp; Statistics</button></a>
         </div>
      </div>
      <div data-role="header" data-position="fixed" style="">
        <ul class='navxlist'>
          <li style="float:left; margin-left:10px;"><img src="../imgz/logox.png" width="35px" height="35px" alt="logo" style="padding:2px;"/></li>
          <li style="float:left;"><div class='navdivc'>MICROSTOCKS</div></li>
          <li><a data-role="none" href="#mypanel2"><img src="../imgz/setx.png" width="26px" height="26px" alt="logo" style=""/></a></li>
          <li><a data-role="none" class="act" style="color:#CD7222 !important;" href="#campaignsx">Campaigns</a></li>
          <li><a data-role="none" href="#suspendedx">Suspended</a></li>
          <li><a data-role="none" href="#expiredx">Expired</a></li>
          <li><a data-role="none" href="#pendingx">Pending</a></li>
          <li><a data-role="none" href="#activex">Active</a></li>
        </ul>
      </div>
      <div data-role="content" class="content" id="content" align='center' style="">
        <div class="resultsdiv">
          <table id='t01'></table>
        </div>
      </div>
    </div>

    <div data-role="page" class="wrappery" id="transactions">
       <div data-role="panel" data-display='overlay' class='panelx' id="mypanel3" align='center'>
         <div class="upp"></br>
           <img src="../imgz/logox.png" height="70px"  width="70px" alt="logo"></br>
           <div class="alex"><b>MICROSTOCKS</b></div>
           <div class="alexu">Kabazi Herbert</div></br>
         </div>
         <div class="menulist">
           <a href="#" class="alnk" data-role='none' data-transition="slideup" style="text-decoration:none;"><button class="ui-btn ui-corner-all ui-btn-icon-left ui-icon-mail" style="color:#CD7222; font-size:14px; text-align:left;"> &nbsp; Notifications <span class="ui-li-count ui-btn-up-c ui-btn-corner-all bub">12</span></button></a>
           <a href="#transactions" class="alnk"  data-role='none' data-transition="slideup" style="text-decoration:none;"><button class="ui-btn ui-corner-all ui-btn-icon-left ui-icon-recycle" style="color:#CD7222; font-size:14px; text-align:left;"> &nbsp; Transactions</button></a>
           <a href="#campaigns" class="alnk"  data-role='none' data-transition="slideup" style="text-decoration:none;"><button class="ui-btn ui-corner-all ui-btn-icon-left ui-icon-grid" style="color:#CD7222; font-size:14px; text-align:left;"> &nbsp; Campaigns</button></a>
           <a href="#users" class="alnk"  data-role='none' data-transition="slideup" style="text-decoration:none;"><button class="ui-btn ui-corner-all ui-btn-icon-left ui-icon-user" style="color:#CD7222; font-size:14px; text-align:left;"> &nbsp; Users</button></a>
           <a href="#" class="alnk" data-role='none' data-transition="slideup" style="text-decoration:none;"><button class="ui-btn ui-corner-all ui-btn-icon-left ui-icon-calendar" style="color:#CD7222; font-size:14px; text-align:left;"> &nbsp; Statistics</button></a>
         </div>
      </div>
      <div data-role="header" data-position="fixed" style="">
        <ul class='navxlist'>
          <li style="float:left; margin-left:10px;"><img src="../imgz/logox.png" width="35px" height="35px" alt="logo" style="padding:2px;"/></li>
          <li style="float:left;"><div class='navdivc'>MICROSTOCKS</div></li>
          <li><a data-role="none" href="#mypanel3"><img src="../imgz/setx.png" width="26px" height="26px" alt="logo" style=""/></a></li>
          <li><a data-role="none" class="act" style="color:#CD7222 !important;" href="#transactionsx">Transactions</a></li>
          <li><a data-role="none" href="#indsell">Individual-selling</a></li>
          <li><a data-role="none" href="#indbuy">Individual-buying</a></li>
          <li><a data-role="none" href="#compbuy">Company-buying</a></li>
          <li><a data-role="none" href="#deposit">Deposit</a></li>
          <li><a data-role="none" href="#cashout">Cashout</a></li>
        </ul>
      </div>
      <div data-role="content" class="content" id="content" align='center' style="">
        <div class="resultsdiv">
          <table id='t02'></table>
        </div>
      </div>
    </div>

    <div data-role="page" class="wrappery" id="users">
       <div data-role="panel" data-display='overlay' class='panelx' id="mypanel4" align='center'>
         <div class="upp"></br>
           <img src="../imgz/logox.png" height="70px"  width="70px" alt="logo"></br>
           <div class="alex"><b>MICROSTOCKS</b></div>
           <div class="alexu">Kabazi Herbert</div></br>
         </div>
         <div class="menulist">
           <a href="#" class="alnk" data-role='none' data-transition="slideup" style="text-decoration:none;"><button class="ui-btn ui-corner-all ui-btn-icon-left ui-icon-mail" style="color:#CD7222; font-size:14px; text-align:left;"> &nbsp; Notifications <span class="ui-li-count ui-btn-up-c ui-btn-corner-all bub">12</span></button></a>
           <a href="#transactions" class="alnk"  data-role='none' data-transition="slideup" style="text-decoration:none;"><button class="ui-btn ui-corner-all ui-btn-icon-left ui-icon-recycle" style="color:#CD7222; font-size:14px; text-align:left;"> &nbsp; Transactions</button></a>
           <a href="#campaigns" class="alnk"  data-role='none' data-transition="slideup" style="text-decoration:none;"><button class="ui-btn ui-corner-all ui-btn-icon-left ui-icon-grid" style="color:#CD7222; font-size:14px; text-align:left;"> &nbsp; Campaigns</button></a>
           <a href="#users" class="alnk"  data-role='none' data-transition="slideup" style="text-decoration:none;"><button class="ui-btn ui-corner-all ui-btn-icon-left ui-icon-user" style="color:#CD7222; font-size:14px; text-align:left;"> &nbsp; Users</button></a>
           <a href="#" class="alnk" data-role='none' data-transition="slideup" style="text-decoration:none;"><button class="ui-btn ui-corner-all ui-btn-icon-left ui-icon-calendar" style="color:#CD7222; font-size:14px; text-align:left;"> &nbsp; Statistics</button></a>
         </div>
      </div>
      <div data-role="header" data-position="fixed" style="">
        <ul class='navxlist'>
          <li style="float:left; margin-left:10px;"><img src="../imgz/logox.png" width="35px" height="35px" alt="logo" style="padding:2px;"/></li>
          <li style="float:left;"><div class='navdivc'>MICROSTOCKS</div></li>
          <li><a data-role="none" href="#mypanel4"><img src="../imgz/setx.png" width="26px" height="26px" alt="logo" style=""/></a></li>
          <li><a data-role="none" class="act" style="color:#CD7222 !important;" href="#usersx">Users / Investors</a></li>
          <li><a data-role="none" href="#suspendedy">Suspended</a></li>
          <li><a data-role="none" href="#pendingy">Pending</a></li>
          <li><a data-role="none" href="#activey">Active</a></li>
        </ul>
      </div>
      <div data-role="content" class="content" id="content" align='center' style="">
        <div class="resultsdiv">
          <table id='t03'></table>
        </div>
      </div>
    </div>

  </body>
</html>
