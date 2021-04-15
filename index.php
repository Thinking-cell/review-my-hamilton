<?php
/**
 *
 */

include "php/connect.php";

?><!DOCTYPE html>


<html>
    <head>
        <title>Review my Fun Place!</title>

       

    
        
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
       
        
        
        <!--Adding jquery functionality ,adding api key for google, adding json data, ????Bootstrap????customization-->
        <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCJ7DN8YZXSV-ysmC2280jOl9hITGxnh2E&callback=initMap&libraries=&v=weekly" defer></script>
        <script src="js/education.js"></script>
        <script src="js/data.js"></script>
        <script src="js/script.js"></script>
        <script src="js/get_location_component.js"></script>
        <script src="https://kit.fontawesome.com/b99e675b6e.js"></script>

        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>

        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <link rel="stylesheet" href='css/style.css'/>
        

        
    </head>
    <body>
        <div id="map"></div>

        <div id="hud">
            <form id="map-filters">
                <ul>
                    <li><h5>Categories</h5></li>
                    
                    <li><label for="Top"><input type="radio" value="Top" id="Top" name="map_filter" > Top 10</label></li>
                    

                    <li><label for="Beaches"><input type="radio" value="Beaches" id="Beaches" name="map_filter"> Beaches</label></li>

                    

                    <li><label for="Tourism_Points_of_Interest"><input type="radio" value="Tourism_Points_of_Interest" id="Tourism_Points_of_Interest" name="map_filter"> Tourism Points</label></li>

                    <li><label for="City_Waterfalls"><input type="radio" value="City_Waterfalls" id="City_Waterfalls" name="map_filter"> Waterfalls</label></li>

                    <li><label for="Campgrounds"><input type="radio" value="Campgrounds" id="Campgrounds" name="map_filter"> Campgrounds</label></li>

                    <li><label for="Libraries"><input type="radio" value="Libraries" id="Libraries" name="map_filter"> Libraries</label></li>

                    <li><label for="Arenas"><input type="radio" value="Arenas" id="Arenas" name="map_filter"> Arenas</label></li>

                    <li><label for="Accommodations"><input type="radio" value="Accommodations" id="Accommodations" name="map_filter"> Accommodations</label></li>

                    <li><label for="Public_Art_and_Monuments"><input type="radio" value="Public_Art_and_Monuments" id="Public_Art_and_Monuments" name="map_filter"> Art and Monuments</label></li>

                    <li><label for="All"><input type="radio" value="All" id="All" name="map_filter" checked> All</label></li>
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
                    <div class="default_option"><label for="All"><input type="hidden" value="All" id="All-search_filter" name="search_filter" > All</label></div>
                    <form id='search-filters'>  
                        <ul>
                            <li><label for="All"><input type="hidden" value="All" id="All-search_filter" name="search_filter" > All</label></li>

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
                <div class="search_field">
                  <input type="text" class="input " id='search-bar-input'placeholder="Find...">
                  <i class="fas fa-search" id="search-bar-button"></i>
                  <div class="row">
                    <div class="container">
                                  
                        <table class="table-borderless table-hover rounded " style="background: #fff;width: 358px; margin-right: -10px; margin-top: 8px;">
                          
                            <tr class='d-none row-template search-result'>
                                
                                <td><label class='name-result-label m-2' > Name
                                
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

        
    </body>
</html>