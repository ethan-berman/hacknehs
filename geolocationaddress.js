
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


//Tanay
var geocoder  = new google.maps.Geocoder();             // create a geocoder object
var location  = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);    // turn coordinates into an object          
geocoder.geocode({'latLng': location}, function (results, status) {
if(status == google.maps.GeocoderStatus.OK) {           // if geocode success
var add=results[0].formatted_address;         // if address found, pass to processing function
document.write(add);


  router.calculateRoute(
    routeRequestParams,
    onSuccess,
    onError
  );
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