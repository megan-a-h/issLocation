"use strict";


$(document).ready(function(){
	//coordDisplay is the id of the heading where the longitutde and latitude will display
	//longitude and latitude variables will hold the coordinates of the International Space Station
	var $coordDisplay = $('#coordDisplay');
	var longitude;
	var latitude;

	//places map into the map div fully zoomed out and so it keeps position as pins are placed on the map
	var map = L.map('mapDiv').setView([0, 0], 1);
		L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
			maxZoom: 18,
		  }).addTo(map);
		
		//click event for the current location buttion to display the latitude and longitude of the space station	
		$('#spaceStation').click(function(){
		
			//removes previous coordinates from display so new coordinates can appear
			$coordDisplay.empty();

			
			//use ajax to return the longitude and latitude
			$.ajax({
				type: 'GET',
				url: 'http://api.open-notify.org/iss-now.json',

				//if communicaion with API is successful the function below will run
				success: function(data){
					//gets the longitude and latitude from the api and places them in the variables created above
					longitude = data.iss_position.longitude;
					latitude = data.iss_position.latitude;

					//appends the longitude and latitude to the coorDisplay header
					$coordDisplay.append('<h4>Longitude:' + longitude + '</h4>' + '<h4>Latitude: ' + latitude+ '</h4>');
				
					//place marker on map for current coordinates
					var marker = L.marker([latitude, longitude]).addTo(map);
				},
				//error message if API cannot be reached
				error: function(xhr, status, error){
					$coordDisplay.append('<p>  There has been a retrieval error. <br> Check connection. </p>')
				

				}
			
			});

	

		
			
		});

		
	

	
	
			
				
			
	});