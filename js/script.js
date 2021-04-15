
let map;
let directionsService;
let directionsRenderer;
let geocoder;
let infoWindow;
let markers = [];
let centerLatLng = { lat: 43.2464343, lng: -79.8618984 };
let selectedFilter = "All";
let selectedFilter_SEARCH="All";
let userLocation;
let dataList=[];
let currentObject;
let searchResults=[];



// map initialization
// every map object is created after map is initialized
function initMap() {
    // direction service object
    directionsService = new google.maps.DirectionsService();
    // direction making object(on map)
    directionsRenderer = new google.maps.DirectionsRenderer();
    // string address to map address object
    geocoder = new google.maps.Geocoder();
    //infobox object
    infoWindow = new google.maps.InfoWindow();
    // map object
    // map creation and intialization
    map = new google.maps.Map(document.getElementById("map"), {
        // adjusting zoom level
        zoom: 13,
        // default center point of map(Hamilton ,Ontario ,Canada)
        center: centerLatLng,
        // deleting top-left map control
        mapTypeControl: false,
        // deleting full screen control
        fullscreenControl: false,

    });




    // testing
    let test;
    // test= data;
    // it will return an array of one element
    // test = data.filter((val, idx, array) => {
    //     return val.name == "Beaches";
    // });
    // features has lat long data
    // test=test[0].features;
    // test=test.filter((val,idx,array)=>{
    //     return val.properties.OBJECTID==1;
    // });
    // test=test[0];
    // console.log(test);


    // let temp=[];
    // results=data;
    // results.forEach((val, idx, array) => {
    //     (val.features).forEach((feature)=>{
    //         temp.push(feature.properties);
    //     });
    // });
    // results=temp;
    // console.log(results);

    // test end

    // test=[
    //     {
    //         "name":'name1',
    //         "id":1
    //     },
    //     {
    //         "name":'name2',
    //         "id":2
    //     },
    //     {
    //         "name":'name3',
    //         "id":3
    //     },
    //     {
    //         "name":'name4',
            
    //     },
    // ]
    // let val=4;
    // console.log(test);
    // test.forEach((value)=>{

    //     value.categories='big'
    //     if(value.id==undefined){
    //         value.id=val;
    //     }
    // });



    // console.log(test);




    // to mark on console whenever map size is changed by user
    google.maps.event.addListener(map, 'bounds_changed', function(evt) {
        console.log('Bounds changed!');
    });


    // calling functions to setup custom markers , events, and ask and detect userlocation.
    convertTojs(dataList);
    setupMarkers();
    setupEvents();
    detectUserLocation();
    console.log(dataList);
    
    




}
// map intialization finished

//debug



//Convert Geojason to objects
function convertTojs(dataList){

    let data_copy=data;
    let count=0;
    data_copy.forEach((value)=>{
        let category=value.name;
        console.log(category);
        value.features.forEach((feature)=>{
            let object=feature.properties;
            let flag=true;
            
            // check if the lat or lng is availaible if not then generate one using geocoding(was not able to add restraunts as QPD restricts geocoding queries)
            if(object.LONGITUDE!=undefined&&object.LATITUDE!=undefined){
                object.CATEGORY=category;
                object.LONGITUDE=parseFloat(object.LONGITUDE);
                object.LATITUDE=parseFloat(object.LATITUDE);
                

            }else{
                geocoder.geocode({ address: object.ADDRESS }, (results, status) => {
                    if (status === "OK") {
                
                        // map.setCenter(results[0].geometry.location);
                        // console.log(results[0].geometry.location);
                     
                        object.LATITUDE=results[0].geometry.location.lat();
                        object.LONGITUDE=results[0].geometry.location.lng();
                       
                    } else {
                        console.log("Geocode was not successful for the following reason: " + status);
                        flag=false;
                    }
                
                });

                
    
            }
            if(flag){
                object.OBJECTID=count;
                //console.log(object)
                dataList.push(object);
                count++;
            }
        });

        

    });
    //console.log(dataList);
}



