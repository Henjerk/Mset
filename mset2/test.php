<?php  ?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>test</title>
    <script type="text/JavaScript" src="jquery-2.1.1.js"></script>
    <link rel="stylesheet" type="text/css" media="all" href="mset.css">
    <style media="screen">
     .compxdiv{
       width:300px;
       height:500px;
       margin-left: 50px;
       background-color:#fdfdfd;
       display: inline-block;
       vertical-align: top;
       -webkit-box-shadow:0 1px 1px rgba(0, 0, 0, 0.5);-moz-box-shadow:0 1px 1px rgba(0, 0, 0, 0.5);box-shadow:0 1px 1px rgba(0, 0, 0, 0.5);
       -webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;
     }
     .compxcat{
       color: #a8a8a8;
       font-size: 12px;
       text-transform: uppercase;
       text-align: left;
       padding: 10px;
       cursor: pointer;
     }
     .compxname{
       color: #545454;
       font-size: 15px;
       text-align: left;
       padding-left: 10px;
       padding-right: 10px;
       padding-bottom: 5px;
       font-weight:bold;
       cursor: pointer;
     }
     .compxname:hover{
       text-decoration: underline;
     }
     .compxpitch{
       color: #545454;
       font-size: 14px;
       text-align: left;
       padding-left: 10px;
       padding-right: 10px;
       padding-bottom: 10px;
       height:155px;
     }
     .compxamount{
       color: #545454;
       text-align: left;
       padding-left: 10px;
       padding-bottom:5px;
     }
     .compxscale{
       padding-left: 10px;
       padding-right: 10px;
       padding-bottom: 5px;
     }
     .pscale{
       height:7px;
       background-color: #CD7222;
     }
     .compxprog{

     }
     .progx{
       width: 50px;
       display: inline-block;
       vertical-align: top;
       padding-left: 10px;
       padding-right: 10px;
       color: #a8a8a8;
       font-size: 12px;
     }
     .progy{
       width: 100px;
       display: inline-block;
       vertical-align: top;
       padding-left: 10px;
       padding-right: 10px;
       color: #a8a8a8;
       font-size: 12px;
       text-align: right;
       margin-left:100px;
     }
    </style>
    <script type="text/javascript">
      $(document).ready(function(){
        $("#bp1").on('keyup',function(){
          var shrpx = "2000";
          var tot = $('#bp1').val()*shrpx;
          $('#lena').html("Total Price: UgShs "+tot+" @ "+shrpx);
        });
      });
    </script>
  </head>
  <body class="wrappery">
    <div align="left">

      <!--<input type='file' id="imgInp" name="imgInp" data-role="none" class="imgInp"/>
      <label for="imgInp" data-role="none">
       <div class="imgbutt"> </div>
     </label>-->

     </br></br>

     <div class="compstorydiv">
      <div class="compstoryplot1" align="left">
        <div class="compstoryplot11A">
          <div class="compstoryplot11in">J</div>
        </div>
        <div class="compstoryplot11B">
          <div class="compstoryplot112">Juiced Boards: Authentic Electric Longboards</div>
          <div class="compstoryplot113">Saturday, June 24, 2017 8:46 AM</div>
        </div>
      </div>
      <div class="compstoryplot2" align="left">
        Don't See your Country or Network Below? We're actively rolling out to new countries and networks. Drop us a note!
      </div>
      <div class="compstoryplot3" align="left">
        <img src="images/proj/nKtVdp8d553mb4ty40eRRams39.png" alt="story pic" class="storypic">
      </div>
      <div class="compstoryplot5" align="left">
         25 likes, 5 comments, 3 shared.
      </div>
      <div style="width:94%; background-color:#eee; padding:1px; margin-top:5px;"></div>
      <div class="compstoryplot4" align="left">
        <div class='storypref' align='left'>
          <img src='imgz/shr.png' class='storyprefimg'><div class='storypreftxt'>Share</div>
          <img src='imgz/heart.png' class='storyprefimg'><div class='storypreftxt'>Like</div>
          <img src='imgz/edit.png' class='storyprefimg'><div class='storypreftxt'>Comment</div>
          <img src='imgz/com.png' class='storyprefimg'><div class='storypreftxt'>View comments</div>
          <img src='imgz/faq.png' class='storyprefimg'><div class='storypreftxt'>Report</div>
        </div>
      </div>
     </div>

     <div class="compstorydiv">
      <div class="compstoryplot1" align="left">
        <div class="compstoryplot11A">
          <div class="compstoryplot11in">J</div>
        </div>
        <div class="compstoryplot11B">
          <div class="compstoryplot112">Juiced Boards: Authentic Electric Longboards</div>
          <div class="compstoryplot113">Saturday, June 24, 2017 8:46 AM</div>
        </div>
      </div>
      <div class="compstoryplot2" align="left">
        Don't See your Country or Network Below? We're actively rolling out to new countries and networks. Drop us a note!
      </div>
      <div class="compstoryplot5" align="left">
         25 likes, 5 comments, 3 shared.
      </div>
      <div style="width:94%; background-color:#eee; padding:1px; margin-top:5px;"></div>
      <div class="compstoryplot4" align="left">
        <div class='storypref' align='left'>
          <img src='imgz/shr.png' class='storyprefimg'><div class='storypreftxt'>Share</div>
          <img src='imgz/heart.png' class='storyprefimg'><div class='storypreftxt'>Like</div>
          <img src='imgz/edit.png' class='storyprefimg'><div class='storypreftxt'>Comment</div>
          <img src='imgz/com.png' class='storyprefimg'><div class='storypreftxt'>View comments</div>
          <img src='imgz/faq.png' class='storyprefimg'><div class='storypreftxt'>Report</div>
        </div>
      </div>
     </div>

     <!--<div class="nustorydiv">
       <form class="" id="#nustoryform">
         <div class="nustotydivin">
           <div class="nustypopuphed"> Mosquito Zapper Lantern: A Mosquito’s Nightmare </div></br>
           <div class="ftxt5">Product story:</div>
           <div class=""><textarea id="" class="stry" data-role="none" placeholder="Write your product story .... "></textarea></div></br>
           <div class="ftxt5">Story image:</div>
           <div class="">
             <input type='file' id="imgInp" name="imgInp" data-role="none" class="imgInp"/>
             <label for="imgInp" data-role="none">
              <div class="stryimgbutt" id="stimg1" imgdata=""></div>
             </label>
           </div></br>
           <input type="submit" name="" class="ds5" value="Add Story" data-role="none"></br>
         </div></br>
       </form>
     </div>-->

     <!--<div class="buypopup">
       <div class="buypopuphed">EGUDGUEGUECU UEHCUE EGCYEC BUHWWUW </div>
       <form class="">
         <div id="lena"></div>
         <input type="number" class="di" id="bp1" data-role="none" placeholder="Shares" required></br>
         <input type="password" class="di" id="bp2" data-role="none" placeholder="Transaction PIN" required></br>
         <input type="submit" name="" class="ds4" value="Buy Shares" data-role="none"></br></br>
       </form></br>
     </div>-->

      <!--<div class="compxdiv">
        <img src="images/proj/fuze.jpg" alt="logo" style="width:300px; height:200px;">
        <div class="compxcat">tech / software</div>
        <div class="compxname">Fuze Card: Your Whole Wallet in One Card</div>
        <div class="compxpitch">Secure, Slim, Convenient. Electronic Card with EMV Chip. Holds Up to 30 Credit, Debit, or Gift Cards</div>
        <div class="compxamount"><b>Target:</b> Shs. 1,300,000</div>
        <div class="compxscale" align="left"><div class="pscale" style="width:70%;"></div></div>
        <div class="compxprog" align="left">
          <div class="progx">70%</div>
          <div class="progy">45 days left</div>
        </div>
      </div>

      <div class="compxdiv">
        <img src="images/proj/juicex.png" alt="logo" style="width:300px; height:200px;">
        <div class="compxcat">transportation</div>
        <div class="compxname">Juiced Boards: Authentic Electric Longboards</div>
        <div class="compxpitch">Electric skateboards with an authentic longboard feel.</div>
        <div class="compxamount"><b>Target:</b> Shs. 4,500,000</div>
        <div class="compxscale" align="left"><div class="pscale" style="width:52%;"></div></div>
        <div class="compxprog" align="left">
          <div class="progx">52%</div>
          <div class="progy">3 months left</div>
        </div>
      </div>

      <div class="compxdiv">
        <img src="images/proj/kp.gif" alt="logo" style="width:300px; height:200px;">
        <div class="compxcat">health / medical</div>
        <div class="compxname">Mosquito Zapper Lantern: A Mosquito’s Nightmare</div>
        <div class="compxpitch">he solution to protect you from mosquito bites for good. It's compact,
          durable and powerful. 2000mAh battery, one charge can last up to 20h. UV light of 360nm to 400nm
          is the fatal temptation for mosquitoes. Ready to experience the nature in a mosquito-free environment
          with this zapper lantern?</div>
        <div class="compxamount"><b>Target:</b> Shs. 20,000,000</div>
        <div class="compxscale" align="left"><div class="pscale" style="width:30%;"></div></div>
        <div class="compxprog" align="left">
          <div class="progx">30%</div>
          <div class="progy">5months days left</div>
        </div>
      </div>-->

    </div>
  </body>
</html>
