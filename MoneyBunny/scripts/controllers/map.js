'use strict';

app.controller('MapController', function($scope, $http) {

	// geocode a test address
	$http.get("http://maps.googleapis.com/maps/api/geocode/json?address=636 Shore Road, Sydney Mines, NS").then(function(result) {
		console.log(result);
        //alert(JSON.stringify(result));
        alert(result.data.results[0].geometry.location.lat);
        alert(result.data.results[0].geometry.location.lng);
    }, function(error) {
        alert("There was a problem.");
        alert(error);
    });
	
});