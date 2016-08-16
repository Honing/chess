// JavaScript Document
angular.module("MyAppLogin",[])
	.controller('loginController',function($scope){
		$scope.loginUserdata={};
		
		})
	.directive('reset',function($scope){
		$scope.loginUserdata={};
		})