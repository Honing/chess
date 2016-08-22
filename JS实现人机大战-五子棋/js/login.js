/************人机大战之五子棋登陆页面 JavaScript Document  Wrote By XuYin,last edit: 20 August, 2016************/
angular.module("MyAppLogin",[])
	.controller('loginController',function($scope){
		$scope.loginUserdata={};
		
		})
	.directive('reset',function($scope){
		$scope.loginUserdata={};
		})
		