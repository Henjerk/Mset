<?php
session_start();
if(isset($_SESSION['uid']) && !empty($_SESSION['uid'])){

}else{
	header("Location: ../");
  die();
}
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Microstocks | Dashboard</title>
    <link rel="icon" type="image/x-icon" href="../imgz/logo.png" />
    <link rel="shortcut icon" type="image/x-icon" href="../vimgz/logo.png" />
    <script type="text/JavaScript" src="../jquery-2.1.1.js"></script>
    <script type="text/JavaScript" src="msetapp.js"></script>
    <link rel="stylesheet" type="text/css" media="all" href="../mset.css">
    <link rel="stylesheet" type="text/css" media="all" href="../modalstyle.css">
    <script type="text/JavaScript" src="../modalBox.js"></script>
    <link rel="stylesheet" type="text/css" href="../jquery.mobile-1.4.5.css">
    <script type="text/JavaScript" src="../jquery.mobile-1.4.5.js"></script>
    <script type="text/JavaScript" src="../socket.js"></script>
    <script type="text/JavaScript" src="../moment.js"></script>
    <script type="text/JavaScript" src="../shorten.js"></script>
		<script type='text/JavaScript' src='../underscore-min.js'></script>
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
          <a href="#notifications" class="alnk" data-role='none' data-transition="slideup" style="text-decoration:none;"><button class="ui-btn ui-corner-all ui-btn-icon-left ui-icon-mail" style="color:#CD7222; font-size:14px; text-align:left;"> &nbsp; Notifications <span class="ui-li-count ui-btn-up-c ui-btn-corner-all bub">12</span></button></a>
          <a href="#home" class="alnk"  data-role='none' data-transition="slideup" style="text-decoration:none;"><button class="ui-btn ui-corner-all ui-btn-icon-left ui-icon-home" style="color:#CD7222; font-size:14px; text-align:left;"> &nbsp; Home</button></a>
          <a href="#shares" class="alnk"  data-role='none' data-transition="slideup" style="text-decoration:none;"><button class="ui-btn ui-corner-all ui-btn-icon-left ui-icon-grid" style="color:#CD7222; font-size:14px; text-align:left;"> &nbsp; Stock / Shares</button></a>
					<a href="#logout" class="alnk"  data-role='none' data-transition="slideup" style="text-decoration:none;"><button class="ui-btn ui-corner-all ui-btn-icon-left ui-icon-power" style="color:#CD7222; font-size:14px; text-align:left;"> &nbsp; Logout</button></a>
        </div>
     </div>
     <div data-role="header" data-position="fixed" style="">
       <ul class='navxlist'>
         <li style="float:left; margin-left:10px;"><img src="../imgz/logox.png" width="35px" height="35px" alt="logo" style="padding:2px;"/></li>
         <li style="float:left;"><div class='navdivc'>MICROSTOCKS</div></li>

         <li><a data-role="none" href="#mypanel1"><img src="../imgz/setx.png" width="26px" height="26px" alt="logo" style=""/></a></li>
         <li><a data-role="none" href="#notifications">Notifications</a></li>
         <li><a data-role="none" href="#startups">Startups</a></li>
         <li><a data-role="none" href="#mycampaigns">Campaigns</a></li>
         <li><a data-role="none" href="#startcampaign">Start-Campaign</a></li>
       </ul>
     </div>
		 <div data-role="content" class="wrappery" id="content" align='center' style="">
			 <div class="cardsx">
         <div class="incardx"></br>
					 <div class='fllwicn2'><div class='fllwltt2'>G</div></div><div class='fllwnme2'><div id="kju" class='fllwcmpn2'>SEMBATYA JOSEPH</div><div class='fllwcat2'>Status : Activated</div></div>
				 </div>
				 <div class="incardx" id="hyu"></br>
					 <b>Credit : </b> UGX 2000000. </br>
					 <div class="depobutt">DEPOSIT</div>
				 </div>
			 </div>
			 <div id="jeff"></div>
			 <div class="depopopup">
				 <div class="depopopuphed"> </div></br>
				 <form class="" id="depoform">
					 <div id="blk"></div>
					 <input type="number" class="di" id="sbpa1" data-role="none" placeholder="Amount" required></br>
					 <input type="number" class="di" id="sbpa2" data-role="none" placeholder="Phone" required></br></br>
					 <input type="submit" name="" class="ds4" value="Deposit Funds" data-role="none"></br></br>
				 </form></br>
				</div>
			 <div id="solomon" style="margin-left:50px;" align='left'></div>
			 <div id="solomonstory" style="margin-left:50px;" align='left'></div>
		 </div>
   </div>

   <div data-role="page" class="wrapperx" id="startcampaign">
      <div data-role="panel" data-display='overlay' class='panelx' id="mypanel2" align='center'>
        <div class="upp"></br>
          <img src="../imgz/logox.png" height="70px"  width="70px" alt="logo"></br>
          <div class="alex"><b>MICROSTOCKS</b></div>
          <div class="alexu">Kabazi Herbert</div></br>
        </div>
        <div class="menulist">
          <a href="#notifications" class="alnk" data-role='none' data-transition="slideup" style="text-decoration:none;"><button class="ui-btn ui-corner-all ui-btn-icon-left ui-icon-mail" style="color:#CD7222; font-size:14px; text-align:left;"> &nbsp; Notifications <span class="ui-li-count ui-btn-up-c ui-btn-corner-all bub">12</span></button></a>
          <a href="#home" class="alnk"  data-role='none' data-transition="slideup" style="text-decoration:none;"><button class="ui-btn ui-corner-all ui-btn-icon-left ui-icon-home" style="color:#CD7222; font-size:14px; text-align:left;"> &nbsp; Home</button></a>

          <a href="#shares" class="alnk"  data-role='none' data-transition="slideup" style="text-decoration:none;"><button class="ui-btn ui-corner-all ui-btn-icon-left ui-icon-grid" style="color:#CD7222; font-size:14px; text-align:left;"> &nbsp; Stock / Shares</button></a>
					<a href="#logout" class="alnk"  data-role='none' data-transition="slideup" style="text-decoration:none;"><button class="ui-btn ui-corner-all ui-btn-icon-left ui-icon-power" style="color:#CD7222; font-size:14px; text-align:left;"> &nbsp; Logout</button></a>
        </div>
     </div>
     <div data-role="header" data-position="fixed" style="">
       <ul class='navxlist'>
         <li style="float:left; margin-left:10px;"><img src="../imgz/logox.png" width="35px" height="35px" alt="logo" style="padding:2px;"/></li>
         <li style="float:left;"><div class='navdivc'>MICROSTOCKS</div></li>

         <li><a data-role="none" href="#mypanel2"><img src="../imgz/setx.png" width="26px" height="26px" alt="logo" style=""/></a></li>
         <li><a data-role="none" href="#notifications">Notifications</a></li>
         <li><a data-role="none" href="#startups">Startups</a></li>
         <li><a data-role="none" href="#mycampaigns">Campaigns</a></li>
         <li><a data-role="none" class="act" style="color:#CD7222 !important;" href="#startcampaign">Start-Campaign</a></li>
       </ul>
     </div>
     <div data-role="content" class="content" id="content" align='center' style="">
        <form class="" id="regform" data-role="none">
           <div class="regdiv">
               <div class="regdivin">
                 <div class="ftxt4">Comapny Name:</div>
                 <div class=""><input type="text" class="di2" id="e1" data-role="none" placeholder="Your startup/business name" min="5" max="50" required></div>
               </div>
               <div class="regdivin">
                 <div class="ftxt4">Company Category:</div>
                 <select data-role="none" class="dst2" id='e2'>
                  <option value="" data-role="none">Tech / Software</option>
                  <option value="" data-role="none">Agribusiness</option>
                  <option value="" data-role="none">Fashion</option>
                  <option value="" data-role="none">Manufacturing</option>
                  <option value="" data-role="none">Transportation</option>
                  <option value="" data-role="none">Medical / Health</option>
                  <option value="" data-role="none">Energy / Green-tech</option>
                  <option value="" data-role="none">Media / Film</option>
                  <option value="" data-role="none">Food / Bevarages</option>
                  <option value="" data-role="none">Laundry</option>
                 </select></br>
               </div></br>
               <div class="regdivin">
                 <div class="ftxt4">Logo image:</div>
                 <div class="">
                   <input type='file' id="imgInpx" name="imgInpx" data-role="none" class="imgInpx"/>
                   <label for="imgInpx" data-role="none">
                    <div class="imgbutt" id="e3" imgdata=""></div>
                   </label>
                 </div>
               </div>
               <div class="regdivin">
                 <div class="ftxt4">Company Registration-ID:</div>
                 <div class=""><input type="text" class="di2" id="e4" data-role="none" placeholder="Your startup/business registration" required></div>
               </div></br>
               <div class="regdivin">
                 <div class="ftxt4">Address:</div>
                 <div class=""><textarea id="e5" class="dt" data-role="none" placeholder="Your startup/business detailed address" required></textarea></div>
               </div>
               <div class="regdivin">
                 <div class="ftxt4">Pitch Text:</div>
                 <div class=""><textarea id="e6" class="dt" data-role="none" placeholder="Brief description of what your startup does" min="20" max="200" required></textarea></div>
               </div></br>
               <div class="regdivin">
                 <div class="ftxt4">Description:</div>
                 <div class=""><textarea id="e7" class="dt" data-role="none" placeholder="Complete/detailed description of what your startup does" required></textarea></div>
               </div>
               <div class="regdivin">
                 <div class="ftxt4">Other details / Tags:</div>
                 <div class=""><textarea id="e8" class="dt" data-role="none" placeholder="Other details that you wish to say about your startup or hashtags to describe your idea"></textarea></div>
               </div></br>
               <div class="regdivin">
                 <div class="ftxt4">Banner image:</div>
                 <div class="">
                   <input type='file' id="imgInp" name="imgInp" data-role="none" class="imgInp"/>
                   <label for="imgInp" data-role="none">
                    <div class="imgbutt" id="e9" imgdata=""></div>
                   </label>
                 </div>
               </div>
               <div class="regdivin">
                 <div class="ftxt4">Video url:</div>
                 <div class=""><input type="text" class="di2" id="e10" data-role="none" placeholder="Website url for videos about your products"></div>
               </div></br>
           </div>

           <div class="regdiv">
               <div class="regdivin">
                 <div class="ftxt4">Target amount:</div>
                 <div class=""><input type="number" class="di2" id="e11" data-role="none" placeholder="Amount of money to raise" min="50000" max="50000000" required></div>
               </div>
               <div class="regdivin">
                 <div class="ftxt4">Campaign Period:</div>
                 <select data-role="none" class="dst2" id='e12'>
                  <option value="" data-role="none">2 months</option>
                  <option value="" data-role="none">4 months</option>
                  <option value="" data-role="none">6 months</option>
                  <option value="" data-role="none">10 months</option>
                  <option value="" data-role="none">1 year</option>
                 </select></br>
               </div></br>
               <div class="regdivin">
                 <div class="ftxt4">Share price:</div>
                 <div class=""><input type="number" class="di2" id="e13" data-role="none" placeholder="Price of each share" min="1" max="50000" required></div>
               </div>
               <div class="regdivin">
                 <div class="ftxt4">Share percentage:</div>
                 <div class=""><input type="number" class="di2" id="e14" data-role="none" placeholder="percentage of shares/stock for sale" min="5" max="99" required></div>
               </div></br>
               <div class="regdivin">
                 <div class="ftxt4">Cashout policy:</div>
                 <select data-role="none" class="dst2" id='e15'>
                  <option value="" data-role="none">Cashout at Campaign-end</option>
                  <option value="" data-role="none">Cashout in Installments</option>
                 </select></br>
               </div>
               <div class="regdivin">
                 <div class="ftxt4">Terms and conditions:</div>
                 <select data-role="none" class="dst2" id='e16'>
                  <option value="" data-role="none">I Don't Agree To Terms and Conditions</option>
                  <option value="" data-role="none">Agree To Terms and Conditions</option>
                 </select></br>
               </div></br>
           </div></br></br>
           <input type="submit" name="" class="ds3" value="Submit Campaign" data-role="none">
        </form>
     </div>
   </div>

   <div data-role="page" class="wrappery" id="startups">
      <div data-role="panel" data-display='overlay' class='panelx' id="mypanel1" align='center'>
        <div class="upp"></br>
          <img src="../imgz/logox.png" height="70px"  width="70px" alt="logo"></br>
          <div class="alex"><b>MICROSTOCKS</b></div>
          <div class="alexu">Kabazi Herbert</div></br>
        </div>
        <div class="menulist">
          <a href="#notifications" class="alnk" data-role='none' data-transition="slideup" style="text-decoration:none;"><button class="ui-btn ui-corner-all ui-btn-icon-left ui-icon-mail" style="color:#CD7222; font-size:14px; text-align:left;"> &nbsp; Notifications <span class="ui-li-count ui-btn-up-c ui-btn-corner-all bub">12</span></button></a>
          <a href="#home" class="alnk"  data-role='none' data-transition="slideup" style="text-decoration:none;"><button class="ui-btn ui-corner-all ui-btn-icon-left ui-icon-home" style="color:#CD7222; font-size:14px; text-align:left;"> &nbsp; Home</button></a>

          <a href="#shares" class="alnk"  data-role='none' data-transition="slideup" style="text-decoration:none;"><button class="ui-btn ui-corner-all ui-btn-icon-left ui-icon-grid" style="color:#CD7222; font-size:14px; text-align:left;"> &nbsp; Stock / Shares</button></a>





					  <a href="#logout" class="alnk"  data-role='none' data-transition="slideup" style="text-decoration:none;"><a href="#logout" class="alnk"  data-role='none' data-transition="slideup" style="text-decoration:none;"><button class="ui-btn ui-corner-all ui-btn-icon-left ui-icon-power" style="color:#CD7222; font-size:14px; text-align:left;"> &nbsp; Logout</button></a></a>
        </div>
     </div>
     <div data-role="header" data-position="fixed" style="">
       <ul class='navxlist'>
         <li style="float:left; margin-left:10px;"><img src="../imgz/logox.png" width="35px" height="35px" alt="logo" style="padding:2px;"/></li>
         <li style="float:left;"><div class='navdivc'>MICROSTOCKS</div></li>

         <li><a data-role="none" href="#mypanel1"><img src="../imgz/setx.png" width="26px" height="26px" alt="logo" style=""/></a></li>
         <li><a data-role="none" href="#notifications">Notifications</a></li>
         <li><a data-role="none" class="act" style="color:#CD7222 !important;" href="#startups">Startups</a></li>
         <li><a data-role="none" href="#mycampaigns">Campaigns</a></li>
         <li><a data-role="none" href="#startcampaign">Start-Campaign</a></li>
       </ul>
     </div>
     <div data-role="content" class="content" id="content" align='center' style="">

      <div id="romero" align="left"></div>

     </div>
   </div>

   <div data-role="page" class="wrappery" id="startupx">
      <div data-role="panel" data-display='overlay' class='panelx' id="mypanel9" align='center'>
        <div class="upp"></br>
          <img src="../imgz/logox.png" height="70px"  width="70px" alt="logo"></br>
          <div class="alex"><b>MICROSTOCKS</b></div>
          <div class="alexu">Kabazi Herbert</div></br>
        </div>
        <div class="menulist">
          <a href="#notifications" class="alnk" data-role='none' data-transition="slideup" style="text-decoration:none;"><button class="ui-btn ui-corner-all ui-btn-icon-left ui-icon-mail" style="color:#CD7222; font-size:14px; text-align:left;"> &nbsp; Notifications <span class="ui-li-count ui-btn-up-c ui-btn-corner-all bub">12</span></button></a>
          <a href="#home" class="alnk"  data-role='none' data-transition="slideup" style="text-decoration:none;"><button class="ui-btn ui-corner-all ui-btn-icon-left ui-icon-home" style="color:#CD7222; font-size:14px; text-align:left;"> &nbsp; Home</button></a>
          <a href="#shares" class="alnk"  data-role='none' data-transition="slideup" style="text-decoration:none;"><button class="ui-btn ui-corner-all ui-btn-icon-left ui-icon-grid" style="color:#CD7222; font-size:14px; text-align:left;"> &nbsp; Stock / Shares</button></a>
					<a href="#logout" class="alnk"  data-role='none' data-transition="slideup" style="text-decoration:none;"><button class="ui-btn ui-corner-all ui-btn-icon-left ui-icon-power" style="color:#CD7222; font-size:14px; text-align:left;"> &nbsp; Logout</button></a>
        </div>
     </div>
     <div data-role="header" data-position="fixed" style="">
       <ul class='navxlist'>
         <li style="float:left; margin-left:10px;"><img src="../imgz/logox.png" width="35px" height="35px" alt="logo" style="padding:2px;"/></li>
         <li style="float:left;"><div class='navdivc'>MICROSTOCKS</div></li>
         <li><a data-role="none" href="#mypanel9"><img src="../imgz/setx.png" width="26px" height="26px" alt="logo" style=""/></a></li>
         <li><a data-role="none" href="#notifications">Notifications</a></li>
         <li><a data-role="none" href="#startups">Startups</a></li>
         <li><a data-role="none" href="#mycampaigns">Campaigns</a></li>
         <li><a data-role="none" href="#startcampaign">Start-Campaign</a></li>
       </ul>
     </div>
     <div data-role="content" class="content" id="content" align='center' style="">
         <div id="sande" align="center"></div>
         <div id="sande_stories" align="left"></div>
         <div class="buypopup">
           <div class="buypopuphed"> </div></br>
           <form class="" id="buyform">
             <div id="lena"></div>
             <input type="number" class="di" id="bp1" data-role="none" placeholder="Shares" required></br>
             <input type="password" class="di" id="bp2" data-role="none" placeholder="Transaction PIN" required></br></br>
             <input type="submit" name="" class="ds4" value="Buy Shares" data-role="none"></br></br>
           </form></br>
          </div>
       </div>
     </div>

     <div data-role="page" class="wrappery" id="mycampaigns">
        <div data-role="panel" data-display='overlay' class='panelx' id="mypanel3" align='center'>
          <div class="upp"></br>
            <img src="../imgz/logox.png" height="70px"  width="70px" alt="logo"></br>
            <div class="alex"><b>MICROSTOCKS</b></div>
            <div class="alexu">Kabazi Herbert</div></br>
          </div>
          <div class="menulist">
            <a href="#notifications" class="alnk" data-role='none' data-transition="slideup" style="text-decoration:none;"><button class="ui-btn ui-corner-all ui-btn-icon-left ui-icon-mail" style="color:#CD7222; font-size:14px; text-align:left;"> &nbsp; Notifications <span class="ui-li-count ui-btn-up-c ui-btn-corner-all bub">12</span></button></a>
            <a href="#home" class="alnk"  data-role='none' data-transition="slideup" style="text-decoration:none;"><button class="ui-btn ui-corner-all ui-btn-icon-left ui-icon-home" style="color:#CD7222; font-size:14px; text-align:left;"> &nbsp; Home</button></a>
            <a href="#shares" class="alnk"  data-role='none' data-transition="slideup" style="text-decoration:none;"><button class="ui-btn ui-corner-all ui-btn-icon-left ui-icon-grid" style="color:#CD7222; font-size:14px; text-align:left;"> &nbsp; Stock / Shares</button></a>
						<a href="#logout" class="alnk"  data-role='none' data-transition="slideup" style="text-decoration:none;"><button class="ui-btn ui-corner-all ui-btn-icon-left ui-icon-power" style="color:#CD7222; font-size:14px; text-align:left;"> &nbsp; Logout</button></a>
          </div>
       </div>
       <div data-role="header" data-position="fixed" style="">
         <ul class='navxlist'>
           <li style="float:left; margin-left:10px;"><img src="../imgz/logox.png" width="35px" height="35px" alt="logo" style="padding:2px;"/></li>
           <li style="float:left;"><div class='navdivc'>MICROSTOCKS</div></li>
           <li><a data-role="none" href="#mypanel3"><img src="../imgz/setx.png" width="26px" height="26px" alt="logo" style=""/></a></li>
           <li><a data-role="none" href="#notifications">Notifications</a></li>
           <li><a data-role="none" href="#startups">Startups</a></li>
           <li><a data-role="none" class="act" style="color:#CD7222 !important;" href="#mycampaigns">Campaigns</a></li>
           <li><a data-role="none" href="#startcampaign">Start-Campaign</a></li>
         </ul>
       </div>
       <div data-role="content" class="content" id="content" align='center' style="">

        <div id="faith" align="left"></div>
        <div class="nustorydiv">
         <form class="" id="#nustoryform">
            <div class="nustotydivin">
              <div class="nustypopuphed"> </div></br>
              <div class="ftxt5">Product story:</div>
              <div class=""><textarea id="str1" class="stry" data-role="none" placeholder="Write your product story .... "></textarea></div></br>
              <div class="ftxt5">Story image:</div>
              <div class="">
                <input type='file' id="imgInpy" name="imgInpy" data-role="none" class="imgInpy"/>
                <label for="imgInpy" data-role="none">
                 <div class="stryimgbutt" id="str2" imgdata=""></div>
                </label>
              </div></br>
              <input type="button" name="" class="ds5" value="Add Story" id="addstry" data-role="none"></br>
            </div></br>
          </form>
        </div>

       </div>
     </div>

     <div data-role="page" class="wrapperx" id="notifications">
        <div data-role="panel" data-display='overlay' class='panelx' id="mypanel4" align='center'>
          <div class="upp"></br>
            <img src="../imgz/logox.png" height="70px"  width="70px" alt="logo"></br>
            <div class="alex"><b>MICROSTOCKS</b></div>
            <div class="alexu">Kabazi Herbert</div></br>
          </div>
          <div class="menulist">
            <a href="#notifications" class="alnk" data-role='none' data-transition="slideup" style="text-decoration:none;"><button class="ui-btn ui-corner-all ui-btn-icon-left ui-icon-mail" style="color:#CD7222; font-size:14px; text-align:left;"> &nbsp; Notifications <span class="ui-li-count ui-btn-up-c ui-btn-corner-all bub">12</span></button></a>
            <a href="#home" class="alnk"  data-role='none' data-transition="slideup" style="text-decoration:none;"><button class="ui-btn ui-corner-all ui-btn-icon-left ui-icon-home" style="color:#CD7222; font-size:14px; text-align:left;"> &nbsp; Home</button></a>
            <a href="#shares" class="alnk"  data-role='none' data-transition="slideup" style="text-decoration:none;"><button class="ui-btn ui-corner-all ui-btn-icon-left ui-icon-grid" style="color:#CD7222; font-size:14px; text-align:left;"> &nbsp; Stock / Shares</button></a>
						<a href="#logout" class="alnk"  data-role='none' data-transition="slideup" style="text-decoration:none;"><button class="ui-btn ui-corner-all ui-btn-icon-left ui-icon-power" style="color:#CD7222; font-size:14px; text-align:left;"> &nbsp; Logout</button></a>
          </div>
       </div>
       <div data-role="header" data-position="fixed" style="">
         <ul class='navxlist'>
           <li style="float:left; margin-left:10px;"><img src="../imgz/logox.png" width="35px" height="35px" alt="logo" style="padding:2px;"/></li>
           <li style="float:left;"><div class='navdivc'>MICROSTOCKS</div></li>

           <li><a data-role="none" href="#mypanel4"><img src="../imgz/setx.png" width="26px" height="26px" alt="logo" style=""/></a></li>
           <li><a data-role="none" class="act" style="color:#CD7222 !important;" href="#notifications">Notifications</a></li>
           <li><a data-role="none" href="#startups">Startups</a></li>
           <li><a data-role="none" href="#mycampaigns">Campaigns</a></li>
           <li><a data-role="none" href="#startcampaign">Start-Campaign</a></li>
         </ul>
       </div>
       <div data-role="content" class="content" id="content" align='center' style="">
         <div class="notifydiv">
          <div class="notifydiv1" align="left">

          </div>
          <div class="notifydiv2"></div>
					<div class="sellpopup2">
						<div class="sellpopuphed2"> </div></br>
						<div class="qbuytxt"></div>
						<form class="" id="sellform2">
							<input type="password" class="di" id="sbp22" data-role="none" placeholder="Transaction PIN" required></br></br>
							<input type="submit" name="" class="ds4" value="Buy Shares" data-role="none"></br></br>
						</form></br>
					 </div>
         </div>
       </div>
     </div>

		 <div data-role="page" class="wrapperx" id="shares">
				<div data-role="panel" data-display='overlay' class='panelx' id="mypanel5" align='center'>
					<div class="upp"></br>
						<img src="../imgz/logox.png" height="70px"  width="70px" alt="logo"></br>
						<div class="alex"><b>MICROSTOCKS</b></div>
						<div class="alexu">Kabazi Herbert</div></br>
					</div>
					<div class="menulist">
						<a href="#notifications" class="alnk" data-role='none' data-transition="slideup" style="text-decoration:none;"><button class="ui-btn ui-corner-all ui-btn-icon-left ui-icon-mail" style="color:#CD7222; font-size:14px; text-align:left;"> &nbsp; Notifications <span class="ui-li-count ui-btn-up-c ui-btn-corner-all bub">12</span></button></a>
						<a href="#home" class="alnk"  data-role='none' data-transition="slideup" style="text-decoration:none;"><button class="ui-btn ui-corner-all ui-btn-icon-left ui-icon-home" style="color:#CD7222; font-size:14px; text-align:left;"> &nbsp; Home</button></a>
						<a href="#shares" class="alnk"  data-role='none' data-transition="slideup" style="text-decoration:none;"><button class="ui-btn ui-corner-all ui-btn-icon-left ui-icon-grid" style="color:#CD7222; font-size:14px; text-align:left;"> &nbsp; Stock / Shares</button></a>
						<a href="#logout" class="alnk"  data-role='none' data-transition="slideup" style="text-decoration:none;"><button class="ui-btn ui-corner-all ui-btn-icon-left ui-icon-power" style="color:#CD7222; font-size:14px; text-align:left;"> &nbsp; Logout</button></a>
					</div>
			 </div>
			 <div data-role="header" data-position="fixed" style="">
				 <ul class='navxlist'>
					 <li style="float:left; margin-left:10px;"><img src="../imgz/logox.png" width="35px" height="35px" alt="logo" style="padding:2px;"/></li>
					 <li style="float:left;"><div class='navdivc'>MICROSTOCKS</div></li>

					 <li><a data-role="none" href="#mypanel5"><img src="../imgz/setx.png" width="26px" height="26px" alt="logo" style=""/></a></li>
					 <li><a data-role="none" href="#notifications">Notifications</a></li>
					 <li><a data-role="none" class="act" style="color:#CD7222 !important;" href="#startups">Startups</a></li>
					 <li><a data-role="none" href="#mycampaigns">Campaigns</a></li>
					 <li><a data-role="none" href="#startcampaign">Start-Campaign</a></li>
				 </ul>
			 </div>
			 <div data-role="content" class="content" id="content" align='center' style="">
				 <div id="jeff"></div>
				 <div class="sellpopup">
					 <div class="sellpopuphed"> </div></br>
					 <form class="" id="sellform">
						 <div id="kabazi"></div>
						 <input type="number" class="di" id="sbp1" data-role="none" placeholder="Shares" required></br>
						 <input type="password" class="di" id="sbp2" data-role="none" placeholder="Transaction PIN" required></br></br>
						 <input type="submit" name="" class="ds4" value="Sell Shares" data-role="none"></br></br>
					 </form></br>
					</div>
			 </div>
		 </div>

   </div>
  </body>
</html>
