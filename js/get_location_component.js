// getting user location using prompt on browser window
function detectUserLocation() {
    // if user press yes
    if(navigator.geolocation) {
        //  Get the user's location using the browser's Geolocation API
        navigator.geolocation.getCurrentPosition(
            //  Success
            (position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };

                //  Set user location for rest of application
                userLocation = pos;

                //  We now have the location, let's set it on the map and populate the infoWindow
                // you are here info box
                infoWindow.setPosition(pos);

                geocoder.geocode({ 'latLng': pos }, function (results, status) {
                    
                // reverse geocoding to get the address of user    
                // This is checking to see if the Geoeode Status is OK before proceeding
                    if (status == google.maps.GeocoderStatus.OK) {
                        infoWindow.setContent(`
                        <strong>You are here</strong><br>
                        <p>${results[0].formatted_address}</p>
                        Latitude: ${pos.lat}<br>
                        Longitude: ${pos.lng}
                    `);
                        
                    }else{
                        infoWindow.setContent(`
                        <strong>You are here</strong><br>
                        
                        Latitude: ${pos.lat}<br>
                        Longitude: ${pos.lng}
                    `);
                    }
                });

                
                infoWindow.setContent(`
                    <strong>You are here</strong><br>
                    Latitude: ${pos.lat}<br>
                    Longitude: ${pos.lng}
                `);
                //opening infobox
                infoWindow.open(map);

                //  Center the map to the user's position
                map.setCenter(pos);
            },
            //  Failure
            () => {
                //  Couldn't get the user's location for some reason.
                // error box on the screen
                handleLocationError(true, infoWindow, map.getCenter());
            }
        );
        //user presses no
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}