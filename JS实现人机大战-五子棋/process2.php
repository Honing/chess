<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>无标题文档</title>
</head>

<body>
<?php


//注销登录
/*if($_GET['action'] == "logout"){
    unset($_SESSION['userid']);
    unset($_SESSION['username']);
    echo '注销登录成功！点击此处 <a href="login.html">登录</a>';
    exit;
}*/

//登录
if(!isset($_POST['submit'])){
    exit('非法访问!');
}
$username = htmlspecialchars($_POST['loginUsername']);
$password = $_POST['loginPassword'];

//包含数据库连接文件
include('conn.php');
//检测用户名及密码是否正确
$check_query = mysql_query("SELECT * FROM user_db WHERE username='$username' and password='$password' 
limit 1");
if($result = mysql_fetch_array($check_query)){
    //登录成功
	session_start();
    $_SESSION['username'] = $username;
	//$_SESSION['userid'] = $result['uid'];
    echo $username,', 欢迎你！点击此处进入 <a href="index.html">人机五子棋大战</a><br />';
    /*echo '点击此处 <a href="logout.php">注销</a> 登录！<br />';*/
    exit;
} else {

    exit('密码错误，登录失败！点击此处 <a href="javascript:history.back(-1);">返回</a> 重试');
}
?>
</body>
</html>