// function to set up various functionality! 
function setupEvents() {

    // search bar code block
    $(".default_option").click(function(){
        $(".dropdown ul").addClass("active");
        
      });
      
    $(".dropdown ul li").click(function(){
        let content = $(this).html();
        $(".default_option").html(content);
        $(".dropdown ul").removeClass("active");
    });

    // searching data and displaying on search bar
    $("#search-bar-input").keyup(function(evt){
        selectedFilter_SEARCH=$(".default_option>label>input").attr("value");
        console.log(selectedFilter_SEARCH);
        //console.log(selectedFilter_SEARCH);
        let key_input=evt.target.value.toLowerCase();
        let $container = $('.search-result-container');
        $container.html("");
        let resultCount=0;
        let results=[];
        dataList.forEach((object)=>{
            if(selectedFilter_SEARCH!="All"){
                if(selectedFilter_SEARCH==object.CATEGORY){
                    if((object.NAME.toLowerCase()).includes(key_input)||(object.ADDRESS.toLowerCase()).includes(key_input)){
                        results.push(object);
                        resultCount++;
                    }
                }
            }else{
                if((object.NAME.toLowerCase()).includes(key_input)||(object.ADDRESS.toLowerCase()).includes(key_input)){
                    results.push(object);
                    resultCount++;
                }
            }
        });

        if(resultCount<=5){
            results=results.slice(0,resultCount);
        }else{
            results=results.slice(0,5);
        }
        console.log(results);

        
        
        
        results.forEach((result)=>{
            let $rowTemplate = $('.row-template');
            let $rowClone = $rowTemplate.clone();
            $rowClone.removeClass('d-none row-template');

            $rowClone.find('.name-result-label').html(result.NAME);
           

            $rowClone.appendTo($container);


        });

        searchResults=results;

        if(key_input==""){
            $container.html("");
            searchResults=[];
            
        }




        // clicking search result
        $('.search-result').click(function(evt){
            let name=$(this).text();
            let resultObject;
            name=name.toLowerCase();
            name=name.trim();
            searchResults.forEach((object)=>{
                if(name===((object.NAME).toLowerCase()).trim()){
                    resultObject=object;
                }
            });
            console.log(name);
            let lng=resultObject.LONGITUDE;
            let lat = resultObject.LATITUDE;
           
            
            currentObject=resultObject;
            setMarker(resultObject);
            console.log(currentObject);
            


        });
        
        
      });


      



        
 

      


    

    
    

    // finding directions in the info box button directions and displaying it onto the display menu
    // #info window direction button exists in the form of content of infobox string
    $(document).on('click', '#infowindow-directions-button', function(evt) {
        //  Capture the location's lat/lng from the element's data attributes
        //just location in lat and lang
        let location = { lat: $(evt.target).data('lat'), lng: $(evt.target).data('lng') };

        //  Get directions from the selected marker
        // displaying directions
        getAndDisplayDirections(location);

        //  Prevents the form from being submitted
        //  https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
        evt.preventDefault();
        return false;
    });
    $(document).on('click', '#infowindow-review-button', function(evt) {
        //  Capture the obj
        let objectId=$(evt.target).data('objid');
        console.log(objectId);
        dataList.forEach((val)=>{
            if(objectId==val.OBJECTID){
                currentObject=val;
            }
        });
        console.log(currentObject);
        

       

        //  Prevents the form from being submitted
        //  https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
        evt.preventDefault();
        //return false;
    });






    //  Closing the directions panel, clearing directions when clicked on either on close button or clear directions
    $(document).on('click', '#map-directions-clear-button, #directions-close-button', function(evt) {
        clearDirections();

        //  Prevents the form from being submitted
        evt.preventDefault();
        return false;
    });






    //  User clicks "Directions" button on bottom
    // geo coding, converting letters into co-ordinates
    $(document).on('click', '#directions-from-button', function(evt) {
        // could add error code if fields are empty

        // getting values from the fields
        let directionsName = $('#directions-from-name').val();
        let directionsAddress = $('#directions-from-address').val();


        // alerting user that an address is needed
        if(directionsAddress==""||directionsAddress==null)
        {
            alert("Please type an address first!");
        }else{

            // displaying directions on the direction panel(overloading)
            getAndDisplayDirections(directionsAddress);

            geocoder.geocode({ address: directionsAddress }, (results, status) => {
                if (status === "OK") {
                // if geo coding works in displaying direction panel then change the center of the map
                    map.setCenter(results[0].geometry.location);
                    console.log(results[0].geometry.location);
                    console.log(results[0].geometry.location.lat());
                    console.log(results[0].geometry.location.lng());
                   
                } else {
                    console.log("Geocode was not successful for the following reason: " + status);
                }
            });

        }

        

        //  Prevents the form from being submitted
        evt.preventDefault();
        return false;
    });



    //  Selecting a filter
    $('#map-filters input[type=radio]').on('change', function(evt) {
        //imp
        selectedFilter = evt.target.value;

        clearDirections();
        
        //  We should re-draw the markers with the new filter value
        setupMarkers();
    });
    $('#search-filters input[type=hidden]').on('change', function(evt) {
        //imp
        selectedFilter_SEARCH = evt.target.value;
       
        clearDirections();
        
        //  We should re-draw the markers with the new filter value
        setupMarkers();
    });

    
}








// getting coordinates or address and displaying results

function getAndDisplayDirections(destination) {
    //  Clear all the markers first
    clearMarkers();

    //  Set the directions renderer to use the map and panel
    // to let renderer draw on map
    directionsRenderer.setMap(map);
    // to let renderer put directions in the direction hud
    directionsRenderer.setPanel(document.getElementById('map-directions-content'));

    //  Construct our request for the directions (coordinates or address)
    let request = {
        origin: userLocation,
        destination: destination,
        travelMode: 'DRIVING'
    };

    // passing the request
    directionsService.route(request, function(response, status) {
        if (status == 'OK') {
            //  Set the directions panel as the place to insert the directions
            directionsRenderer.setDirections(response);
            
            // Open the panel
            $('body').addClass('directions-open');
        }
    });
}





