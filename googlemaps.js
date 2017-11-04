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
    var pethome = document.getElementById('pethome').value;
    codeAddress(pethome)
  }
