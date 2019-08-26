import { Component,OnInit  } from '@angular/core';
declare var $: any;
declare var google: any;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {}

  ngOnInit() {
    $(document).ready(function() {
      var to ;
      var from;
      var infoWindow ;
      var eType;
      var eFlatTrip = 'No';
      var eTypeQ11 = 'yes';
      var map;
      var geocoder;
      var circle;
      var markers = [];
      var driverMarkers = [];
      var bounds = [];
      var newLocations = "";
      var autocomplete_from;
      var autocomplete_to;
      var eLadiesRide = 'No';
      var eHandicaps = 'No';
      var eChildSeat = 'No';
      var eWheelChair = 'No';
      var geocoder = new google.maps.Geocoder();
      var directionsService = new google.maps.DirectionsService(); // For Route Services on map
      var directionsRenderer = new google.maps.DirectionsRenderer();
      var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 7,
          center: {lat: 41.85, lng: -87.65}
      });
      infoWindow = new google.maps.InfoWindow;
      // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('<img src="http://localhost/tripbok/storage/app/public/media/loc.png" style="width:20px;">');
            infoWindow.open(map);
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
        function handleLocationError(browserHasGeolocation, infoWindow, pos) {
          infoWindow.setPosition(pos);
          infoWindow.setContent(browserHasGeolocation ?
                                'Error: The Geolocation service failed.' :
                                'Error: Your browser doesn\'t support geolocation.');
          infoWindow.open(map);
        }
      directionsRenderer.setMap(map);
      
      // var onChangeHandler = function() {
      //     calculateAndDisplayRoute(directionsService, directionsRenderer);
      // };
      var directionsOptions = {// For Polyline Route line options on map
              polylineOptions: {
                  strokeColor: '#FF7E00',
                  strokeWeight: 5
              }
          };
      var directionsDisplay = new google.maps.DirectionsRenderer(directionsOptions);
      var showsurgemodal = "Yes";
      
       from = document.getElementById('from');
      autocomplete_from = new google.maps.places.Autocomplete(from);
       to = document.getElementById('to');
      autocomplete_to = new google.maps.places.Autocomplete(to);
      
      google.maps.event.addListener(autocomplete_from,'place_changed', function () {
                      var place = autocomplete_from.getPlace();
                      $("#from_lat_long").val(place.geometry.location);
                      $("#from_lat").val(place.geometry.location.lat());
                      $("#from_long").val(place.geometry.location.lng());
                      // remove disable from zoom level when from has value
                      $('#radius-id').prop('disabled', false);
                      // routeDirections();
                      if (from != '') {
                          // checkrestrictionfrom('from');
                      }
                      show_locations();
                  });
      google.maps.event.addListener(autocomplete_to,'place_changed', function () {
                      var place = autocomplete_to.getPlace();
                      $("#to_lat_long").val(place.geometry.location);
                      $("#to_lat").val(place.geometry.location.lat());
                      $("#to_long").val(place.geometry.location.lng());
                      // routeDirections();
                      if (to != '') {
                          // checkrestrictionto('to');
                      }
                      show_locations();
                  });
      //calculate And Display Route
      // function calculateAndDisplayRoute(directionsService, directionsRenderer) {
      //     directionsService.route(
      //         {
      //             origin: {query: document.getElementById('from').value},
      //             destination: {query: document.getElementById('to').value},
      //             travelMode: 'DRIVING'
      //         },
      //         function(response, status) {
      //             if (status === 'OK') {
      //             directionsRenderer.setDirections(response);
      //             } else {
      //             window.alert('Directions request failed due to ' + status);
      //             }
      //         });
      //     }
      
      function show_locations() {
          if ($("#from").val() != "" && $("#to").val() == '') {
              DeleteMarkers('from_loc');
              var latlng = new google.maps.LatLng($("#from_lat").val(), $("#from_long").val());
              console.log('hwere');
              console.log(latlng.lat());
              setMarker(latlng, 'from_loc');
          }
          if ($("#to").val() != "" && $("#from").val() == '') {
              DeleteMarkers('to_loc');
              var latlng_to = new google.maps.LatLng($("#to_lat").val(), $("#to_long").val());
              setMarker(latlng_to, 'to_loc');
          }
          if ($("#from").val() != '' && $("#to").val() != '') {
              from_to($("#from").val(), $("#to").val());
          }
      }
      
      function from_to(from, to) {
          //  clearThat();
          DeleteMarkers('from_loc');
          DeleteMarkers('to_loc');
          if (from == '')
              from = $('#from').val();
      
          if (to == '')
              to = $('#to').val();
          //alert("from_to" + from +"   to "+to);
          $("#from_lat_long").val('');
          $("#from_lat").val('');
          $("#from_long").val('');
          $("#to_lat_long").val('');
          $("#to_lat").val('');
          $("#to_long").val('');
      
          // var chks = document.getElementsByName('loc');
          // var waypts = [];
          if (from != '') {
              geocoder.geocode({'address': from}, function (results, status) {
                  if (status == google.maps.GeocoderStatus.OK) {
                      if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
                          // console.log(results[0].geometry.location);
                          $("#from_lat_long").val((results[0].geometry.location));
                          $("#from_lat").val(results[0].geometry.location.lat());
                          $("#from_long").val(results[0].geometry.location.lng());
      
                          setMarker(results[0].geometry.location, 'from_loc');
                      } else {
                          alert("No results found");
                      }
                  } else {
                      var place19 = autocomplete_from.getPlace();
                      $("#from_lat_long").val(place19.geometry.location);
                  }
              });
          }
          if (to != '') {
              geocoder.geocode({'address': to}, function (results, status) {
                  if (status == google.maps.GeocoderStatus.OK) {
                      if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
                          $("#to_lat_long").val((results[0].geometry.location));
                          $("#to_lat").val(results[0].geometry.location.lat());
                          $("#to_long").val(results[0].geometry.location.lng());
                          setMarker(results[0].geometry.location, 'to_loc');
                      } else {
                          alert("No results found");
                      }
                  } else {
                      var place20 = autocomplete_to.getPlace();
                      $("#to_lat_long").val(place20.geometry.location);
                  }
              });
          }
          // alert('sasa');
      
          // routeDirections();
      }
      
      function DeleteMarkers(newId) {
          // Loop through all the markers and remove
          for (var i = 0; i < markers.length; i++) {
              if (newId != '') {
                  if (markers[i].id == newId) {
                      markers[i].setMap(null);
                  }
              } else {
                  markers[i].setMap(null);
              }
          }
          if (newId == '') {
              markers = [];
          }
      }
      
      function getAddress(mDlatitude, mDlongitude, addId) {
          var mylatlang = new google.maps.LatLng(mDlatitude, mDlongitude);
          geocoder.geocode({'latLng': mylatlang},
          function (results, status) {
              // console.log(results);
              if (status == google.maps.GeocoderStatus.OK) {
                  if (results[0]) {
                      // document.getElementById(addId).value = results[0].formatted_address;
                      $('#' + addId).val(results[0].formatted_address);
                  } else {
                    $("#"+addId).val("No results");
                      //document.getElementById('#' + addId).value = "No results";
                  }
              } else {
                $("#"+addId).val(status);
                 // document.getElementById('#' + addId).value = status;
              }
          });
      }
      
      /*********** */
      
      function routeDirections() {
          directionsDisplay.setMap(null); // Remove Previous Route.
      
          if (($("#from").val() != "" && $("#from_lat_long").val() != "") && ($("#to").val() != "" && $("#to_lat_long").val() != "")) {
              var newFrom = $("#from_lat").val() + ", " + $("#from_long").val();
              if (eType == 'UberX') {
                  var newTo = $("#from_lat").val() + ", " + $("#from_long").val();
              } else {
                  var newTo = $("#to_lat").val() + ", " + $("#to_long").val();
              }
      
              //Make an object for setting route
              var request = {
                  origin: newFrom, // From locations latlongs
                  destination: newTo, // To locations latlongs
                  travelMode: google.maps.TravelMode.DRIVING // Set the Path of Driving
              };
      
              //Draw route from the object
              directionsService.route(request, function (response, status) {
                  if (status == google.maps.DirectionsStatus.OK) {
                      // Check for allowed and disallowed.
                      var response1 = JSON.stringify(response);
                      directionsDisplay.setMap(map);
                      directionsDisplay.setOptions({suppressMarkers: true}); //, preserveViewport: true, suppressMarkers: false for setting auto markers from google api
                      directionsDisplay.setDirections(response); // Set route
                      var route = response.routes[0];
                      for (var i = 0; i < route.legs.length; i++) {
                          $("#distance").val(route.legs[i].distance.value);
                          $("#duration").val(route.legs[i].duration.value);
                      }
      
                     // var dist_fare = parseFloat($("#distance").val(), 10) / parseFloat(1000, 10);
                     var dist_fare = parseFloat($("#distance").val()) / parseFloat('1000');
                      // alert(dist_fare);
                      if ($("#eUnit").val() != 'KMs') {
                          dist_fare = dist_fare * 0.621371;
                      }
                      // alert(dist_fare);
                      $('#dist_fare').text(dist_fare.toFixed(2));
                     // var time_fare = parseFloat($("#duration").val(), 10) / parseFloat(60, 10);
                     var time_fare = parseFloat($("#duration").val()) / parseFloat('60');
                      $('#time_fare').text(time_fare.toFixed(2));
                      var vehicleId = $('#iVehicleTypeId').val();
                      var booking_date = $('#datetimepicker4').val();
                      var vCountry = $('#vCountry').val();
                      var tollcostval = $('#fTollPrice').val();
                  } else {
                      alert("Directions request failed: " + status);
                  }
              });
      
      
          }
      }
      
      /************* */
      function setMarker(postitions, valIcon) {
          var newIcon;
          if (valIcon == 'from_loc') {
              if (eType == 'UberX') {
                  newIcon = 'http://cubetaxishark.bbcsproducts.com/webimages/upload/mapmarker/PinFrom.png';
              } else {
                  newIcon = 'http://cubetaxishark.bbcsproducts.com/webimages/upload/mapmarker/PinFrom.png';
              }
          } else if (valIcon == 'to_loc') {
              newIcon = 'http://cubetaxishark.bbcsproducts.com/webimages/upload/mapmarker/PinTo.png';
          } else {
              newIcon = 'http://cubetaxishark.bbcsproducts.com/webimages/upload/mapmarker/PinTo.png';
          }
          var marker = new google.maps.Marker({
              map: map,
              draggable: true,
              animation: google.maps.Animation.DROP,
              position: postitions,
              icon: newIcon
          });
          marker.id = valIcon;
          markers.push(marker);
          map.setCenter(marker.getPosition());
          map.setZoom(15);
      
          if (valIcon == "from_loc") {
              marker.addListener('dragend', function (event) {
                  // console.log(event);
                  var lat = event.latLng.lat();
                  var lng = event.latLng.lng();
                  var myLatlongs = new google.maps.LatLng(lat, lng);
                  showsurgemodal = "No";
      
                  $("#from_lat").val(lat);
                  $("#from_long").val(lng);
                  $("#from_lat_long").val(myLatlongs);
                  getAddress(lat, lng, 'from');
                  routeDirections();
              });
          }
          if (valIcon == 'to_loc') {
              marker.addListener('dragend', function (event) {
                  var lat = event.latLng.lat();
                  var lng = event.latLng.lng();
                  var myLatlongs1 = new google.maps.LatLng(lat, lng);
                  showsurgemodal = "No";
      
                  $("#to_lat").val(lat);
                  $("#to_long").val(lng);
                  $("#to_lat_long").val(myLatlongs1);
                  getAddress(lat, lng, 'to');
                  routeDirections();
              });
          }
          routeDirections();
      }
    });
 }

}
