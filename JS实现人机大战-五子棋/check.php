<?php
//包含数据库连接文件
include('conn.php');

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