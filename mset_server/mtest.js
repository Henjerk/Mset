
var moment = require('moment');
var base64Data = "iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAADSklEQVRoQ+WaTVLbQBCFu0dVSdmVVMgSbSKRA8S7ZIe5AZwAc4EA+9gInD0mFwBOADkB9i5ZxTkASCwwVdkEKqmk8uN5KQlsbFmyBtmyZMdbt3ve5+7pmekZpjF9Li3DIEmLgCgQoUBMBhEb/e7hEMgh4iazbJKgxrzlOOOQwKM4uREvVkEoDYpW9QyHCDUW9H4UqFggXyyj8Kct1pmppCpXxQ6gA6HJ7ThA9wL5ahlzP9pid9wAfkgXKK/JzaeWc6XyB7g2yiCXZaMkmXeZeE7V+Sh2IFyxxJr+1jlW8aMEclFe2E86CqFiQTW9erYZBTMUxE2ln20+IuZilKNEvwfqOQ0rw1ItFMSbD5JPmLiQqEhF5yA08wJLYTChIK2yeZJ6JAarQF2v2ktB7IEgqc6J6Ajt6TtnG36zARC3OoHFfrS/FC2kXPFXsz6Q23lhT6rExv0r3NKcFzB750sfSKtiHhDxatwBJvs7HOo7dndn0QVxtx1/pfgUJOaB8XKyGn2j/XY+Bo7PQpqd7UwXZFg05rdPUwW53HoeMv5dVDwQdxcLKewwtdkFIepExQO5qCxYTLQ1jSAE2tSrZzUPpFUx7fjniVSzjojg6Du2yVFplbZMlfHd9OKpWAAjaBhyjVuVhRoRrauQZ9hmj1tls07MixkWGS0NaPB0T/QOIxw3tRCF/Lj4Osok0e+/1d9F+lcCyfKC2CH8v0AeLaVb1L6f7CmkVtl0iPlZpGWWDYDzWSq/M7IgzswWZWY2jd42fponPHCuV21jtg5WUemV5ZW976h7e0oMbQVlF8TXfHBBhrWDHpqvUl0Of9kf1NtBUVFJlSRw8JAGnWt7cx8iHGJ6kj3hPYpA1zlNGqEtUy8qb4xlEuIo0yBRTeyO+Iyf49WuFbowWTzLAw29agdeAw6/emtznZlfZCHNAHzOayje++rtbvLzcepdFqCR07Ac6zK0Nwopz5nAOeHPEqV79m41Y3EwsdIMuibI0lgfDHTovXVGci35Wy0c5gQ2EnnC0RvKm00mW+MHwiELWIk/qvHnpQfUFstE2IjdwADOibjGmjyOA9Dta42rtHpvt9pUBIsCAe5rCWMAzhNNbtemyZBN0qg+ivhe7f8A4WWc6CJJnIEAAAAASUVORK5CYII=";

  function generateID_B(nx){
	  var text = "";
	  var possible = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	  for( var i=0; i<nx; i++ ){
	    if(i==7){
          text += possible.charAt(Math.floor(Math.random() * possible.length))+"553mb4ty4";
	    }else{
          text += possible.charAt(Math.floor(Math.random() * possible.length));
	    }
	  }
	  var dt = new Date();
	  return text+dt.getSeconds();
  }

  /*function save_image(imgdata,callback){
    var filename = generateID_B(15)+".png";
    var fileloc = "imgs/"+filename;
	require("fs").writeFile(fileloc, base64Data, 'base64', function(err) {
	  if(err){
        callback(err);
	  }else{
        callback(filename);
	  }
	});
  }*/

  function save_image(imgdata){
    var filename = generateID_B(15)+".png";
    var fileloc = "/Volumes/MAC OS X/Applications/XAMPP/htdocs/mset/images/proj/"+filename;
	require("fs").writeFile(fileloc, imgdata, 'base64', function(err) {
	  if(err){
        console.log(err);
	  }
	});
	return filename;
  }

  /*save_image(base64Data,function(resp){
    console.log(resp);
  });*/

  console.log(save_image(base64Data));

  //console.log(new Date(moment().add(7, 'days').format()).getTime()/1000);


function get_expiry_date(ed){
  var jose;	
  if(ed=="2 months"){
   jose = new Date(moment().add(2, 'months').format()).getTime()/1000;
  }else if(ed=="4 months"){
   jose = new Date(moment().add(4, 'months').format()).getTime()/1000;
  }else if(ed=="6 months"){
   jose = new Date(moment().add(6, 'months').format()).getTime()/1000;
  }else if(ed=="10 months"){
   jose = new Date(moment().add(10, 'months').format()).getTime()/1000;
  }else if(ed=="1 year"){
   jose = new Date(moment().add(1, 'year').format()).getTime()/1000;
  }
  return jose;
}

/*console.log(get_expiry_date("2 months"));

var nt = new Date().getTime()/1000;
var ft = 1501069020;
var td = ft-nt;

var dif = 1501069020-new Date().getTime()/1000;
console.log(dif);
var th = moment.unix(ft).calendar();
console.log(th);

var cc = new Date("9/13/2012 12:00 AM"),
    c = new Date();

function timeDifference(dif) {
    var hour = 60 * 60 * 1000,
        day = hour * 24,
        month = day * 30,
        ms = dif,
        months = parseInt(ms / month, 10);    

    ms = ms - months * month;    
    var days = parseInt(ms / day, 10); 
    ms -= days * day;
    var hours = parseInt(ms / hour, 10);   
    ms -= hours * hour;

    return [
        months + " months",
        days + " days",
        hours + " hours"
    ].join(", ");
};

console.log(timeDifference(get_expiry_date("2 months")));
var x = dif;
var seconds = x % 60; x /= 60; var minutes = x % 60; x /= 60; var hours = x % 24; x /= 24; var days = x;
console.log(parseFloat(days).toFixed(2));*/






