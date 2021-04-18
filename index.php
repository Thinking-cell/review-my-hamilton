<?php

/**
 *
 */

include "php/connect.php";


?>
<!DOCTYPE html>


<html>
     <!--

    ****************************************************************************
    * I, Ranvir Singh, 000819787 certify that this material is my original work. 
    * No other person's work has been used without due acknowledgement

    This app uses professor provided google API key which has geocoding disabled and therefore direction finding and conversion of some geojason files may not be possible
    however, everything else shold work just fine!
    ***************************************************************************


    Asynchronous calls gave me headaches!!
    -->

<head>
    <title>Review my Hamilton!</title>





    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>



    <!--Adding jquery functionality ,adding api key for google, adding json data, ????Bootstrap????customization-->
    <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
    <script src="https://maps.googleapis.com/maps/api/js?AIzaSyDoH3oyYR5nzERWlIBQ4XLVZLtm63ZoIzc&callback=initMap&libraries=&v=weekly" defer></script>
    
    <script src="js/data.js"></script>
    <script src="js/script.js"></script>
    <script src="js/get_location_component.js"></script>
    <script src="js/getPagination_component.js"></script>
    <script src="js/reviewBox_component.js"></script>
    <script src="js/searchBar_component.js"></script>
    <script src="https://kit.fontawesome.com/b99e675b6e.js"></script>

    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link rel="stylesheet" href='css/style.css' />

    <meta name="viewport" content="width=device-width, initial-scale=1">



</head>

