<?php

header('content-type: application/json');
session_start();
$inreq=$_GET["req"];
$pack = array();

if($inreq=="setid"){
  $uid=$_GET["uid"];
  $_SESSION["uid"] = $uid;
  $returncode = "20";
  $message = "session set for user";
  $finarray = array('codex' => $returncode, 'message' => $message);
  $pack[] = $finarray;
  echo json_encode($pack);
}else if($inreq=="getid"){
  $returncode = "30";
  $message = "session details";
  $finarray = array('codex' => $returncode, 'message' => $message, 'userid' => $_SESSION["uid"]);
  $pack[] = $finarray;
  echo json_encode($pack);
}else if($inreq=="logout"){
  session_unset();
  session_destroy();
  $returncode = "40";
  $message = "session destroy";
  $finarray = array('codex' => $returncode, 'message' => $message);
  $pack[] = $finarray;
  echo json_encode($pack);
}

?>
