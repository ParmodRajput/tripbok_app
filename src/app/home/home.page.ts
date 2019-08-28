import { Component,OnInit  } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router,ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
const serverApiUrl = environment.serverApiUrl;
const serverUrl = environment.serverUrl;
declare var $: any;
declare var google: any;
declare var cabs: any;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor(private AuthService: AuthService, private router: Router,private route: ActivatedRoute) {

  }

  ngOnInit() {
    $(document).ready(function() {
      var to ;
      var from;
      var infoWindow ;
      var eType;
      var eFlatTrip = 'No';
      var eTypeQ11 = 'yes';
      //var map;
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
            geocoder.geocode({'location': pos}, function(results, status) {
                if (status === 'OK') {
                  if (results[0]) {
                   // map.setZoom(11);
                    var marker = new google.maps.Marker({
                      position: pos,
                      map: map
                    });
                    $("#from").val(results[0].formatted_address);
                    //console.log(results[0].formatted_address);
                    // infowindow.setContent(results[0].formatted_address);
                    // infowindow.open(map, marker);
                  } else {
                    window.alert('No results found');
                  }
                } else {
                  window.alert('Geocoder failed due to: ' + status);
                }
              });
            //$("#to").val(position);
            $("#from_lat").val(position.coords.latitude);
            $("#from_long").val(position.coords.longitude);
            //cab fetch
            let data ={
                user_id:localStorage.getItem('id'),
                latitude:position.coords.latitude,
                longitude: position.coords.longitude
              }
            checkCab(data,map);
            //cab fetch on focusout form field
            // $("#from").focusout(function(){
            //     let datac ={     
            //         user_id:localStorage.getItem('id'),
            //         latitude:$("#from_lat").val(),
            //         longitude:$("#from_long").val()
            //       }
            //     // var map = new google.maps.Map(document.getElementById('map'), {
            //     //     zoom: 7,
            //     //     center: {lat: 41.85, lng: -87.65}
            //     // });
            //       checkCab(datac,map);
            //   });

            infoWindow.setPosition(pos);
            //infoWindow.setContent('<img src=serverUrl+"/storage/app/public/media/loc.png" style="width:20px;">');
            //infoWindow.open(map);
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
              let data ={
                user_id:localStorage.getItem('id'),
                latitude:$("#from_lat").val(),
                longitude:$("#from_long").val()
              }
              checkCab(data,map);
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
          map.setZoom(10);
      
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

        $("#confirmBooking").click(function(){
            if($('#to').val()!='' && $('#from').val()!=''){
                //$(this).prop('disabled', true);
                let trip ={
                    to:$('#to').val(),
                    from:$('#from').val(),
                    to_lat:$('#to_lat').val(),
                    to_long:$('#to_long').val(),
                    to_lat_long:$('#to_lat_long').val(),
                    from_lat:$('#from_lat').val(),
                    from_long:$('#from_long').val(),
                    from_lat_long:$('#from_lat_long').val(),
                    passenger_id:localStorage.getItem('id'),
                    }
                    booktrip(trip);
            }else{
                $("input").focus();
            }
        });
    });
    function booktrip(trip){
        $.ajax({
            beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Accept","application/json");
                xhrObj.setRequestHeader("Authorization",localStorage.getItem('token'));
            },
            type: "POST",
            url: serverApiUrl+"/tripbook",
            async:false,
            data: JSON.stringify(trip),
            contentType: "application/json",
            success: function (res) {
                let cabss = res.data;    
                console.log(cabss);           
            },
            error: function (textStatus, errorThrown) {
                // localStorage.clear();
                // this.router.navigate(['login']);
            }
        });
    }
    function checkCab(data,map){
        $.ajax({
            beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Accept","application/json");
                xhrObj.setRequestHeader("Authorization",localStorage.getItem('token'));
            },
            type: "POST",
            url: serverApiUrl+"/home",
            async:false,
            data: JSON.stringify(data),
            contentType: "application/json",
            success: function (res) {
                let cabss = res.data;
                let cabicon =res.icon;
                if(cabss.length!=0){
                    $.each(res.data, function(k, v) {
                        var beachMarker = new google.maps.Marker({
                        position: {lat: parseFloat(v.latitude), lng: parseFloat(v.longitude)},
                        map: map,
                        icon: cabicon
                        });
                    });
                }else{
                    var infoWindow = new google.maps.InfoWindow;
                    var pos = {
                        lat: parseFloat($("#from_lat").val()),
                        lng: parseFloat($("#from_long").val())
                      };
                      console.log(infoWindow);
                    infoWindow.setPosition(pos);
                    infoWindow.setContent('Cabs not found');
                    infoWindow.open(map);
                    // alert();
                }
            },
            error: function (textStatus, errorThrown) {
                localStorage.clear();
                this.router.navigate(['login']);
            }
        });
    }
 }
 
}
