<?php  ?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset='utf-8'>
    <title>test</title>
    <script type='text/JavaScript' src='jquery-2.1.1.js'></script>
    <link rel='stylesheet' type='text/css' media='all' href='mset.css'>
    <script type='text/javascript'>
      $(document).ready(function(){
        $('#sub').on('click', function(){
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
          }
          console.log(favset);
        });
      });
    </script>
  </head>
  <body class='wrappery'>
    <div align='left'>

      </br></br>

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
        <input type="button" id="sub" value="submit">
      </div></br>

      <!--<div class='fllwdiv'>
        <div class='fllwicn'>
          <div class='fllwltt'>G</div>
        </div>
        <div class='fllwnme'>
          <div class='fllwcmpn'>SEMBATYA JOSEPH</div>
          <div class='fllwcat'>Status : Activated</div>
        </div></br>
      </div>-->

      <!--<div class='shrz'>
       <img src='imgz/shrz.png' class='shrzimg'>
       <div class='shrztxt' id=''>shares : <b>32</b></div></br>
       <img src='imgz/shrz.png' class='shrzimg'>
       <div class='shrztxt' id=''>Amount : <b>UGX.250000</b></div></br>
       <img src='imgz/shrz.png' class='shrzimg'>
       <div class='shrztxt' id=''>stake : <b>ugx.15%</b></div></br><div class='sellbt' align='center'>Sell Shares</div>
     </div>-->

      <!--<input type='file' id='imgInp' name='imgInp' data-role='none' class='imgInp'/>
      <label for='imgInp' data-role='none'>
       <div class='imgbutt'> </div>
     </label>-->

     <!--</br></br>

     <div class='compstorydiv'>
      <div class='compstoryplot1' align='left'>
        <div class='compstoryplot11A'>
          <div class='compstoryplot11in'>J</div>
        </div>
        <div class='compstoryplot11B'>
          <div class='compstoryplot112'>Juiced Boards: Authentic Electric Longboards</div>
          <div class='compstoryplot113'>Saturday, June 24, 2017 8:46 AM</div>
        </div>
      </div>
      <div class='compstoryplot2' align='left'>
        Don't See your Country or Network Below? We're actively rolling out to new countries and networks. Drop us a note!
      </div>
      <div class='compstoryplot3' align='left'>
        <img src='images/proj/nKtVdp8d553mb4ty40eRRams39.png' alt='story pic' class='storypic'>
      </div>
      <div class='compstoryplot5' align='left'>
         25 likes, 5 comments, 3 shared.
      </div>
      <div style='width:94%; background-color:#eee; padding:1px; margin-top:5px;'></div>
      <div class='compstoryplot4' align='left'>
        <div class='storypref' align='left'>
          <img src='imgz/shr.png' class='storyprefimg'><div class='storypreftxt'>Share</div>
          <img src='imgz/heart.png' class='storyprefimg'><div class='storypreftxt'>Like</div>
          <img src='imgz/edit.png' class='storyprefimg'><div class='storypreftxt'>Comment</div>
          <img src='imgz/com.png' class='storyprefimg'><div class='storypreftxt'>View comments</div>
          <img src='imgz/faq.png' class='storyprefimg'><div class='storypreftxt'>Report</div>
        </div>
      </div>
     </div>

     <div class='compstorydiv'>
      <div class='compstoryplot1' align='left'>
        <div class='compstoryplot11A'>
          <div class='compstoryplot11in'>J</div>
        </div>
        <div class='compstoryplot11B'>
          <div class='compstoryplot112'>Juiced Boards: Authentic Electric Longboards</div>
          <div class='compstoryplot113'>Saturday, June 24, 2017 8:46 AM</div>
        </div>
      </div>
      <div class='compstoryplot2' align='left'>
        Don't See your Country or Network Below? We're actively rolling out to new countries and networks. Drop us a note!
      </div>
      <div class='compstoryplot5' align='left'>
         25 likes, 5 comments, 3 shared.
      </div>
      <div style='width:94%; background-color:#eee; padding:1px; margin-top:5px;'></div>
      <div class='compstoryplot4' align='left'>
        <div class='storypref' align='left'>
          <img src='imgz/shr.png' class='storyprefimg'><div class='storypreftxt'>Share</div>
          <img src='imgz/heart.png' class='storyprefimg'><div class='storypreftxt'>Like</div>
          <img src='imgz/edit.png' class='storyprefimg'><div class='storypreftxt'>Comment</div>
          <img src='imgz/com.png' class='storyprefimg'><div class='storypreftxt'>View comments</div>
          <img src='imgz/faq.png' class='storyprefimg'><div class='storypreftxt'>Report</div>
        </div>
      </div>
    </div>-->

     <!--<div class='nustorydiv'>
       <form class='' id='#nustoryform'>
         <div class='nustotydivin'>
           <div class='nustypopuphed'> Mosquito Zapper Lantern: A Mosquito’s Nightmare </div></br>
           <div class='ftxt5'>Product story:</div>
           <div class=''><textarea id='' class='stry' data-role='none' placeholder='Write your product story .... '></textarea></div></br>
           <div class='ftxt5'>Story image:</div>
           <div class=''>
             <input type='file' id='imgInp' name='imgInp' data-role='none' class='imgInp'/>
             <label for='imgInp' data-role='none'>
              <div class='stryimgbutt' id='stimg1' imgdata=''></div>
             </label>
           </div></br>
           <input type='submit' name='' class='ds5' value='Add Story' data-role='none'></br>
         </div></br>
       </form>
     </div>-->

     <!--<div class='buypopup'>
       <div class='buypopuphed'>EGUDGUEGUECU UEHCUE EGCYEC BUHWWUW </div>
       <form class=''>
         <div id='lena'></div>
         <input type='number' class='di' id='bp1' data-role='none' placeholder='Shares' required></br>
         <input type='password' class='di' id='bp2' data-role='none' placeholder='Transaction PIN' required></br>
         <input type='submit' name='' class='ds4' value='Buy Shares' data-role='none'></br></br>
       </form></br>
     </div>-->

      <!--<div class='compxdiv'>
        <img src='images/proj/fuze.jpg' alt='logo' style='width:300px; height:200px;'>
        <div class='compxcat'>tech / software</div>
        <div class='compxname'>Fuze Card: Your Whole Wallet in One Card</div>
        <div class='compxpitch'>Secure, Slim, Convenient. Electronic Card with EMV Chip. Holds Up to 30 Credit, Debit, or Gift Cards</div>
        <div class='compxamount'><b>Target:</b> Shs. 1,300,000</div>
        <div class='compxscale' align='left'><div class='pscale' style='width:70%;'></div></div>
        <div class='compxprog' align='left'>
          <div class='progx'>70%</div>
          <div class='progy'>45 days left</div>
        </div>
      </div>

      <div class='compxdiv'>
        <img src='images/proj/juicex.png' alt='logo' style='width:300px; height:200px;'>
        <div class='compxcat'>transportation</div>
        <div class='compxname'>Juiced Boards: Authentic Electric Longboards</div>
        <div class='compxpitch'>Electric skateboards with an authentic longboard feel.</div>
        <div class='compxamount'><b>Target:</b> Shs. 4,500,000</div>
        <div class='compxscale' align='left'><div class='pscale' style='width:52%;'></div></div>
        <div class='compxprog' align='left'>
          <div class='progx'>52%</div>
          <div class='progy'>3 months left</div>
        </div>
      </div>

      <div class='compxdiv'>
        <img src='images/proj/kp.gif' alt='logo' style='width:300px; height:200px;'>
        <div class='compxcat'>health / medical</div>
        <div class='compxname'>Mosquito Zapper Lantern: A Mosquito’s Nightmare</div>
        <div class='compxpitch'>he solution to protect you from mosquito bites for good. It's compact,
          durable and powerful. 2000mAh battery, one charge can last up to 20h. UV light of 360nm to 400nm
          is the fatal temptation for mosquitoes. Ready to experience the nature in a mosquito-free environment
          with this zapper lantern?</div>
        <div class='compxamount'><b>Target:</b> Shs. 20,000,000</div>
        <div class='compxscale' align='left'><div class='pscale' style='width:30%;'></div></div>
        <div class='compxprog' align='left'>
          <div class='progx'>30%</div>
          <div class='progy'>5months days left</div>
        </div>
      </div>-->

    </div>
  </body>
</html>
