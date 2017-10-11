$(document).ready(function(){
	var socket = io(ter);
	 $.get('henry.php',{req:'getid'},function(resp,status){
         console.log(resp);
          socket.emit('getexplorecompsreq',resp);
        });
      socket.on('getexploreres',function(datad){
      console.log(datad); 
        $("#header").html("");
        $("#feature").html("");
        var jeremy = datad.data;
         for(var j=0; j<jeremy.length; j++){ 
         	 var compidd = jeremy[j].compid;
            var dif = jeremy[j].period.stamp-new Date().getTime()/1000;

           var seconds = dif % 60; dif /= 60; var minutes = dif % 60; dif /= 60; var hours = dif % 24; dif /= 24; var days = dif;

           var expdte = parseFloat(days).toFixed(0)+" days";  
        var card =' <div class="middle-section-column w-col w-col-3" data-ix="featured-card"><div class="div-block"><img height="200" src="images/proj/'+jeremy[j].banner+'"><h4 class="heading" id='+compidd+'>'+jeremy[j].compname+'</h4><p class="paragraph">'+jeremy[j].description+'</p><div class="div-block-14"><div class="raised-cash"><strong>Raised:&nbsp;</strong></div><div class="text-block-42"><strong>Shs&nbsp'+jeremy[j].raised+'</strong></div></div><div class="div-block-28"></div><div class="div-block-66"><div class="text-block-40">27.3%</div><div class="text-block-41">'+expdte+' days remaining</div></div></div></div>';
 	  
 		$('#feature').append(card);

 	 	$('#header').text(jeremy[j].category);

        }
       }); 

       $('#feature').on('click','.heading', function()
      {
      	//alert("thererere");
        var stid = $(this).attr("id");
        $.get('henry.php',{req:'setid',uid:stid},function(resp,status){
         console.log(resp);
        });
        window.open("companyprofile.html","_self");
      });
});