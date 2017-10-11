<?php  
session_start();
$inreq=$_GET["req"];

if($inreq=="setid"){
  $_SESSION["uid"] = $_GET["uid"];
  echo "set".$_SESSION["uid"];
}else if($inreq=="getid"){
  echo $_SESSION["uid"];
}


?>