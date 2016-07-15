<?php
	$con = mysql_connect("localhost","root","");
	$username=$_REQUEST['username'];
	$password=$_REQUEST['password'];
	$times=$_REQUEST['times'];

	if (!$con)
  {
  die('Could not connect to mySQL: ' . mysql_error());
  }

	mysql_select_db("chesslogindb", $con);

	$sql="INSERT INTO userinfo (username, password, times) VALUES ('".$username."','".$password."','".$times."')";
	
	if (!mysql_query($sql,$con))
  {
  	die('Error: ' . mysql_error());
  }
	echo "SUCCESS!";

	mysql_close($con);
?>