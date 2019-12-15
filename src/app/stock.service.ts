import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpRequest } from '@angular/common/http';
import { UserData } from './userData';
import { TokenData } from './tokenData';
import { ExchangeData } from './exchangeData';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpClient) { }
  test(){
    let token = sessionStorage.getItem("jsessionid");
    let tokenJson = JSON.parse(token);
    console.log("---"+tokenJson['access_token']);
    const myHeaders: HttpHeaders = new HttpHeaders({'Authorization':'Bearer' + tokenJson['access_token']})
    this.http.get("http://localhost:8087/stock-auth/project",
      {withCredentials: true,
      headers:myHeaders}
    ).subscribe(result =>{
       console.log(result);
    });

  }

  test2(){
    let token = sessionStorage.getItem("jsessionid");
    let tokenJson = JSON.parse(token);
    if(token != null || tokenJson.expires_in > new Date().getTime()){
      console.log("---"+tokenJson['access_token']);
      const myHeaders: HttpHeaders = new HttpHeaders({'Authorization':'Bearer' + tokenJson['access_token']})
      this.http.post("http://localhost:8087/stock-auth/meet",
        {withCredentials: true},
        {headers:myHeaders}
      ).subscribe(result =>{
        console.log(result);
      });
    }

  }

  test3(){
    let token = sessionStorage.getItem("jsessionid");
    let tokenJson = JSON.parse(token);
    
      console.log("---"+tokenJson['access_token']);
      const myHeaders: HttpHeaders = new HttpHeaders({'Authorization':'Bearer' + tokenJson['access_token']})
      this.http.post("http://localhost:8087/stock-user/test",
        {withCredentials: true}
        //{headers:myHeaders}
      ).subscribe(result =>{
        console.log(result);
      });

  }

  register(userData:UserData){
    const myUrl = 'http://localhost:8087/stock-user/users';
    const jsonParms = JSON.stringify(userData);
    const myHeaders: HttpHeaders = new HttpHeaders()
        .append('Authorization','Basic'+btoa('angular:123456'))
        .append("Content-Type","application/json");
    
    return this.http.post<UserData>(myUrl, jsonParms,
        {
            headers:myHeaders,
            withCredentials:true
        }
    );

  }

  getLoginUser(userData:UserData){
    const myUrl = 'http://localhost:8087/stock-user/login?username='+userData.username+'&password='+userData.password;
    let token = sessionStorage.getItem("jsessionid");
    let tokenJson = JSON.parse(token);
    //if(token != null || tokenJson.expires_in > new Date().getTime()){
      //const myHeaders: HttpHeaders = new HttpHeaders({'Authorization':'Bearer' + tokenJson['access_token']})
      //console.log("---"+token);
      return this.http.get<UserData>(myUrl,
        {
         //headers:myHeaders,
         // params:jsonParms,
         //withCredentials:true
        }
      );
    //}
  }
  
  getLoginUserData(){
    let username = sessionStorage.getItem("username");
    let token = sessionStorage.getItem("jsessionid");
    let tokenJson = JSON.parse(token);
    
    if(token != null || tokenJson.expires_in > new Date().getTime()){
      const myUrl = "http://localhost:8087/stock-user/getUserByName?username="+username;
      const myHeaders: HttpHeaders = new HttpHeaders({'Authorization':'Bearer' + tokenJson['access_token']})
      return this.http.get<UserData>(myUrl, 
        { withCredentials: true,
          headers:myHeaders
        }
      );
    }  
  }

  updateUser(userData:UserData){
    const myUrl = 'http://localhost:8087/stock-user/users';
    const jsonParms = JSON.stringify(userData);
    const myHeaders: HttpHeaders = new HttpHeaders()
        .append('Authorization','Basic'+btoa('angular:123456'))
        .append("Content-Type","application/json");
    
    return this.http.put<UserData>(myUrl, userData,
        {
            headers:myHeaders,
            withCredentials:true
        }
    );

  }

  activateUser(code:string){
    const myUrl = 'http://localhost:8087/stock-user/user/checkCode/'+code;
    const myHeaders: HttpHeaders = new HttpHeaders()
        .append('Authorization','Basic'+btoa('angular:123456'))
        .append("Content-Type","application/json");
    
    return this.http.post<string>(myUrl, "",
        {
            //headers:myHeaders,
            withCredentials:true
        }
      );
  }
}
