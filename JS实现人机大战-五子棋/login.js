// JavaScript Document
angular.module("MyApp",[])
	.controller('loginController',function($scope){
		
		$scope.userdata={};
		$scope.submitForm=function(){
			console.log($scope.userdata);
			}
		$scope.clear=function(){$scope.userdata={};}
		})
		