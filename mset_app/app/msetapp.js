$(document).ready(function(){

  var socket = io(ter);
  var xu = {};
  var xcomp;
  var xcmpacc;
  var shrset;
  var xcmpgn = {};
  var sellset;
  var qikset;

  $(".buypopup").hide();
  $(".sellpopup").hide();
  $(".nustorydiv").hide();
  $(".sellpopup2").hide();
  $(".depopopup").hide();

  $.getJSON('../sess.php', {req:"getid"},function(data){
    $.each(data, function(key, value){
      $(".alexu").html(value.userid.name);
      //xu = {id:value.userid.id,name:value.userid.name};
      xu.id = value.userid.id;
      xu.name = value.userid.name;
      $("#kju").html(value.userid.name);
    });
    socket.emit('getmyfollowsetreq',xu);
    socket.emit('getinvaccreq2',xu);
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
    alert(datad.data.message);
   });

   function readURL(input,tagx) {
      if (input.files && input.files[0]) {
          var reader = new FileReader();
              var filename = input.files[0].name;
              var fx = filename.split(".");
              var fxy = fx.length-1;
              var fxe = fx[fxy].toLowerCase();

              if(fxe=="jpg"||fxe=="jpeg"||fxe=="png"||fxe=="gif"||fxe=="webp"){
                reader.onload = function (e) {
                 //$('#blah').attr('src', e.target.result);
                 $("#"+tagx).html(filename);
                 getDataUri(e.target.result, function(dataUri) {
                   $('#'+tagx).attr('imgdata',dataUri);
                 });
                }
              }else{
                alert("invalid file type");
              }
          reader.readAsDataURL(input.files[0]);
       }
    }

    $("#imgInpx").change(function(){
        readURL(this,"e3");
    });

    $("#imgInpy").change(function(){
        readURL(this,"str2");
    });

    $("#imgInp").change(function(){
        readURL(this,"e9");
    });

    function getDataUri(url, callback) {
        var image = new Image();
        image.onload = function () {
            var canvas = document.createElement('canvas');
            canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
            canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size
            canvas.getContext('2d').drawImage(this, 0, 0);
            // Get raw image data
            callback(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''));
            // ... or get as Data URI
            //callback(canvas.toDataURL('image/png'));
        };
        image.src = url;
    }

   $('a').on('click', function(){
      var lnk = $(this).attr('href');
      if(lnk=="#startups"){
        socket.emit('getallcompreq');
      }else if(lnk=="#mycampaigns"){
        var xcmpset = {};
        xcmpset.id = xu.id;
        socket.emit('mycompreq',xcmpset);
      }else if(lnk=="#notifications"){
        var xcmpset = {};
        xcmpset.id = xu.id;
        socket.emit('getchatheadsreq',xcmpset);
      }else if(lnk=="#shares"){
        var xcmpset = {};
        xcmpset.uid = xu.id;
        socket.emit('getinvaccreq',xcmpset);
      }else if(lnk=="#logout"){
        $.getJSON('../sess.php', {req:"logout"},function(data){
          $.each(data, function(key, value){
            if(value.codex==40){
              window.location = "../micro";
            }else{
              alert("Try logging in again");
            }
          });
        });
      }
    });

    socket.on('getallcompres',function(datad){
     var compset = datad.data;
     $('#romero').html("");
     for(var j=0; j<compset.length; j++){
       var dif = compset[j].period.stamp-new Date().getTime()/1000;
       var seconds = dif % 60; dif /= 60; var minutes = dif % 60; dif /= 60; var hours = dif % 24; dif /= 24; var days = dif;
       var expdte = parseFloat(days).toFixed(2)+" days";
       var scalex = "SC"+compset[j].compid;
       var perx = "PER"+compset[j].compid;
       var compx = "TIMI"+compset[j].compid;
       var tgt = numberWithCommas(compset[j].target);
       var jerry = "<div class='compxdiv'><img src='../images/proj/"+compset[j].banner+"' alt='logo' style='width:300px; height:200px; -webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;'><div class='compxcat'>"+compset[j].category+"</div><div class='compxname' id='"+compx+"'>"+compset[j].compname+"</div><div class='compxpitch'>"+compset[j].pitchtext+"</div><div class='compxamount'><b>Target:</b> Shs. "+tgt+"</div><div class='compxscale3'><div class='compxscale' align='left'><div class='pscale' id='"+scalex+"'></div></div><div class='compxprog' align='left'><div class='progx' id='"+perx+"' amt='"+compset[j].target+"'></div><div class='progy'>"+expdte+" left</div></div></div></div>";
       $('#romero').append(jerry);
       var xcmpset = {};
       xcmpset.cid = compset[j].compid;
       socket.emit('getcompaccreq',xcmpset);
     }

    });

    function numberWithCommas(x){
      return x.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
    }

    socket.on('getcompaccres',function(datad){
      var pack = datad.data;
      var scalexy = "SC"+pack.compid;
      var perxy = "PER"+pack.compid;
      var targetxy = $('#'+perxy).attr("amt");
      var percent = (pack.credit / targetxy)*100;
      $('#'+perxy).html(percent+"%");
      if(percent<1){
        percentx = 1;
      }else{
        percentx = percent+1;
      }
      var perv = percentx+"%";
      $('#'+scalexy).css("width",perv);
    });

    $('#sande').on('click','.backbt', function()
     {
       $('#bp1').val("");
       $('#bp2').val("");
       $('#lena').html("");
       socket.emit('cresessreq',xu.id);
     });

     $("#bp1").on('keyup',function(){
       var shrpx = xcmpacc.shareprice;
       var tot = $('#bp1').val()*shrpx;
       $('#lena').html("Total Price: UgShs "+numberWithCommas(tot)+" @ "+shrpx);
     });

     $('#romero').on('click','.compxname', function()
      {
        var stid = $(this).attr("id");
        window.open("#startupx","_self");
        var xcmpset = {};
        xcmpset.cid = stid.substring(4);
        socket.emit('getcompreq',xcmpset);
      });

      socket.on('getcompres',function(datad){
        var jeremy = datad.data;
        var tgtx = numberWithCommas(jeremy.target);
        var dif = jeremy.period.stamp-new Date().getTime()/1000;
        var seconds = dif % 60; dif /= 60; var minutes = dif % 60; dif /= 60; var hours = dif % 24; dif /= 24; var days = dif;
        var expdte = parseFloat(days).toFixed(2)+" days";
        var scalex = "SCX"+jeremy.compid;
        var perx = "PERX"+jeremy.compid;
        var compx = "SOC"+jeremy.compid;
        xcomp = jeremy;
        var kabazi = "<div class='storydiva' id=''> <img src='../images/proj/"+jeremy.banner+"' style='height:100%; width:100%;'> </div> <div class='storydivb' id=''> <div class='compxcat2'>"+jeremy.category+"</div> <div class='compxname2'>"+jeremy.compname+"</div> <div class='compxpitch2'>"+jeremy.pitchtext+"</div> <div class='compxamount2'><b>Target:</b> Shs. "+tgtx+"</div> <div class='compxscale3'><div class='compxscale2' align='left'><div class='pscale2' id='"+scalex+"'></div></div></div> <div class='compxprog2' align='left'><div class='progx2' id='"+perx+"' amt='"+jeremy.target+"'></div><div class='progy2'>"+expdte+" left</div></div> <div class='backdiv' align='left'> <input type='button' value='INVEST' class='backbt' data-role='none'> <div class='backtxt'>Backed by <b>2</b>, Followed by <b>20</b></div> </div> <div class='backpref' align='left'> <img src='../imgz/mess.png' class='backprefimg'> <div class='backpreftxt'>Send-message</div> <img src='../imgz/heart.png' class='backprefimg'> <div class='backpreftxt' id='favtag'>Follow / Favourite</div> <img src='../imgz/shr.png' class='backprefimg'> <div class='backpreftxt'>Share</div> <img src='../imgz/faq.png' class='backprefimg'> <div class='backpreftxt'>FAQs</div> </div> </div>";
        $('#sande').html(kabazi);
        var xcmpset = {};
        xcmpset.cid = jeremy.compid;
        var favset = {};
        favset.cmpid = jeremy.compid;
        favset.uid = xu.id;
        favset.unme = xu.name;
        socket.emit('chkiffavreq',favset);
        socket.emit('getcompxaccreq',xcmpset);
        socket.emit('getcompstoriesreq',xcmpset);
      });

      socket.on('getcompxaccres',function(datad){
        var pack = datad.data;
        xcmpacc = pack;
        var scalexy = "SCX"+pack.compid;
        var perxy = "PERX"+pack.compid;
        var targetxy = $('#'+perxy).attr("amt");
        var percent = (pack.credit / targetxy)*100;
        $('#'+perxy).html(percent+"%");
        if(percent<1){
          percentx = 1;
        }else{
          percentx = percent+1;
        }
        var perv = percentx+"%";
        $('#'+scalexy).css("width",perv);
      });

      $('#sande').on('click','.backpreftxt', function()
       {
         var sembatya = $(this).html();
         if(sembatya=="Follow / Favourite"){
           var favset = {};
           favset.cmpid = xcomp.compid;
           favset.uid = xu.id;
           favset.unme = xu.name;
           socket.emit('addfavreq',favset);
         }else if(sembatya=="Un-follow / Un-favourite"){
           var favset = {};
           favset.cmpid = xcomp.compid;
           favset.uid = xu.id;
           favset.unme = xu.name;
           socket.emit('rmefavreq',favset);
         }
       });

       $('#buyform').on('submit', function(){
          var sx = $('#bp1').val();
          var px = $('#bp2').val();
          var xcmpset = {};
          xcmpset.ci = xcmpacc.compid;
          xcmpset.nm = xcomp.compname;
          xcmpset.sx = sx;
          xcmpset.px = px;
          xcmpset.ui = xu;
          xcmpset.tx = sx*xcmpacc.shareprice;
          socket.emit('buyshrsreq',xcmpset);
          return false;
        });

        socket.on('buyshrsres',function(datad){
          alert(datad.data.message);
        });

        socket.on('cresessres',function(datad){
          //console.log(datad);
          $(".buypopuphed").html(xcomp.compname.substring(0, 50));
          $(".buypopup").show();
          $('.buypopup').modalBox('open');
        });

        socket.on('mycompres',function(datad){
         var compset = datad.data;
         $('#faith').html("");
         for(var j=0; j<compset.length; j++){
           var dif = compset[j].period.stamp-new Date().getTime()/1000;
           var seconds = dif % 60; dif /= 60; var minutes = dif % 60; dif /= 60; var hours = dif % 24; dif /= 24; var days = dif;
           var expdte = parseFloat(days).toFixed(2)+" days";
           var scalex = "SC2"+compset[j].compid;
           var perx = "PER2"+compset[j].compid;
           var compx = "TIMI2"+compset[j].compid;
           var tgt = numberWithCommas(compset[j].target);
           var jerry = "<div class='compxdiv3'><img src='../images/proj/"+compset[j].banner+"' alt='logo' style='width:300px; height:200px; -webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;'><div class='compxcat'>"+compset[j].category+"</div><div class='compxname' id='"+compx+"'>"+compset[j].compname+"</div><div class='compxpitch'>"+compset[j].pitchtext+"</div><div class='compxamount'><b>Target:</b> Shs. "+tgt+"</div><div class='compxscale3'><div class='compxscale' align='left'><div class='pscale' id='"+scalex+"'></div></div><div class='compxprog' align='left'><div class='progx' id='"+perx+"' amt='"+compset[j].target+"'></div><div class='progy'>"+expdte+" left</div></div></div><div class='cmppref' align='left'><img src='../imgz/edit.png' class='cmpprefimg'> <div class='cmppreftxt' stup='"+compx+"' nme='"+compset[j].compname+"'>New-story</div></div></div>";
           $('#faith').append(jerry);
           var xcmpset = {};
           xcmpset.cid = compset[j].compid;
           socket.emit('getcompaccreq2',xcmpset);
         }
       });

       socket.on('getcompaccres2',function(datad){
         var pack = datad.data;
         var scalexy = "SC2"+pack.compid;
         var perxy = "PER2"+pack.compid;
         var targetxy = $('#'+perxy).attr("amt");
         var percent = (pack.credit / targetxy)*100;
         $('#'+perxy).html(percent+"%");
         if(percent<1){
           percentx = 1;
         }else{
           percentx = percent+1;
         }
         var perv = percentx+"%";
         $('#'+scalexy).css("width",perv);
       });

       $('#faith').on('click','.cmppreftxt', function()
        {
          var tumi = $(this).html();
          xcmpgn.stup = $(this).attr("stup").substring(5);
          xcmpgn.nme = $(this).attr("nme");
          if(tumi=="New-story"){
            $('#str1').val("");
            $('#str2').attr('imgdata','');
            $('#str2').html("");
            $(".nustypopuphed").html(xcmpgn.nme);
            $(".nustorydiv").show();
            $('.nustorydiv').modalBox('open');
          }else{
            alert(tumi+" == "+xcmpgn.nme);
          }
        });

        $('#addstry').on('click', function()
         {
           var x1 = $('#str1').val();
           var x2 = $('#str2').attr('imgdata');
           var strset = {};
           strset.story = x1;
           strset.pic = x2;
           strset.cmp = xcmpgn.stup;
           socket.emit('newstroyreq',strset);
           $(".nustypopuphed").html("");
           $(".nustorydiv").hide();
           $('.nustorydiv').modalBox('close');
         });

       socket.on('newstroyres',function(datad){
         console.log(datad);
       });

       socket.on('getcompstoriesres',function(datad){
         var compstories = datad.data;
         $('#sande_stories').html("");

         for(var p=0; p<compstories.length; p++){
            var letter = xcomp.compname.substring(0, 1).toUpperCase();
            var timex = moment.unix(compstories[p].crtstamp).format("LLLL");
            if(xcomp.compname.length>55){
              var cmpnme = xcomp.compname.substring(0, 55)+"...";
            }else{
              var cmpnme = xcomp.compname;
            }
            if(compstories[p].image==""||compstories[p].image==" "){
              var story1 = "<div class='compstorydiv' align='center'><div class='compstoryplot1' align='left'><div class='compstoryplot11A'><div class='compstoryplot11in'>"+letter+"</div></div><div class='compstoryplot11B'><div class='compstoryplot112'>"+cmpnme+"</div><div class='compstoryplot113'>"+timex+"</div></div></div><div class='compstoryplot2' align='left'>"+compstories[p].text+"</div><div style='width:94%; background-color:#eee; padding:1px; margin-top:5px;'></div><div class='compstoryplot4' align='left'></div></div>";
              $('#sande_stories').append(story1);
            }else{
              var story1 = "<div class='compstorydiv' align='center'><div class='compstoryplot1' align='left'><div class='compstoryplot11A'><div class='compstoryplot11in'>"+letter+"</div></div><div class='compstoryplot11B'><div class='compstoryplot112'>"+cmpnme+"</div><div class='compstoryplot113'>"+timex+"</div></div></div><div class='compstoryplot2' align='left'>"+compstories[p].text+"</div><div class='compstoryplot3' align='left'><img src='../images/proj/"+compstories[p].image+"' alt='story pic' class='storypic'></div><div style='width:94%; background-color:#eee; padding:1px; margin-top:5px;'></div><div class='compstoryplot4' align='left'></div></div>";
              $('#sande_stories').append(story1);
            }
         }
         $('.compstoryplot2').shorten({
           showChars: 240,
         });
       });

       socket.on('getchatheadsres',function(datad){
         $('.notifydiv1').html("");
         var compset = datad.data;
         for(var j=0; j<compset.length; j++){
           var letter = compset[j].name.substring(0,1).toUpperCase();
           if(compset[j].name.length>25){
             var nme = compset[j].name.substring(0,25)+"...";
           }else{
             var nme = compset[j].name;
           }
           var messtag = "AGIE"+compset[j].id;
           var philo = "<div class='messcard'><div class='messcardicn' align='center'><div class='icntxt'>"+letter+"</div></div><div class='messcardnme' id='"+messtag+"'>"+nme+"</div><div class='messcardsgn'></div></div>";
           $('.notifydiv1').append(philo);
         }
       });

       $('.notifydiv1').on('click','.messcardnme', function()
        {
          var tag = $(this).attr('id').substring(4);
          var xcmpset = {};
          xcmpset.ma = tag;
          xcmpset.mb = xu.id;
          socket.emit('getchatmessreq',xcmpset);
        });

        socket.on('getchatmessres',function(datad){
          $('.notifydiv2').html("");
          var compset = datad.data;
          for(var j=0; j<compset.length; j++){
            var timez = moment.unix(compset[j].crtstamp).format("llll");
            if(compset[j].src.name.length>20){
              var nme = compset[j].src.name.substring(0,20)+"...";
            }else{
              var nme = compset[j].src.name;
            }
            var dert = compset[j].text.substring(0,3);
            if(dert==">>>"){
              var dertset = compset[j].text.split(">>>");
              var sellerset = dertset[1].split("---");
              var qbuy = "<div class='qbuybut' cid='"+sellerset[0]+"' cmp='"+sellerset[1]+"' shr='"+sellerset[4]+"' unm='"+sellerset[3]+"' uid='"+sellerset[2]+"'>Buy Now</div>";
              var henry = "<div class='bubblex'><div class='bubblexhed1'>"+nme+"</div><div class='bubblexhed2'>"+timez+"</div></br>"+dertset[2]+"</br>"+qbuy+"</br></div>";
              $('.notifydiv2').append(henry);
            }else{
              var henry = "<div class='bubblex'><div class='bubblexhed1'>"+nme+"</div><div class='bubblexhed2'>"+timez+"</div></br>"+compset[j].text+"</div>";
              $('.notifydiv2').append(henry);
            }
          }
        });

        socket.on('chkiffavres',function(datad){
           if(datad.data.code=="20"){
             $('#favtag').html("Un-follow / Un-favourite");
           }
        });

        socket.on('addfavres',function(datad){
           if(datad.data.code=="20"){
             alert("you already Favourited this company");
           }else if(datad.data.code=="10"){
             alert("This Company has been added to your Favourites");
             $('#favtag').html("Un-follow / Un-favourite");
           }
        });

        socket.on('rmefavres',function(datad){
           if(datad.data.code=="1"){
             alert("This company company has been removed from your Favourites");
             $('#favtag').html("Follow / Favourite");
           }
        });

        socket.on('getinvaccres',function(datad){
          shr = [];
          var resp = datad.data.data.shares;
          for(var k=0; k<resp.length; k++){
            shr.push(resp[k]);
            var xcmpset = {};
            xcmpset.cid = resp[k].id;
            socket.emit('getcompreq3',xcmpset);
            $('#jeff').html("");
          }
        });

        socket.on('getcompres3',function(datad){
          var y = _.where(shr, {'id':datad.data.compid});
          var compset = datad.data;
          var dif = compset.period.stamp-new Date().getTime()/1000;
          var seconds = dif % 60; dif /= 60; var minutes = dif % 60; dif /= 60; var hours = dif % 24; dif /= 24; var days = dif;
          var expdte = parseFloat(days).toFixed(2)+" days";
          var scalex = "SCT"+compset.compid;
          var perx = "PERT"+compset.compid;
          var compx = "TIMIT"+compset.compid;
          var amttag = "AMTG"+compset.compid;
          var pertag = "STK"+compset.compid;
          var tgt = numberWithCommas(compset.target);
          var trgper = compset.sharepercent+"--"+compset.target;
          var jerry = "<div class='compxdiv5'><img src='../images/proj/"+compset.banner+"' alt='logo' style='width:300px; height:200px; -webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;'><div class='compxcat'>"+compset.category+"</div><div class='compxname' id='"+compx+"'>"+compset.compname+"</div><div class='shrz' align='left'><img src='../imgz/shrz.png' class='shrzimg'><div class='shrztxt' id=''>Shares : <b>"+y[0].shr+"</b></div></br><img src='../imgz/amt.png' class='shrzimg'><div class='shrztxt' id='"+amttag+"' shramt='"+y[0].shr+"'>Amount : <b>UGX.250000</b></div></br><img src='../imgz/perc.png' class='shrzimg'><div class='shrztxt' id='"+pertag+"' perc='"+trgper+"'>stake : <b>15%</b></div></br><div class='sellbt' nme='"+compset.compname+"' cpid='"+compset.compid+"' align='center'>Sell Shares</div></div><div class='compxamount'><b>Target:</b> Shs. "+tgt+"</div><div class='compxscale3'><div class='compxscale' align='left'><div class='pscale' id='"+scalex+"'></div></div><div class='compxprog' align='left'><div class='progx' id='"+perx+"' amt='"+compset.target+"'></div><div class='progy'>"+expdte+" left</div></div></div></div>";
          $('#jeff').append(jerry);
          var xcmpset = {};
          xcmpset.cid = compset.compid;
          socket.emit('getcompaccreq3',xcmpset);
        });

        socket.on('getcompaccres3',function(datad){
          var pack = datad.data;
          var scalexy = "SCT"+pack.compid;
          var perxy = "PERT"+pack.compid;
          var amttagy = "AMTG"+pack.compid;
          var amtxy = $('#'+amttagy).attr("shramt");
          var targetxy = $('#'+perxy).attr("amt");
          var contr = pack.shareprice * amtxy;
          $('#'+amttagy).html("Amount : <b>UGX. "+numberWithCommas(contr)+"</b>");
          var percent = (pack.credit / targetxy)*100;
          $('#'+perxy).html(percent+"%");
          if(percent<1){
            percentx = 1;
          }else{
            percentx = percent+1;
          }
          var perv = percentx+"%";
          $('#'+scalexy).css("width",perv);
          var pertg = "STK"+pack.compid;
          var pertgy = $('#'+pertg).attr("perc").split("--");
          var contrperc = (contr/pertgy[1])*100;
          var mystk = contrperc*(pertgy[0]/100);
          $('#'+pertg).html("Stake : <b>"+mystk.toFixed(2)+"%</b>");
        });

        $('#jeff').on('click','.compxname', function()
         {
           var stid = $(this).attr("id");
           window.open("#startupx","_self");
           var xcmpset = {};
           xcmpset.cid = stid.substring(5);
           socket.emit('getcompreq',xcmpset);
         });

         $('#faith').on('click','.compxname', function()
          {
            var stid = $(this).attr("id");
            window.open("#startupx","_self");
            var xcmpset = {};
            xcmpset.cid = stid.substring(5);
            socket.emit('getcompreq',xcmpset);
          });

          $('#jeff').on('click','.sellbt', function()
           {
             var ycompid = $(this).attr("cpid");
             var ycompnme = $(this).attr("nme");
             sellset = {id:ycompid,name:ycompnme};
             $('#sbp1').val("");
             $('#sbp2').val("");
             $('#kabazi').html("");
             $(".sellpopuphed").html(ycompnme.substring(0, 50));
             $(".sellpopup").show();
             $('.sellpopup').modalBox('open');
           });

           $('#sellform').on('submit', function()
            {
              var xcmpset = {};
              xcmpset.cid = sellset.id;
              xcmpset.cnme = sellset.name;
              xcmpset.unme = xu.name;
              xcmpset.uid = xu.id;
              xcmpset.shr = $('#sbp1').val();
              xcmpset.pin = $('#sbp2').val();
              console.log(xcmpset);
              socket.emit('sellshrsreq',xcmpset);
              return false;
            });

          socket.on('sellshrsres',function(datad){
            alert(datad.data.message);
          });

          $('.notifydiv2').on('click','.qbuybut', function()
           {
             qikset = {};
             qikset.compid = $(this).attr("cid");
             qikset.compnme = $(this).attr("cmp");
             qikset.uname = $(this).attr("unm");
             qikset.uid = $(this).attr("uid");
             qikset.shr = $(this).attr("shr");
             $(".qbuytxt").html("Buying <b>"+qikset.shr+" shares</b> from --> "+qikset.uname+". </br>Enter your Transaction-Pin to complete Transaction");
             $(".sellpopuphed2").html(qikset.compnme.substring(0, 50));
             $(".sellpopup2").show();
             $('.sellpopup2').modalBox('open');
             var xcmpset = {};
             xcmpset.cid = qikset.compid;
             socket.emit('getcompaccreq5',xcmpset);
           });

           $('#sellform2').on('submit', function()
            {
              var pinx = $('#sbp22').val();
              qikset.pin = pinx;
              qikset.buyerid = xu.id;
              qikset.buyernme = xu.name;
              socket.emit('buyindshrsreq',qikset);
              return false;
            });

           socket.on('getcompaccres5',function(datad){
             qikset.shareprice  = datad.data.shareprice;
           });

           socket.on('getmyfollowsetres',function(datad){
             var followpack = datad.data;
             $('#solomon').html("");
             for(var u=0; u<followpack.length; u++){
               var xlet = followpack[u].compname.substring(0, 1).toUpperCase();
               var fllwu = "<div class='fllwdiv'><div class='fllwicn'><div class='fllwltt'>"+xlet+"</div></div><div class='fllwnme'><div class='fllwcmpn'>"+followpack[u].compname+"</div><div class='fllwcat'>"+followpack[u].category+"</div></div></br><div class='fllwpt'>"+followpack[u].pitchtext+"</div></div>";
               $('#solomon').append(fllwu);
             }
           });

           $('#hyu').on('click','.depobutt', function(){
              $(".depopopuphed").html("Depositing funds to your MSET account");
              $(".depopopup").show();
              $('.depopopup').modalBox('open');
            });

            $('#depoform').on('submit', function()
             {
               var pinx = $('#sbpa2').val();
               var deposet = {};
               deposet.uid = xu.id;
               deposet.amount = $('#sbpa1').val();
               deposet.phone = $('#sbpa2').val();
               socket.emit('depositreq',deposet);
               $(".depopopup").hide();
               $('.depopopup').modalBox('close');
               return false;
             });

             socket.on('depositres',function(datad){
               alert(datad.data.message);
               $("#hyu").html("</br><b>Credit : </b> UGX "+datad.data.data.credit+" </br><div class='depobutt'>DEPOSIT</div>");
             });

             socket.on('getinvaccres2',function(datad){
               console.log(datad);
               $("#hyu").html("</br><b>Credit : </b> UGX "+datad.data.data.credit+" </br><div class='depobutt'>DEPOSIT</div>");
             });





});
