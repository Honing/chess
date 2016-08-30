<?php 
/******************************数据库连接*****************************/
$conn = @mysql_connect("hujuntao.gotoftp1.com","hujuntao","19870630");
if (!$conn){
    die("连接数据库失败：" . mysql_error());
	echo("连接失败");
}
mysql_select_db("hujuntao", $conn);
//字符转换，读库
mysql_query("set character set 'gbk'");
//写库
mysql_query("set names 'gbk'");
?>