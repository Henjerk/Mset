<?php  ?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>charts</title>
    <script type='text/JavaScript' src='jquery-2.1.1.js'></script>
    <script type='text/JavaScript' src='underscore-min.js'></script>
    <script type="text/JavaScript" src="socket.js"></script>
    <script type='text/JavaScript' src='canvasjs.min.js'></script>
  </head>
  <body>
    <div style="height:400px; width:600px;" id="myChart">

    </div>
    <script>
    $(document).ready(function(){
      var socket = io(ter);
      socket.emit('statsbackersvtimereq');
      socket.on('statsbackersvtimeres',function(datad){
        var ru = datad.data;
        var xa = _.keys(ru);
        var yv = _.values(ru);
        var ya = [];
        for(var i=0; i<xa.length; i++){
          ya.push(yv[i].length);
        }
        draw(xa,ya);
      });

      function draw(xa,ya){
        console.log(xa);
        console.log(ya);
        var chart = new CanvasJS.Chart("myChart", {
          title:{
            text: "My First Chart in CanvasJS"
          },
          data: [
          {
            // Change type to "doughnut", "line", "splineArea", etc.
            type: "column",
            dataPoints: [
              { label: "24",  y: 3  },
              { label: "25", y: 1  },
              { label: "26", y: 1  }
            ]
          }
          ]
        });
        chart.render();
      }
    });
    </script>
  </body>
</html>
