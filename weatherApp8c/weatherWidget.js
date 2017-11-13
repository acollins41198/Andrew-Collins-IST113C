function WeatherWidget($widget){
    
    var userCoords;
    
    this.update = function(){
        $(".results", $widget).hide();
        $(".loading", $widget).show();
        getWeatherReport();
    };
    
    function getWeatherReport(){ //This is messy because it wouldn't actually WAIT until I had the location to ask for the data, and it always tried to get [undefined]
        getLocation();
        navigator.geolocation.getCurrentPosition(function(position){
            userCoords = (position.coords.latitude).toFixed(4) + "," + (position.coords.longitude).toFixed(4);
            console.log(userCoords);
            $.get("https://api.weather.gov/points/" + userCoords + "/forecast", {
                t: new Date().getTime()
            }).done(function(data) {populateWeather(data); })
            .fail(function(jqXHR, textStatus, errorThrown) {
                console.log("Error");
                //showError(errorThrown);
            });
        });
    }
    
    function populateWeather(data){
        var observation = data.properties.periods[0];

        $(".results header img", $widget).attr("src", observation.icon);
        $(".location>span", $widget).text("Your Location");
        
        $(".conditions>span").each(function(i, e)
        {
            var $span = $(this);
            var field = $span.data("field");
            $(this).text(observation[field]);
        });
        
        $(".loading", $widget).fadeOut(function(){
            $(".results", $widget).fadeIn();
        });
    }
    
    function getLocation(){
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(function(position){
                $("#latitude").val(position.coords.latitude);
                $("#longitude").val(position.coords.longitude);
                var gotCoords = (position.coords.latitude).toFixed(4) + "," + (position.coords.longitude).toFixed(4);
                console.log(gotCoords);
                return gotCoords;
            }, function(error){
                 $(".error").text("ERROR: " + error.message).slideDown();
            });
        }
    };
}