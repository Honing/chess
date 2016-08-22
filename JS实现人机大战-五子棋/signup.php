<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>无标题文档</title>
</head>

<body>
<?php 
/******************************数据库连接*****************************/
/*$conn = @mysql_connect("localhost","root","");
if (!$conn){
    die("连接数据库失败：" . mysql_error());
	echo("连接失败");
}
mysql_select_db("chess_db", $conn);
//字符转换，读库
mysql_query("set character set 'gbk'");
//写库
mysql_query("set names 'gbk'");*/
include("conn.php");

/********************************用户注册**************************************/
/*if(!isset($_POST['submit'])){//测试变量是否被设置，如用 unset()释放一个变量之后将返回false。一个被设置成NULL的变量，将返回FALSE
    exit('非法访问!');
}*/
$username = $_POST['username'];
$password = $_POST['password'];

//检测用户名是否已经存在
$check_query = mysql_query("select * from user_db where username='$username' limit 1");
if(mysql_fetch_array($check_query)){
    echo '错误：用户名 ',$username,' 已存在。<a href="javascript:history.back(-1);">返回</a>';
    exit;
}
//写入数据
/*$password = MD5($password);*/
//$regdate = time();
$sql = "INSERT INTO user_db(username,password,winTimes,loseTimes)VALUES('$username','$password',0,0)";
if(mysql_query($sql,$conn)){
	
    exit('用户注册成功！点击此处 <a href="login.html">登录</a>');
} else {
	
    echo '抱歉！添加数据失败：'.mysql_error().'<br />';
    echo '点击此处 <a href="javascript:history.back(-1);">返回</a> 重试';
}

?>
</body>
</html>