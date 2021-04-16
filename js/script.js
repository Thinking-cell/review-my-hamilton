
let map;
let directionsService;
let directionsRenderer;
let geocoder;
let infoWindow;
let markers = [];
let centerLatLng = { lat: 43.2464343, lng: -79.8618984 };
let selectedFilter = "Top";
let selectedFilter_SEARCH="All";
let userLocation;
let currentReviews=[];
const dataList=[];
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
    $('#loading-warning').css('display','block');
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
    $('#Spinner').css('display','none');
    //console.log(dataList);
}



// function to set up various functionality! 
function setupEvents() {

    //focused page
    $("#map-filters").focus();

    // review box component 
    textAreaComponent();
    
    // getting paged table
    getPagination('#table-id');
    
    // activating search bar feature
    activateSearchbar(selectedFilter_SEARCH,dataList);






    $(".user-review-post").click(function(){

        let userEmail=$("#user_email_input").val();
        let userReview=$("#user_review_input").val();
        let userRating=$("#user_rating_input").val();
        let $errorBox=$(".errorBox");
        console.log(userEmail);
        console.log(userRating);
        console.log(userReview);
        if(currentObject==undefined||currentObject===null){
            alert("No Location Selected!")
        }else{
            console.log("review init");
            if(userEmail===""||userEmail===null){
                $errorBox.html("Email cannot be Empty!")
            }else if(!validateEmail(userEmail)){
                $errorBox.html("Email syntax is incorrect!")
            }else if(userRating===null||userRating===""||userRating===0){
                alert("Page has been modified Illegaly, Now Refreshing!")
                location.reload();
            }else if(userReview===""||userReview===null){
                $errorBox.html("Review cannot be Empty!")
            }else{
                $errorBox.html("");
                let object=currentObject;
                let url = "./php/updateReviews.php?location_name="+object.NAME+"&location_address="+object.ADDRESS+"&location_id="+object.OBJECTID+"&user_email="+userEmail+"&review="+userReview+"&rating="+userRating;
                

                console.log(url); // debug

                // do the fetch
                fetch(url, { credentials: 'include' })
                    .then(response => response.json())
                    .then(function(result){
                        console.log(result);
                        if(result===0){
                           
                            
                            for(let i=0;i<currentReviews.length;i++){
                                //console.log(result[i].OBJECTID);
                                if(currentObject.OBJECTID==currentReviews[i].OBJECTID&&userEmail.toLowerCase()===currentReviews[i].user_email.toLowerCase()){
                                    console.log(currentReviews[i]);
                                    currentReviews[i].review=userReview;
                                    
                                }
                            }
                            let $container=$(".review-container");
                            $container.html("");
                            for(let i=0;i<currentReviews.length;i++){

                                let $rowTemplate = $('.review-row-template');
                                let $rowClone = $rowTemplate.clone();
                                $rowClone.removeClass('d-none review-row-template');
        
                                console.log(currentReviews[i].user_email);
                                console.log(currentReviews[i].review);
                                $rowClone.find('.user_email').html(currentReviews[i].user_email);
                                $rowClone.find('.user_review').html(currentReviews[i].review);
                                $rowClone.find('.user_rating').html(currentReviews[i].rating);
                            
        
                                $rowClone.appendTo($container);
                                console.log("Updated")

                                
                            }
                            
                        }else if(result===1){

                            currentReviews.push({
                                "OBJECTID": currentObject.OBJECTID,
                                "rating": userRating,
                                "review": userReview,
                                "user_email": userEmail
                            });
                            let $container=$(".review-container");
                            $container.html("");
                            for(let i=0;i<currentReviews.length;i++){

                                let $rowTemplate = $('.review-row-template');
                                let $rowClone = $rowTemplate.clone();
                                $rowClone.removeClass('d-none review-row-template');
        
                                console.log(currentReviews[i].user_email);
                                console.log(currentReviews[i].review);
                                $rowClone.find('.user_email').html(currentReviews[i].user_email);
                                $rowClone.find('.user_review').html(currentReviews[i].review);
                                $rowClone.find('.user_rating').html(currentReviews[i].rating);
                            
        
                                $rowClone.appendTo($container);
                                console.log("Updated")

                                
                            }
                            

                        }else{
                            alert("ERROR: NEGATIVE SERVER RESPONSE("+result+") \n Report: Server detected Illegal Values! \n Response: Reloading Now.")
                            location.reload();
                        }

                        

                    });

            }
        }


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


    // get review
    $(document).on('click', '#infowindow-review-button', function(evt) {
        //  Capture the obj
        let objectId=$(evt.target).data('objid');
        console.log(objectId);
        dataList.forEach((val)=>{
            if(objectId==val.OBJECTID){
                currentObject=val;
            }
        });
        currentReviews=[];
        console.log(currentObject);
        getReviews(currentObject);

        $([document.documentElement, document.body]).animate({
            scrollTop: $(".review-container").offset().top
        }, 1000);
        

       

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

function validateEmail(email) {
    let emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if( !emailReg.test( email ) ) {
        return false;
    } else {
        return true;
    }
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

    clearMarkers();
    generateMarker(object);
    centerMap();
}

function generateMarker(object){
    let marker;
    
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
        <button type="button" class="btn btn-primary btn-sm " id="infowindow-directions-button" data-lat="${val.LATITUDE}" data-lng="${val.LONGITUDE}">Directions <i class="fas fa-car"></i></button>
        <button type="button" class="btn btn-info btn-sm" id="infowindow-review-button" data-objid="${val.OBJECTID}">Reviews <i class="fas fa-heart"></i></button>
        
        
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
}


function generateMarkers(results){
    let marker;
    //  Loop through each institution and add the marker for it
    results.forEach((val, idx, array) => {
       


       generateMarker(val);
        
    });

    centerMap();

 
}


// get reviews from AJAX call
function getReviews(object){
    let url = "./php/getReviews.php?objid="+object.OBJECTID;
       

    console.log(url); // debug

    // do the fetch
    fetch(url, { credentials: 'include' })
        .then(response => response.json())
        .then(function(result){
            console.log(result);
            let $container=$(".review-container");
            $container.html("");
            $(".review-location").html(object.NAME);

            if(result.length===0){
                console.log("no reviews")
                let $rowTemplate = $('.review-row-template');
                let $rowClone = $rowTemplate.clone();
                $rowClone.removeClass('d-none review-row-template');

                $rowClone.find('.user_review').html("<h3 style='text-align: left;'>It seems there are no Reviews for this place for now!</h3><p>Be the first to review this place, Give your Review! </p>");
                $rowClone.find('.user_rating').html("No Ratings");
                $rowClone.find('.user_email').html("Uh-Oh!");
            

                $rowClone.appendTo($container);
                console.log("appended")

            }else{
                currentReviews=result;
                console.log("loading reviews");
                for(let i=0;i<result.length;i++){
                    console.log(result[i].OBJECTID);
                    if(object.OBJECTID==result[i].OBJECTID){
                        console.log("authenication success");
                        let $rowTemplate = $('.review-row-template');
                        let $rowClone = $rowTemplate.clone();
                        $rowClone.removeClass('d-none review-row-template');

                        console.log(result[i].user_email);
                        console.log(result[i].review);
                        $rowClone.find('.user_email').html(result[i].user_email);
                        $rowClone.find('.user_review').html(result[i].review);
                        $rowClone.find('.user_rating').html(result[i].rating);
                    

                        $rowClone.appendTo($container);
                        console.log("appended")
                    }
                }
     

            }
           
            
        });

}




// seeting up all markers
function setupMarkers() {
    
    let results;
    let isAJAX=false;
    let count=0;
    let BreakException = {};
    clearMarkers();
    // selecting each marker by category
    // data is a geojason data file so we have to extract features within each object
    if(selectedFilter !== "All"&&selectedFilter !=="Top") {
        //  If "All" isn't selected, then filter by CATEGORY
        //  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter

        count=0;
        results = dataList.filter((val, idx, array) => {
            
                return val.CATEGORY == selectedFilter;
            
            
            
        });
        console.log("CATEGORY SELECT ");
       
       
    } else if(selectedFilter==="All") {
        //  Otherwise, show everything
        // combining all categories into one but including 10 places each to avoid overcrowding
        console.log("ALL HERE");
        results=dataList;
        
       
        
        
    }else{
       
        console.log("AJAX call here and run");
        let url = "./php/getPopular.php";
       

        console.log(url); // debug

        // do the fetch
        fetch(url, { credentials: 'include' })
            .then(response => response.json())
            .then(function(result){
                console.log(result);
                let results=[];
               
                for(let i = 0; i < result.length; i++){
                    //console.log(result[i]+" "+i);
                    dataList.forEach((obj)=>{
                        if(parseInt(obj.OBJECTID)===parseInt(result[i])){
                            results.push(obj);
                            
                            
                            //console.log(obj)
                        }
                    });
                }

                generateMarkers(results);
            });

            isAJAX=true;
        

        
    }

    //console.log(results);
    if(!isAJAX){
        generateMarkers(results);
    }
    
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
      


