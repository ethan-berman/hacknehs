
function calculateRouteFromAtoB (platform) {. //Tanay
  var router = platform.getRoutingService(),
    routeRequestParams = {
      mode: 'fastest;car',
      representation: 'display',
      routeattributes : 'waypoints,summary,shape,legs',
      maneuverattributes: 'direction,action',
      //waypoint0: '52.5160,13.3779', //Location A
      //waypoint1: '52.5206,13.3862'  // Location B

      waypoint0: '42.2495435,-71.0661612', //Location A
      waypoint1: '42.3601,-71.0589'  // Location B
    };

var geocoder;
  var map;
  var address1;
  var address2;
  var lat1;
  var lng1;


  function initialize() {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(-34.397, 150.644);
    var mapOptions = {
      zoom: 8,
      center: latlng
    }
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }

  function codeAddress(address) {
    
    // console.log(results[0].geometry.location);
   
    geocoder.geocode( { 'address': address}, function(results, status) {
      console.log(results[0].geometry.location.lat())
      console.log(results[0].geometry.location.lng())
      lat1=results[0].geometry.location.lat()
      lng1=results[0].geometry.location.lng()
      if (status == 'OK') {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });

        
        
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });

  }
    


  function compareAddress(){
    var address = document.getElementById('address').value;
    codeAddress(address)
   // var pethome = document.getElementById('pethome').value;
    //codeAddress(pethome)
  }




}
/**
 * This function will be called once the Routing REST API provides a response
 * @param  {Object} result          A JSONP object representing the calculated route
 *
 * see: http://developer.here.com/rest-apis/documentation/routing/topics/resource-type-calculate-route.html
 */
function onSuccess(result) {
  var route = result.response.route[0];
 /*


  addRouteShapeToMap(route);
  addManueversToMap(route);

  addWaypointsToPanel(route.waypoint);
  addManueversToPanel(route);
  addSummaryToPanel(route.summary);
  // ... etc.
}

/**
 * This function will be called if a communication error occurs during the JSON-P request
 * @param  {Object} error  The error message received.
 */
function onError(error) {
  alert('Ooops!');
}