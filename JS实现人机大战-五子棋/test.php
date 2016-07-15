<?php
    header("Content-type:text/html;charset=utf-8");
	$con = mysql_connect("localhost","root","");
	$username=urldecode($_REQUEST['username']);
	$password=$_REQUEST['password'];
	$times=$_REQUEST['times'];

	if (!$con)
  {
  die('Could not connect to mySQL: ' . mysql_error());
  }
	 
	mysql_select_db("chesslogindb", $con);
	mysql_query("set character set 'utf8'");//读库 
	mysql_query("set names 'utf8'");//写库

	$sql="INSERT INTO userinfo (username, password, times) VALUES ('".$username."','".$password."','".$times."')";
	
	if (!mysql_query($sql,$con))
  {
  	die('Error: ' . mysql_error());
  }
	echo "提交成功！";

	mysql_close($con);
?>