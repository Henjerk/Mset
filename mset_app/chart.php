<?php  ?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>charts</title>
    <script type='text/JavaScript' src='jquery.js'></script>
    <script type='text/JavaScript' src='chart.min.js'></script>
    <script type="text/JavaScript" src="socket.js"></script>
    <script type='text/JavaScript' src='underscore-min.js'></script>
  </head>
  <body>
    <div style="height:200px; width:600px;">
      <canvas id="myChart" width="400" height="200"></canvas>
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
        var chartdata = {
          labels:xa,
          datasets : [
            {
              label: "Backers",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgba(59, 89, 152, 0.75)",
              borderColor: "rgba(59, 89, 152, 1)",
              pointHoverBackgroundColor: "rgba(59, 89, 152, 1)",
              pointHoverBorderColor: "rgba(59, 89, 152, 1)",
              data:ya
            }


          ]
        };

        var ctx = $("#myChart");

        var barGraph = new Chart(ctx, {
          type: 'line',
          data: chartdata,
          options: {
              scales: {
                  yAxes: [{
                     scaleLabel:{
                       display: true, labelString:'number of backers/investors'
                     }
                  }],
                  xAxes: [{
                     scaleLabel:{
                       display: true, labelString:'week number as per year'
                     }
                  }]
              }
          }
        });

      }
    });
    </script>
  </body>
</html>
