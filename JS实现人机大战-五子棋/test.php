<?php
/*********************************数据库连接************************************/
$conn = @mysql_connect("localhost","root","");
if (!$conn){
    die("连接数据库失败：" . mysql_error());
	echo("连接失败");
}
mysql_select_db("chess_db", $conn);
//字符转换，读库
mysql_query("set names utf8");

/************************检查数据库中是否含有该用户名******************************/
$username = $_GET['username'];

$sql="SELECT * FROM user_db WHERE username='".$username."'";
$query=mysql_query($sql);
$result=mysql_fetch_array($query);
mysql_close($conn);
if($result==true){
echo 1;
}else{

echo 0;}


?>