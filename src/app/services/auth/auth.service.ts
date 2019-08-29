import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEventType, HttpResponse, HttpErrorResponse, } from '@angular/common/http';
import { environment } from '../../../environments/environment';
const serverApiUrl = environment.serverApiUrl;
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  
  login(data) {
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    // headers.append('Content-Type', 'application/json' );
    // headers.append("Access-Control-Allow-Origin", '*');
    // headers.append('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS' );
    // headers.append('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token' );
    const requestOptions = { headers: headers }; 
     return this.http.post(serverApiUrl+'/login',data,requestOptions)
  }
  
  register(data) {
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    const requestOptions = { headers: headers }; 
     return this.http.post(serverApiUrl+'/register',data,requestOptions)
  }

  Home(data) {
    // console.log(data.token);
    let headers = new HttpHeaders({
        'Accept':'application/json',
        'Content-Type': 'application/json',
        'Authorization': data.token
    });
    const requestOptions = { headers: headers }; 
     return this.http.post(serverApiUrl+'home',data,requestOptions)
  }

  TripsList(data) {
    // console.log(data.token);
    let headers = new HttpHeaders({
        'Accept':'application/json',
        'Content-Type': 'application/json',
        'Authorization': data.token
    });
    let formdata ={
      type:data.type,
      user_id:data.user_id
    }
    const requestOptions = { headers: headers }; 
     return this.http.post(serverApiUrl+'/trips-list',formdata,requestOptions)
  }

  TripsDetail(data) {
    // console.log(data.token);
    let headers = new HttpHeaders({
        'Accept':'application/json',
        'Content-Type': 'application/json',
        'Authorization': data.token
    });
    let formdata ={
      id:data.id,
      user_id:data.user_id
    }
    const requestOptions = { headers: headers }; 
     return this.http.post(serverApiUrl+'/trips-detail',formdata,requestOptions)
  }
  DriverDetail(data) {
    // console.log(data.token);
    let headers = new HttpHeaders({
        'Accept':'application/json',
        'Content-Type': 'application/json',
        'Authorization': data.token
    });
    let formdata ={
      id:data.id,
      user_id:data.user_id
    }
    const requestOptions = { headers: headers }; 
     return this.http.post(serverApiUrl+'/driver-detail',formdata,requestOptions)
  }

}
