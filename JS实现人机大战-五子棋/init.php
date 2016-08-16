<?php
//init.php 初始化文件
//启动session并判断其中的用户信息
session_start();
//如果没有用户登录，重定向到登录页面
if(!isset($_SESSION['username'])){
	header('Location:login.php');
	}
//停止脚本文件继续执行
exit;
?>