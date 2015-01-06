(function($){
	'use strict';

	function calculateClinicianDistance(client, clinician){
		var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
		{
			origins: [client],
			destinations: [clinician],
			travelMode: google.maps.TravelMode.DRIVING,
			unitSystem: google.maps.UnitSystem.IMPERIAL,
			durationInTraffic: false,
			avoidHighways: false,
			avoidTolls: false
		}, callback);

		function callback(response, status) {
		 	if (status == google.maps.DistanceMatrixStatus.OK) {
		    	var origins = response.originAddresses;
		    	var destinations = response.destinationAddresses;

		    	for (var i = 0; i < origins.length; i++) {
		      		var results = response.rows[i].elements;
		      		for (var j = 0; j < results.length; j++) {
		        		var element = results[j];
		        		var distance = element.distance.text;
		        		var duration = element.duration.text;
		        		var from = origins[i];
		        		var to = destinations[j];
		      		}
		    	}
		  	}
		  	console.log("distance: " + distance);
		  	$('#resultText').text(distance);
		}
	}

	function handleClientFormSubmission(event) {
		event.preventDefault();

		var $form = $(this);
        console.log("Client Form submitted!");
        var testClinician = "4800 University Dr, Durham, NC";

        var address = $("#clientForm input[id='streetAddress']").val();
        var city = $("#clientForm input[id='city']").val();
        var state = $("#clientForm select[id='state']").val();
        var zip = $("#clientForm input[id='zipCode']").val();
        var clientLocation = address + ", " + city + ", " + state + ", " + zip;

        console.log("client address: " + clientLocation);

        calculateClinicianDistance(clientLocation, testClinician);
    }

	$(document).ready(function(){
		$('#clientForm').on('submit', handleClientFormSubmission);
	});

}(jQuery));