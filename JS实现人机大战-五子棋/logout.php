<?php
//logout.php退出程序
//启动session并清除其中的用户信息
session_start();
unset($_SESSION['username']);
//退出成功，自动跳转到登录页面
echo "注销成功，请重新登录";
header('Location:login.php');
exit;
?>