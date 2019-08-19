import { Injectable } from '@angular/core';
// import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpRequest, HttpEventType, HttpResponse, HttpErrorResponse, } from '@angular/common/http';
// const serverUrl = environment.serverUrl;
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
     return this.http.post('http://localhost/tripbok/api/login',data,requestOptions)
  }
  
  register(data) {
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    const requestOptions = { headers: headers }; 
     return this.http.post('http://localhost/tripbok/api/register',data,requestOptions)
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
     return this.http.post('http://localhost/tripbok/api/trips-list',formdata,requestOptions)
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
     return this.http.post('http://localhost/tripbok/api/trips-detail',formdata,requestOptions)
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
     return this.http.post('http://localhost/tripbok/api/driver-detail',formdata,requestOptions)
  }

}
