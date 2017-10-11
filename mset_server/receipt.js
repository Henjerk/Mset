var exports = module.exports={};
var fs = require('fs');
var pdf = require('html-pdf');
var dbx = require("./mset_a.js");

function generate_buy_pdf_receipt(filename){
  var html_filenme = filename+".html";
  var pdf_filenme = filename+".pdf";
  var html = fs.readFileSync("/Volumes/MAC OS X/Applications/XAMPP/htdocs/mset/images/htmlz/"+html_filenme, 'utf8');
  var options = { format: 'A4',"orientation": "landscape" };
  pdf.create(html, options).toFile("/Volumes/MAC OS X/Applications/XAMPP/htdocs/mset/images/receipts/"+pdf_filenme, function(err, res) {
   if (err) return console.log(err);
   console.log(res);
   dbx.update_receipt_pdf(filename,pdf_filenme);
  });
}

function save_html(html_code,namex){	
  var recflenme = namex+".html";	
  fs.stat("/Volumes/MAC OS X/Applications/XAMPP/htdocs/mset/images/htmlz/"+recflenme, function(err, stat) {
    if(err == null) {
      console.log('File exists');
    }else if(err.code == 'ENOENT') {
      //console.log('File doesnt exist');
      fs.writeFile("/Volumes/MAC OS X/Applications/XAMPP/htdocs/mset/images/htmlz/"+recflenme, html_code, function(err){
        if(err){
         console.log(err);
        }else{
         generate_buy_pdf_receipt(namex);
        }
      });
    }else {
      console.log('Some other error: ', err.code);
    }
  });
}

exports.gen_buy_html=function(rnme,rtrnid,recid,rdate,rcmp,rshr,rpx,rtrnfee,rtot){
 var jose = "<html><head><meta charset='utf-8'><title>Receipt</title></head><body><div align='center' style='font-family:sans-serif; width:700px; margin-top:50px; margin-left:20px;'><div align='left'><img src='http://victoryuganda.com/mset/logo.png' alt='' style='height:35px; width:35px; display:inline-block; vertical-align:top;'><div style='color:#e67e22; font-size:18px; display:inline-block; vertical-align:top; font-weight:bold; margin-top:6px;'>MICROSTOCKS</div><div style='display:inline-block; vertical-align:top; float:right;'><div style='color:#e67e22; font-size:16px;'>"+rnme+"</div><div style='color:#000; font-size:13px; margin-top:3px;'><b>Receipt:</b> "+recid+"</div><div style='color:#000; font-size:13px; margin-top:2px;'>"+rdate+"</div></div><div style='color:#000; font-size:14px; margin-top:30px;'>Dear "+rnme+", Thank you for using Microstocks. Here is your order summary for purchase of company shares.</div></div></br><div style='width:100%; background-color:#eee; padding:1px; margin-top:5px;'></div><div><table style='text-align:left;font-size:14px;width:100%;table-layout:fixed;' cellpadding='3'><tr><th>Transaction</th><th>Company</th><th>Shares</th><th>Price</th></tr><tr style='background-color:#eee;' valign='top'><td>Buying company shares.</br></br>TransactionID: "+rtrnid+"</td><td>"+rcmp+"</td><td>"+rshr+"</td><td>Shs. "+rpx+"</td></tr><tr><td>Transaction fee</td><td></td><td></td><td>Shs. "+rtrnfee+"</td></tr><tr style='background-color:#eee;'><td><b>Total</b></td><td></td><td></td><td><b>Shs. "+rtot+"</b></td></tr></table></div><div style='width:100%; background-color:#eee; padding:1px; margin-top:5px;'></div><div style='color:#000; font-size:14px; margin-top:30px; text-align:left;'>Feel free to contact our Customer Service team if you have any questions or concerns. They're available 24/7.</br></br>Regards,</br>Team Microstocks</br>http://www.microstocks.com/</div></div></div></body></html>";
 save_html(jose,recid);
}

exports.gen_ind_buy_html=function(rnme,rtrnid,recid,rdate,rcmp,rshr,rpx,rtrnfee,rtot,rtxt){
 var jose = "<html><head><meta charset='utf-8'><title>Receipt</title></head><body><div align='center' style='font-family:sans-serif; width:700px; margin-top:50px; margin-left:20px;'><div align='left'><img src='http://victoryuganda.com/mset/logo.png' alt='' style='height:35px; width:35px; display:inline-block; vertical-align:top;'><div style='color:#e67e22; font-size:18px; display:inline-block; vertical-align:top; font-weight:bold; margin-top:6px;'>MICROSTOCKS</div><div style='display:inline-block; vertical-align:top; float:right;'><div style='color:#e67e22; font-size:16px;'>"+rnme+"</div><div style='color:#000; font-size:13px; margin-top:3px;'><b>Receipt:</b> "+recid+"</div><div style='color:#000; font-size:13px; margin-top:2px;'>"+rdate+"</div></div><div style='color:#000; font-size:14px; margin-top:30px;'>Dear "+rnme+", Thank you for using Microstocks. Here is your order summary for purchase of company shares.</div></div></br><div style='width:100%; background-color:#eee; padding:1px; margin-top:5px;'></div><div><table style='text-align:left;font-size:14px;width:100%;table-layout:fixed;' cellpadding='3'><tr><th>Transaction</th><th>Company</th><th>Shares</th><th>Price</th></tr><tr style='background-color:#eee;' valign='top'><td>Buying company shares. </br>"+rtxt+"</br></br>TransactionID: "+rtrnid+"</td><td>"+rcmp+"</td><td>"+rshr+"</td><td>Shs. "+rpx+"</td></tr><tr><td>Transaction fee</td><td></td><td></td><td>Shs. "+rtrnfee+"</td></tr><tr style='background-color:#eee;'><td><b>Total</b></td><td></td><td></td><td><b>Shs. "+rtot+"</b></td></tr></table></div><div style='width:100%; background-color:#eee; padding:1px; margin-top:5px;'></div><div style='color:#000; font-size:14px; margin-top:30px; text-align:left;'>Feel free to contact our Customer Service team if you have any questions or concerns. They're available 24/7.</br></br>Regards,</br>Team Microstocks</br>http://www.microstocks.com/</div></div></div></body></html>";
 save_html(jose,recid);
}