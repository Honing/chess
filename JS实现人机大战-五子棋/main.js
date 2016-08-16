// JavaScript Document
angular.module("MyApp",[])
	.controller('signUpController',function($scope){
		
		$scope.userdata={};
/*		$scope.submitForm=function(){
			$http({
        			method  : 'POST',
        			url     : 'process.php',
        			data    : $.param($scope.userdata),  // pass in data as strings
        			headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
   			 })
      .success(
			
			document.getElementById("message")=data.message;
			
			function(data, status, headers, config){
                console.log($scope.userdata);
				//alert("success");	
        })
		.error(function(data, status, headers, config){
                alert("error");
            })
			}*/
		})
	.directive('compare',function(){
		var o={};
		o.strict='AE';
		o.scope={
			orgText:"=compare"
			}
		o.require='ngModel';
		o.link=function(sco,ele,att,con){
			con.$validators.compare=function(v){
				return v==sco.orgText;
				}
			sco.$watch('orgText',function(){
				con.$validate();
				});
			}
		return o;
		})
	.directive('reset',function($scope){
		$scope.userdata={};
		})