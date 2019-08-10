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
    var headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    headers.append("Access-Control-Allow-Origin", '*');
    headers.append('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS' );
    headers.append('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token' );
    const requestOptions = { headers: headers }; 
     return this.http.post('http://localhost/tripbok/api/login',data,requestOptions)
  }
  
  register(data) {
    var headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    headers.append("Access-Control-Allow-Origin", '*');
    headers.append('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS' );
    headers.append('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token' );
    const requestOptions = { headers: headers }; 
     return this.http.post('http://localhost/tripbok/api/register',data,requestOptions)
  }

  TripsList(data) {
    console.log(data.token);
    var headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/x-www-form-urlencoded' );
    headers.append('Authorization', data.token );
    headers.append("Access-Control-Allow-Origin", '*');
    headers.append('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS' );
    headers.append('Access-Control-Allow-Headers', 'Origin, Content-Type, Authorization, X-Requested-With, X-Auth-Token, X-XSRF-TOKEN' );
    const requestOptions = { headers: headers }; 
     return this.http.post('http://localhost/tripbok/api/details',data,requestOptions)
  }
}
