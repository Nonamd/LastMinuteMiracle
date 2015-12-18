'use strict';

app.controller('AuthController', function($scope, $location, Auth, toaster) {

	if(Auth.user.provider) {
    $location.path('/');
  }

	$scope.register = function(user) {
		Auth.register(user).then(function() {
			toaster.pop("success", "Registered Successfully!");
			// console.log("Register successfully!");
			$location.path('/dashboard');
		}, function(err) {
			toaster.pop("error",'Oops, Something went wrong!');
			// console.log("Error...");
		});
	};

	$scope.login = function(user) {
		Auth.login(user)
		.then(function() {
			toaster.pop("Logged in Successfully!");
			// console.log("Logged in successfully!");
			$location.path('/dashboard');
		}, function(err) {
			toaster.pop("error",'Oops, Something went wrong!');
			// console.log("Error...");
		});
	};


	$scope.changePassword = function(user) {
		Auth.changePassword(user)
		.then(function() {

			// Reset form
			$scope.user.email = '';
			$scope.user.oldpass = '';
			$scope.user.newpass = '';


			toaster.pop("success", "Password Changed Successfully!");
			// console.log("Password changed successfully!");
		}, function(err) {
			toaster.pop("error",'Oops, Something went wrong!');
			// console.log("Error...");

		});
	};
	
	function errMessage(err) {

    var msg = "Unknown Error...";

    if(err && err.code) {
      switch (err.code) {
        case "EMAIL_TAKEN": 
          msg = "This email has been taken"; break;          
        case "INVALID_EMAIL": 
          msg = "Invalid email"; break;          
        case "NETWORK_ERROR": 
          msg = "Network error"; break;          
        case "INVALID_PASSWORD": 
          msg = "Invalid password"; break;          
        case "INVALID_USER":
          msg = "Invalid user"; break;                  
      } 
    }   

    toaster.pop('error', msg);
  };

});