<body>
<link href="https://fonts.googleapis.com/css2?family=Montserrat&family=Oswald:wght@400;600&display=swap" rel="stylesheet">

    <header>
    
    <div class="wrapper-cloud">
    <div class="cloud1">
        <div class="c1l"></div>
        <div class="c1r"></div>
        <div class="c1b"></div>
    </div>
    
    <div class="cloud2">
        <div class="c2l"></div>
        <div class="c2r"></div>
        <div class="c2b"></div>
    </div>
    <div class="cloud3">
        <div class="c3l"></div>
        <div class="c3r"></div>
        <div class="c3b"></div>
    </div>
    </div>
    <p>This app uses college provided google API key that has limited features, It has geocoding disabled and therefore direction finding and conversion of some geojason files may not be possible
    however, everything else should work just fine!</p>
    <h1 id="main-heading" style="text-align: center; margin-bottom:50px; color:#07537e;" class="strike">
    <span class="strike__inner">
      Review<br>
      My Hamilton!
    </span>
  </h1>
  
    </header>
    
    
    <div class="border-top border-info" style="border-width: 10px;" id="map"></div>

    <div id="hud">
        <form id="map-filters">
            <ul>
                <li>
                    <h5>Categories</h5>
                </li>

                <li><label for="Top"><input type="radio" value="Top" id="Top" name="map_filter" checked> Top 10</label></li>


                <li><label for="Beaches"><input type="radio" value="Beaches" id="Beaches" name="map_filter"> Beaches</label></li>



                <li><label for="Tourism_Points_of_Interest"><input type="radio" value="Tourism_Points_of_Interest" id="Tourism_Points_of_Interest" name="map_filter"> Tourism Points</label></li>

                <li><label for="City_Waterfalls"><input type="radio" value="City_Waterfalls" id="City_Waterfalls" name="map_filter"> Waterfalls</label></li>

                <li><label for="Campgrounds"><input type="radio" value="Campgrounds" id="Campgrounds" name="map_filter"> Campgrounds</label></li>

                <li><label for="Libraries"><input type="radio" value="Libraries" id="Libraries" name="map_filter"> Libraries</label></li>

                <li><label for="Arenas"><input type="radio" value="Arenas" id="Arenas" name="map_filter"> Arenas</label></li>

                <li><label for="Accommodations"><input type="radio" value="Accommodations" id="Accommodations" name="map_filter"> Accommodations</label></li>

                <li><label for="Public_Art_and_Monuments"><input type="radio" value="Public_Art_and_Monuments" id="Public_Art_and_Monuments" name="map_filter"> Art and Monuments</label></li>

                <li><label for="All"><input type="radio" value="All" id="All" name="map_filter"> All</label></li>
            </ul>
        </form>

        <form id="map-address" class="fluid-container">
            <h5 style="text-align: center;">Know The Place?</h5>
            <div class="row">

                <div class="col p-2">
                    <input type="text" id="directions-from-address" name="directions-from-address" class="form-control" placeholder="e.g. 123 Main Street East, Hamilton, Ontario">
                </div>
                <div class="col-3 p-2 d-grid gap-2 md-block">
                    <button type="button" class="btn btn-primary btn-block" id="directions-from-button">Get Directions</button>
                </div>
            </div>
        </form>

        <form id="map-directions">
            <div class="header">
                <h5>Directions</h5>
                <button type="button" class="close" id="directions-close-button" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>

            <div class="content" id="map-directions-content"></div>

            <div class="actions">
                <button type="button" class="btn btn-block btn-secondary" id="map-directions-clear-button">Clear Directions</button>
            </div>
        </form>

    </div>

    <div class="wrapper">
        <div class="search_box">
            <div class="dropdown">
                <div class="default_option"><label for="All"><input type="hidden" value="All" id="All-search_filter" name="search_filter"> All</label></div>
                <form id='search-filters'>
                    <ul>
                        <li><label for="All"><input type="hidden" value="All" id="All-search_filter" name="search_filter"> All</label></li>

                        <li><label for="Beaches"><input type="hidden" value="Beaches" id="Beaches-search_filter" name="search_filter"> Beaches</label></li>



                        <li><label for="Tourism_Points_of_Interest"><input type="hidden" value="Tourism_Points_of_Interest" id="Tourism_Points_of_Interest-search_filter" name="search_filter"> Tourism Points</label></li>

                        <li><label for="City_Waterfalls"><input type="hidden" value="City_Waterfalls" id="City_Waterfalls-search_filter" name="search_filter"> Waterfalls</label></li>

                        <li><label for="Campgrounds"><input type="hidden" value="Campgrounds" id="Campgrounds-search_filter" name="search_filter"> Campgrounds</label></li>

                        <li><label for="Libraries"><input type="hidden" value="Libraries" id="Libraries-search_filter" name="search_filter"> Libraries</label></li>

                        <li><label for="Arenas"><input type="hidden" value="Arenas" id="Arenas-search_filter" name="search_filter"> Arenas</label></li>

                        <li><label for="Accommodations"><input type="hidden" value="Accommodations" id="Accommodations-search_filter" name="search_filter"> Accommodations</label></li>

                        <li><label for="Public_Art_and_Monuments"><input type="hidden" value="Public_Art_and_Monuments" id="Public_Art_and_Monuments-search_filter" name="search_filter"> Art and Monuments</label></li>
                    </ul>
                </form>
            </div>
            <div class="search_field" >
                <input type="text" class="input " id='search-bar-input' placeholder="Find..." >
                <i class="fas fa-search" id="search-bar-button"></i>
                <div class="row">
                    <div class="container">

                        <table class="table-borderless table-hover rounded " style="background: #fff;width: 358px; margin-right: -10px; margin-top: 8px;">

                            <tr class='d-none row-template search-result'>

                                <td><label class='name-result-label m-2'> Name

                                    </label></td>


                            </tr>
                            <tbody class='search-result-container'>




                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    </div>


    <div id="loading-warning">
        <h4 id ="rd" class="d-flex justify-content-center  text-secondary">Loading Resources,<br><p style="text-align: center;">Please wait...<p></h4>
        
    </div>

    <div class="container my-4" id="review-main" style="background-color: #fff; border-radius:40px;">



        <table class="table  table-class review-table" id="table-id">

            <thead>
                <div class="row mb-4">
                    <h2 class="ribbon4 mt-4 ml-3">Reviews</h2>
                    <h2 class="ribbon1 mt-4 d-flex ml-auto mr-3 review-location">Select Some Place!</h2>
                </div>

            </thead>
            <tr>
            </tr>
            <tr class="review-row-template d-none border centering my-3">
                <td class="partial-border">
                    <div class="row">
                        <h4 style="text-align: left; " class="user_email ml-3 ">email</h4>
                        <h4 style="text-align: right;" class="d-flex ml-auto mr-4">Rating:</h4>
                        <h4 style="text-align: right;" class="user_rating mr-4">No Rating</h4>
                    </div>
                    
                    <p style="text-align: left;" class="user_review ">review</p>
                </td>

            </tr>
            <tbody style="font-size: 23px; " class="review-container">

                <tr class="centering">
                    <td class="parital-border">
                        
                        <h3 style="text-align: left;">Select some place to get reviews.</h3>
                    </td>

                </tr>




            </tbody>
        </table>

        <!--		Start Pagination -->
        <div class='pagination-container'>
            <nav>
                <ul class="pagination ">

                    <li data-page="prev" class="btn btn-primary m-1 ml-3">
                        <span>
                            < <span class="sr-only">(current)
                        </span></span>
                    </li>
                    <!--	Here the JS Function Will Add the Rows -->
                    <li data-page="next" id="prev" class="btn btn-primary m-1">
                        <span> > <span class="sr-only">(current)</span></span>
                    </li>
                    <p class="d-flex ml-auto mr-4 mt-1">Reviews/Page:</p>
                    <div class="form-group " style="width: 90px;">
                        <!--		Show Numbers Of Rows 		-->

                        <select class="form-control" name="state" id="maxRows">
                            <option value="5000">Show ALL Reviews</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                            <option value="70">70</option>
                            <option value="100">100</option>
                        </select>

                    </div>
                </ul>

            </nav>
        </div>
        <hr>
        <h2 class="text-secondary">Post a Review</h2>

        <form class="form-horizontal">
            <div class="form-group">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text">Email</span>
                    </div>
                    <input type="email" class="form-control" id="user_email_input" placeholder="example@sampel.com" name="Email:">
                    <p class="d-flex ml-auto mr-1 mt-1 pl-2">Rate:</p>
                    <div class="form-group " style="width: 90px; ">
                        <!--		Show Numbers Of Rows 		-->

                        <select class="form-control"  name="state" id="user_rating_input">
                            <option value="5">5</option>
                            <option value="4">4</option>
                            <option value="3">3</option>
                            <option value="2">2</option>
                            <option value="1">1</option>
                            
                            
                            
                            
                            
                        </select>

                    </div>
                </div>

            </div>
            <div class="form-group">


                <textarea class="form-control status-box" id="user_review_input" name="user_review_input" rows="4" cols="50" placeholder="Add Review..."></textarea>


            </div>

           

        </form>
        <div class="button-group pull-right row ml-4">
            <p class="errorBox ml-5 text-danger"></p>
            <p class="counter text-muted  d-flex ml-auto mt-1">2000</p>
            <button class="btn btn-primary mr-5 user-review-post">Post</button>
        </div>

    </div>






    <!--To print the error message-->
    <div class="modal" tabindex="-1" id="geolocation-message">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Geolocation Error</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <!--Target div-->
                <div class="modal-body">
                    <p></p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>


    
    <footer>
    <svg viewBox="0 0 120 28">
    <defs> 
    <mask id="xxx">
        <circle cx="7" cy="12" r="40" fill="#fff" />
    </mask>
    
    <filter id="goo">
        <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
        <feColorMatrix in="blur" mode="matrix" values="
            1 0 0 0 0  
            0 1 0 0 0  
            0 0 1 0 0  
            0 0 0 13 -9" result="goo" />
        <feBlend in="SourceGraphic" in2="goo" />
        </filter>
        <path id="wave" d="M 0,10 C 30,10 30,15 60,15 90,15 90,10 120,10 150,10 150,15 180,15 210,15 210,10 240,10 v 28 h -240 z" />
    </defs> 

    <use id="wave3" class="wave" xlink:href="#wave" x="0" y="-2" ></use> 
    <use id="wave2" class="wave" xlink:href="#wave" x="0" y="0" ></use>
    
    <g class="topball">
    

        
    <a href="https://github.com/Thinking-cell/review-my-hamilton"  class="social github "  title="GitHub">
        <svg viewBox="300 60 1000 412"><path d="M256 70.7c-102.6 0-185.9 83.2-185.9 185.9
         0 82.1 53.3 151.8 127.1 176.4 9.3 1.7 12.3-4 12.3-8.9V389.4c-51.7 11.3-62.5-21.9-62.5-21.9 
         -8.4-21.5-20.6-27.2-20.6-27.2 -16.9-11.5 1.3-11.3 1.3-11.3 18.7 1.3 28.5 19.2 28.5 19.2 16.6 28.4 43.5 
         20.2 54.1 15.4 1.7-12 6.5-20.2 11.8-24.9 -41.3-4.7-84.7-20.6-84.7-91.9 0-20.3 7.3-36.9 19.2-49.9 
         -1.9-4.7-8.3-23.6 1.8-49.2 0 0 15.6-5 51.1 19.1 14.8-4.1 30.7-6.2 46.5-6.3 15.8 0.1 31.7 2.1 
         46.6 6.3 35.5-24 51.1-19.1 51.1-19.1 10.1 25.6 3.8 44.5 1.8 49.2 11.9 13 19.1 29.6 19.1 49.9 0 
         71.4-43.5 87.1-84.9 91.7 6.7 5.8 12.8 17.1 12.8 34.4 0 24.9 0 44.9 0 51 0 4.9 3 10.7 12.4 8.9 73.8-24.6 
         127-94.3 127-176.4C441.9 153.9 358.6 70.7 256 70.7z"/></svg>
    </a> 
        
    </g>
    <g class="gooeff">
    <circle class="drop drop1" cx="20" cy="2" r="1.8"  />
    <circle class="drop drop2" cx="25" cy="2.5" r="1.5"  />
    <circle class="drop drop3" cx="16" cy="2.8" r="1.2"  />
        <use id="wave1" class="wave" xlink:href="#wave" x="0" y="1" />
    
        <!-- g mask="url(#xxx)">
        <path   id="wave1"  class="wave" d="M 0,10 C 30,10 30,15 60,15 90,15 90,10 120,10 150,10 150,15 180,15 210,15 210,10 240,10 v 28 h -240 z" />
        </g>
    </g -->

    </svg>

  <div>Thank You for Using my App!</div>
</footer>


    


</body>

</html>