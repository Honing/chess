// JavaScript Document
// JavaScript Document
angular.module("MyApp",[])
	.controller('signUpController',function($scope){
		$scope.userdata={};
		/*Submit button*/
		$scope.submitForm=function(){
		$http({
        method  : 'POST',
        url     : 'login2.php',
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
         $scope.userdata={};
  		}   
		$scope.reset();
		
	})
		
	