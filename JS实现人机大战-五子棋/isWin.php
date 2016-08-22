<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>无标题文档</title>
</head>

<body>
<?php
include('conn.php');
$username = htmlspecialchars($_GET['username']);
$isWin=$_GET['isWin'];

$query=mysql_query("SELECT * FROM user_db WHERE username='$username'");
if($row=mysql_fetch_array($query)){
	$winTimes=$row['winTimes'];
	$loseTimes=$row['loseTimes'];
	
	if($isWin>0){$winTimes++;}else if($isWin<0){$loseTimes++;}

	mysql_query("UPDATE user_db SET winTimes='$winTimes' WHERE username='$username'");
	mysql_query("UPDATE user_db SET loseTimes='$loseTimes' WHERE username='$username'");
	print('isWin:'.$isWin.' loseTimes:'.$loseTimes);
	}else{
		echo("Failed connetion!");
		}
?>
</body>
</html>