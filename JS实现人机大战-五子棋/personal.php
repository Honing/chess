<?php
include('conn.php');
$username = htmlspecialchars($_GET['username']);
$query=mysql_query("SELECT * FROM user_db WHERE username='$username' limit 1");
/*$loseTimes=mysql_query("SELECT loseTimes WHERE username='$username'");*/
/*echo $winTimes;
echo $loseTimes;*/

if($row=mysql_fetch_array($query)){
	$data=array("winTimes"=>$row['winTimes'],"loseTimes"=>$row['loseTimes']); 
	echo json_encode($data); 
	}else{
		echo('failed to load');
		}

?>
