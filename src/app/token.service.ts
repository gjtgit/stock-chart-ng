import { Injectable } from '@angular/core';
import { HttpClient,HttpParams, HttpHeaders } from '@angular/common/http';
import { UserData } from './userData';
import { TokenData } from './tokenData';

@Injectable({
  providedIn: 'root'
})

export class TokenService {

  constructor(private http: HttpClient) { }

  getToken(userData:UserData){
    const getTokenUrl = 'http://localhost:8087/stock-auth/oauth/token?grant_type=password&username='+userData.username+'&password='+userData.password;
    const getTokenParams: HttpParams = new HttpParams()
        .append('grant_type','password')
        .append('username',userData.username)
        .append('password',userData.password);

    const getTokenHeaders: HttpHeaders = new HttpHeaders()
        .append('Authorization','Basic'+btoa('angular:123456'));

    return this.http.post<TokenData>(getTokenUrl, 
        {
            headers:getTokenHeaders,
            params:getTokenParams,
        },
        {withCredentials:true}
    );
  }
}