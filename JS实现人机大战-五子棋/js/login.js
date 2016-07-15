// JavaScript Document
angular.module("MyApp",[])
	.controller('signUpController',function($scope){
		$scope.userdata={};
		/*Submit button*/
		$scope.submitForm=function(){
		$http({
        method  : 'POST',
        url     : 'test.php',
        data    : $.param($scope.userdata),  // pass in data as strings
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
    	})
        .success(function(data) {
            console.log(data);
            if (!data.success) {
                // if not successful, bind errors to error variables
                $scope.errorName = data.errors.name;
               // $scope.errorSuperhero = data.errors.superheroAlias;
            } else {
                // if successful, bind success message to message
                $scope.message = data.message;
            }
        });	
			
		}
		
		/*Reset button*/
		 $scope.reset = function(){
         $scope.username = "";
         $scope.password = "";
         $scope.passwordCom = "";
  		}   
		$scope.reset();
		
	})
		
	.directive('compare',function(){
		var o={};
		o.strict='AE';
		o.scope={
			orgText:'=compare'
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
		
		