// error box code clock
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    //  Handle errors with location
    // if else 
    let errorMessage = browserHasGeolocation ? "Error: The Geolocation service failed." : "Error: Your browser doesn't support geolocation.";
    infoWindow.setPosition(pos);
    infoWindow.setContent(errorMessage);
    infoWindow.open(map);

    $('#geolocation-message .modal-body p').text(errorMessage);
    // showing error message
    $('#geolocation-message').modal('show');
}




function setMarker(object){
    let marker;
    clearMarkers();
    let val=object;
    let latLng = { lat: val.LATITUDE, lng: val.LONGITUDE };
    let infoWindowContentUserLocation = `
        <h6>${val.NAME}</h6>
        <p>${val.ADDRESS},</p>
        <input type='hidden' id='infowindow-location-name' value=${val.NAME}>
        <input type='hidden' id='infowindow-location-address' value=${val.ADDRESS}>
        <input type='hidden' id='infowindow-location-id' value=${val.OBJECTID}>
        <input type='hidden' id='infowindow-location-lng' value=${val.LONGITUDE}>
        <input type='hidden' id='infowindow-location-lat' value=${val.LATITUDE}>
        <button type="button" class="btn btn-sm" id="infowindow-directions-button" data-lat="${val.LATITUDE}" data-lng="${val.LONGITUDE}">Directions</button>
        
        
    `;
    let infoWindowContentNoLocation = `
        <h6>${val.NAME}</h6>
        <p>...</p>
    `;

    
    // setting up markers

    marker = new google.maps.Marker({
        position: latLng,
        map: map,
        //icon: `icon-${val.CATEGORY}.png`,
        title: val.NAME,
    });

    // setting infowindow associated with each marker
    google.maps.event.addListener(marker, 'click', function () {
        infoWindow.setContent(userLocation ? infoWindowContentUserLocation : infoWindowContentNoLocation);
        infoWindow.open(map, this);
    });

    //pushing the marker into the map
    markers.push(marker);

    centerMap();
}





// seeting up all markers
function setupMarkers() {
    let marker;
    let results;
    let temp=[];
    let count=0;
    let BreakException = {};
    clearMarkers();
    // selecting each marker by category
    // data is a geojason data file so we have to extract features within each object
    if(selectedFilter !== "All") {
        //  If "All" isn't selected, then filter by CATEGORY
        //  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter

        count=0;
        results = dataList.filter((val, idx, array) => {
            
                return val.CATEGORY == selectedFilter;
            
            
            
        });
       
       
    } else {
        //  Otherwise, show everything
        // combining all categories into one but including 10 places each to avoid overcrowding
       
        results=dataList;
        
       
        
        
    }

    //console.log(results);
    
    //  Loop through each institution and add the marker for it
    results.forEach((val, idx, array) => {
       


        let latLng = { lat: val.LATITUDE, lng: val.LONGITUDE };
        let infoWindowContentUserLocation = `
            <h6>${val.NAME}</h6>
            <p>${val.ADDRESS},</p>
            <input type='hidden' id='infowindow-location-name' value=${val.NAME}>
            <input type='hidden' id='infowindow-location-address' value=${val.ADDRESS}>
            <input type='hidden' id='infowindow-location-id' value=${val.OBJECTID}>
            <input type='hidden' id='infowindow-location-lng' value=${val.LONGITUDE}>
            <input type='hidden' id='infowindow-location-lat' value=${val.LATITUDE}>
            <button type="button" class="btn btn-sm" id="infowindow-directions-button" data-lat="${val.LATITUDE}" data-lng="${val.LONGITUDE}">Directions</button>
            <button type="button" class="btn btn-sm" id="infowindow-review-button"  data-objid=${val.OBJECTID}>Get Reviews</button>
            
        `;
        let infoWindowContentNoLocation = `
            <h6>${val.NAME}</h6>
            <p>...</p>
        `;

        // setting up markers


        marker = new google.maps.Marker({
            position: latLng,
            map: map,
            //icon: `icon-${val.CATEGORY}.png`,
            title: val.NAME,
        });

        // setting infowindow associated with each marker
        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.setContent(userLocation ? infoWindowContentUserLocation : infoWindowContentNoLocation);
            infoWindow.open(map, this);
        });

        //pushing the marker into the map
        markers.push(marker);
        
    });

    centerMap();
}



function centerMap() {
    let bounds = new google.maps.LatLngBounds();
    // extending the map so that all markers got onto the map
    markers.forEach((marker) => {
        let markerLatLng = { lat: marker.getPosition().lat(), lng: marker.getPosition().lng() };
        bounds.extend(markerLatLng);
    });

    map.fitBounds(bounds);
    // centering the map
    map.setCenter(bounds.getCenter());
}

// clearing each marker from the map
function clearMarkers() {
    markers.forEach((marker, idx, array) => {
        marker.setMap(null);
    });
}

// resetting the map values and direction panels
function clearDirections() {
    $('#map-directions-content').html('');
    $('#directions-from-name').val('');
    $('#directions-from-address').val('');

    //  Close the actual panel
    $('body').removeClass('directions-open');
    // emptying direction rederer
    directionsRenderer.setMap(null);
    directionsRenderer.setPanel(null);

    setupMarkers();
}
        