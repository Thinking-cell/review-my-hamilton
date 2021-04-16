function activateSearchbar(selectedFilter_SEARCH,dataList){

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
        let results_search=[];
        dataList.forEach((object)=>{
            if(selectedFilter_SEARCH!="All"){
                if(selectedFilter_SEARCH==object.CATEGORY){
                    if((object.NAME.toLowerCase()).includes(key_input)||(object.ADDRESS.toLowerCase()).includes(key_input)){
                        results_search.push(object);
                        resultCount++;
                    }
                }
            }else{
                if((object.NAME.toLowerCase()).includes(key_input)||(object.ADDRESS.toLowerCase()).includes(key_input)){
                    results_search.push(object);
                    resultCount++;
                }
            }
        });

        if(resultCount<=5){
            results_search=results_search.slice(0,resultCount);
        }else{
            results_search=results_search.slice(0,5);
        }
        console.log(results_search);

        
        
        
        results_search.forEach((result)=>{
            let $rowTemplate = $('.row-template');
            let $rowClone = $rowTemplate.clone();
            $rowClone.removeClass('d-none row-template');

            $rowClone.find('.name-result-label').html(result.NAME);
           

            $rowClone.appendTo($container);
            console.log("appended")


        });

        searchResults=results_search;

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
           
            // setting current object
            
            setMarker(resultObject);
            
            


        });
        
        
      });

      // close search when out of focus
      $(".search-result-container").hover(function(){
        
        }, function(){
        $(this).html("");
      });
      
      // retrieve results after out of focus and clicking search bar
      $("#search-bar-input").click(function(){
            
        $('.search-result-container').html("");
        searchResults.forEach((result)=>{
            let $rowTemplate = $('.row-template');
            let $rowClone = $rowTemplate.clone();
            $rowClone.removeClass('d-none row-template');

            $rowClone.find('.name-result-label').html(result.NAME);
           

            $rowClone.appendTo($('.search-result-container'));
            console.log("appended")


        });

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
           
            // setting current object
            
            setMarker(resultObject);
            
            


        });


    });


}