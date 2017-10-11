$(document).ready(function(){

  var socket = io(ter);

  $('a').on('click', function()
   {

     var lnk = $(this).attr('href');
     if(lnk=="#campaignsx"){
       socket.emit('admingetallcampsreq');
     }else if(lnk=="#expiredx"){
       var reqset = {};
       reqset.ste = "expired";
       socket.emit('admingetallcampsviastatereq',reqset);
     }else if(lnk=="#pendingx"){
       var reqset = {};
       reqset.ste = "pending";
       socket.emit('admingetallcampsviastatereq',reqset);
     }else if(lnk=="#activex"){
       var reqset = {};
       reqset.ste = "active";
       socket.emit('admingetallcampsviastatereq',reqset);
     }
     else if(lnk=="#compbuy"){
       var reqset = {};
       reqset.ate = "5994";
       socket.emit('admingetalltransviatypereq',reqset);
     }
     else if(lnk=="#indbuy"){
       var reqset = {};
       reqset.ate = "18194";
       socket.emit('admingetalltransviatypereq',reqset);
     }
     else if(lnk=="#indsell"){
       var reqset = {};
       reqset.ate = "18694";
       socket.emit('admingetalltransviatypereq',reqset);
     }
     else if(lnk=="#deposit"){
       var reqset = {};
       reqset.ate = "2292";
       socket.emit('admingetalltransviatypereq',reqset);
     }
     else if(lnk=="#activey"){
       var reqset = {};
       reqset.ste = "activation_ok";
       socket.emit('admingetallusersviastatereq',reqset);
     }
     else if(lnk=="#pendingy"){
       var reqset = {};
       reqset.ste = "pending";
       socket.emit('admingetallusersviastatereq',reqset);
     }
     else if(lnk=="#suspendedy"){
       var reqset = {};
       reqset.ste = "suspended";
       socket.emit('admingetallusersviastatereq',reqset);
     }
     else if(lnk=="#transactionsx"){
       socket.emit('admingetalltransreq');
     }
     else if(lnk=="#usersx"){
       socket.emit('admingetallusersreq');
     }
   });

   socket.on('admingetallcampsviastateres',function(datad){
    var compset = datad.data;
    $('#t01').html("");
    $('#t01').append("<tr><th>N0</th><th>Campaign-ID</th><th>Cr-Date</th><th>Campaign-name</th><th>Admin</th><th>Category</th><th>Target</th><th>Raised</th><th>Period</th></tr>");
    if(compset.length>0){
      for(var r=0; r<compset.length; r++){
       var cnt = r+1;
       var atrgt = numberWithCommas(compset[r].target);
       var dif = compset[r].period.stamp-new Date().getTime()/1000;
       var seconds = dif % 60; dif /= 60; var minutes = dif % 60; dif /= 60; var hours = dif % 24; dif /= 24; var days = dif;
       var expdte = parseFloat(days).toFixed(2)+" days / "+compset[r].period.prd;
       var timex = moment.unix(compset[r].crtstamp).format("lll");
       var mark = "mark"+compset[r].compid;
       if(compset[r].compname.length>33){
         var cmpnme = compset[r].compname.substring(0, 33)+"...";
       }else{
         var cmpnme = compset[r].compname;
       }
       if(compset[r].category.length>16){
         var cmpcty = compset[r].category.substring(0, 16)+"...";
       }else{
         var cmpcty = compset[r].category;
       }
       if(compset[r].userid.name.length>16){
         var cmpadm = compset[r].userid.name.substring(0, 16)+"...";
       }else{
         var cmpadm =compset[r].userid.name;
       }
       if(compset[r].status=="active"){
        var buttclass="actbutt";
        var buttxt = "active";
       }else if(compset[r].status=="pending"){
        var buttclass="pendbutt";
        var buttxt = "pending";
       }else if(compset[r].status=="expired"){
        var buttclass="expbutt";
        var buttxt = "expired";
       }
       var rowx = "<tr><td>"+cnt+"</td><td>"+compset[r].compid+"</td><td>"+timex+"</td><td>"+cmpnme+"</td><td>"+cmpadm+"</td><td>"+cmpcty+"</td><td>"+atrgt+"</td><td><div id='"+mark+"'>0</div></td><td>"+expdte+"</td><td><div id='"+compset[r].compid+"' class='"+buttclass+"'>"+buttxt+"</div></td></tr>";
       $('#t01').append(rowx);
       var accset = {}
       accset.cid = compset[r].compid;
       socket.emit('admingetcompaccreq',accset);
      }
    }else {
      var nores = "<div class='nores'>No Results Found</div>";
      $('#t01').html(nores);
    }
   });

   socket.on('admingetallcampsres',function(datad){
    var compset = datad.data;
    $('#t01').html("");
    $('#t01').append("<tr><th>N0</th><th>Campaign-ID</th><th>Cr-Date</th><th>Campaign-name</th><th>Admin</th><th>Category</th><th>Target</th><th>Raised</th><th>Period</th></tr>");
    if(compset.length>0){
      for(var r=0; r<compset.length; r++){
       var cnt = r+1;
       var atrgt = numberWithCommas(compset[r].target);
       var dif = compset[r].period.stamp-new Date().getTime()/1000;
       var seconds = dif % 60; dif /= 60; var minutes = dif % 60; dif /= 60; var hours = dif % 24; dif /= 24; var days = dif;
       var expdte = parseFloat(days).toFixed(2)+" days / "+compset[r].period.prd;
       var timex = moment.unix(compset[r].crtstamp).format("lll");
       var mark = "mark"+compset[r].compid;
       if(compset[r].compname.length>33){
         var cmpnme = compset[r].compname.substring(0, 33)+"...";
       }else{
         var cmpnme = compset[r].compname;
       }
       if(compset[r].category.length>16){
         var cmpcty = compset[r].category.substring(0, 16)+"...";
       }else{
         var cmpcty = compset[r].category;
       }
       if(compset[r].userid.name.length>16){
         var cmpadm = compset[r].userid.name.substring(0, 16)+"...";
       }else{
         var cmpadm =compset[r].userid.name;
       }
       if(compset[r].status=="active"){
        var buttclass="actbutt";
        var buttxt = "active";
       }else if(compset[r].status=="pending"){
        var buttclass="pendbutt";
        var buttxt = "pending";
       }else if(compset[r].status=="expired"){
        var buttclass="expbutt";
        var buttxt = "expired";
       }
       var rowx = "<tr><td>"+cnt+"</td><td>"+compset[r].compid+"</td><td>"+timex+"</td><td>"+cmpnme+"</td><td>"+cmpadm+"</td><td>"+cmpcty+"</td><td>"+atrgt+"</td><td><div id='"+mark+"'>0</div></td><td>"+expdte+"</td><td><div id='"+compset[r].compid+"' class='"+buttclass+"'>"+buttxt+"</div></td></tr>";
       $('#t01').append(rowx);
       var accset = {};
       accset.cid = compset[r].compid;
       socket.emit('admingetcompaccreq',accset);
      }
    }else {
      var nores = "<div class='nores'>No Results Found</div>";
      $('#t01').html(nores);
    }
   });

   function numberWithCommas(x){
     return x.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
   }

   socket.on('admingetcompaccres',function(datad){
    var compset = datad.data;
    var markx = "mark"+compset.compid;
    $('#'+markx).html(numberWithCommas(compset.credit));
   });

   socket.on('admingetalltransviatyperes',function(datad){
    var compset = datad.data;
    $('#t02').html("");
    $('#t02').append("<tr><th>N0</th><th>Transaction-ID</th><th>Cr-Date</th><th>Transaction-summary</th><th>Acoount X</th><th>Acoount Y</th></tr>");
    if(compset.length>0){
      for(var r=0; r<compset.length; r++){
        var cntx = r+1;
        var timey = moment.unix(compset[r].crtstamp).format("LLLL");
        if(compset[r].transtext.length>60){
          var cmptxt = compset[r].transtext.substring(0, 60)+"...";
        }else{
          var cmptxt = compset[r].transtext;
        }
        if(compset[r].transtype=="5994"){
         var buttclass="actbutt";
         var buttxt = "comp-buy";
        }else if(compset[r].transtype=="18194"){
         var buttclass="pendbutt";
         var buttxt = "ind-buy";
        }else if(compset[r].transtype=="18694"){
         var buttclass="sigbutt1";
         var buttxt = "ind-sell";
       }else if(compset[r].transtype=="2292"){
          var buttclass="sigbutt2";
          var buttxt = "deposit";
        }
        var rowy = "<tr><td>"+cntx+"</td><td>"+compset[r].transid+"</td><td>"+timey+"</td><td>"+cmptxt+"</td><td>"+compset[r].accountx+"</td><td>"+compset[r].accounty+"</td><td><div class='"+buttclass+"'>"+buttxt+"</div></td></tr>";
        $('#t02').append(rowy);
      }
    }
    else{
      var nores = "<div class='nores'>No Results Found</div>";
      $('#t02').html(nores);
    }
   });

   socket.on('admingetalltransres',function(datad){
    var compset = datad.data;
    $('#t02').html("");
    $('#t02').append("<tr><th>N0</th><th>Transaction-ID</th><th>Cr-Date</th><th>Transaction-summary</th><th>Acoount X</th><th>Acoount Y</th></tr>");
    if(compset.length>0){
      for(var r=0; r<compset.length; r++){
        var cntx = r+1;
        var timey = moment.unix(compset[r].crtstamp).format("LLLL");
        if(compset[r].transtext.length>60){
          var cmptxt = compset[r].transtext.substring(0, 60)+"...";
        }else{
          var cmptxt = compset[r].transtext;
        }
        if(compset[r].transtype=="5994"){
         var buttclass="actbutt";
         var buttxt = "comp-buy";
        }else if(compset[r].transtype=="18194"){
         var buttclass="pendbutt";
         var buttxt = "ind-buy";
        }else if(compset[r].transtype=="18694"){
         var buttclass="sigbutt1";
         var buttxt = "ind-sell";
        }else if(compset[r].transtype=="2292"){
          var buttclass="sigbutt2";
          var buttxt = "deposit";
        }
        var rowy = "<tr><td>"+cntx+"</td><td>"+compset[r].transid+"</td><td>"+timey+"</td><td>"+cmptxt+"</td><td>"+compset[r].accountx+"</td><td>"+compset[r].accounty+"</td><td><div class='"+buttclass+"'>"+buttxt+"</div></td></tr>";
        $('#t02').append(rowy);
      }
    }
    else{
      var nores = "<div class='nores'>No Results Found</div>";
      $('#t02').html(nores);
    }
   });

   socket.on('admingetallusersres',function(datad){
    var compset = datad.data;
    $('#t03').html("");
    $('#t03').append("<tr><th>N0</th><th>User-ID</th><th>Cr-Date</th><th>User-name</th><th>Phone</th><th>Email</th><th>Nationality</th><th>National-ID</th></tr>");
    if(compset.length>0){
      for(var r=0; r<compset.length; r++){
        var cntx = r+1;
        var timey = moment.unix(compset[r].crtstamp).format("lll");
        if(compset[r].status=="activation_ok"){
         var buttclass="actbutt";
         var buttxt = "active";
        }else if(compset[r].status=="pending"){
         var buttclass="pendbutt";
         var buttxt = "pending";
       }else if(compset[r].status=="suspended"){
         var buttclass="expbutt";
         var buttxt = "susp'd";
        }
        var rowp = "<tr><td>"+cntx+"</td><td>"+compset[r].userid+"</td><td>"+timey+"</td><td>"+compset[r].username+"</td><td>"+compset[r].phone+"</td><td>"+compset[r].email+"</td><td>"+compset[r].nationality+"</td><td>"+compset[r].nationalID+"</td><td><div class='"+buttclass+"'>"+buttxt+"</div></td></tr>";
        $('#t03').append(rowp);
      }
    }else{
      var nores = "<div class='nores'>No Results Found</div>";
      $('#t03').html(nores);
    }
   });

   socket.on('admingetallusersviastateres',function(datad){
     var compset = datad.data;
     $('#t03').html("");
     $('#t03').append("<tr><th>N0</th><th>User-ID</th><th>Cr-Date</th><th>User-name</th><th>Phone</th><th>Email</th><th>Nationality</th><th>National-ID</th></tr>");
     if(compset.length>0){
       for(var r=0; r<compset.length; r++){
         var cntx = r+1;
         var timey = moment.unix(compset[r].crtstamp).format("lll");
         if(compset[r].status=="activation_ok"){
          var buttclass="actbutt";
          var buttxt = "active";
         }else if(compset[r].status=="pending"){
          var buttclass="pendbutt";
          var buttxt = "pending";
         }else if(compset[r].status=="suspended"){
          var buttclass="expbutt";
          var buttxt = "susp'd";
         }
         var rowp = "<tr><td>"+cntx+"</td><td>"+compset[r].userid+"</td><td>"+timey+"</td><td>"+compset[r].username+"</td><td>"+compset[r].phone+"</td><td>"+compset[r].email+"</td><td>"+compset[r].nationality+"</td><td>"+compset[r].nationalID+"</td><td><div class='"+buttclass+"'>"+buttxt+"</div></td></tr>";
         $('#t03').append(rowp);
       }
     }else{
       var nores = "<div class='nores'>No Results Found</div>";
       $('#t03').html(nores);
     }
   });

   $('#t01').on('click','.pendbutt', function(){
      var compid = $(this).attr("id");
      var reqset = {};
      reqset.code = "active";
      reqset.cid = compid;
      socket.emit('admincompstatereq',reqset);
    });

    socket.on('admincompstateres',function(datad){
      alert(datad.data.message);
    });




});
