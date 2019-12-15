import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpRequest } from '@angular/common/http';
import { UserData } from './userData';
import { TokenData } from './tokenData';
import { ExchangeData } from './exchangeData';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {

  constructor(private http: HttpClient) { }

  getExchanges(){
    let token = sessionStorage.getItem("jsessionid");
    let tokenJson = JSON.parse(token);
    if(token != null || tokenJson.expires_in > new Date().getTime()){
      const myUrl = 'http://localhost:8087/stock-exchange/stockexchanges';
      const myHeaders: HttpHeaders = new HttpHeaders()
      .append('Authorization','Bearer'+tokenJson.access_token);
    
      return this.http.get<ExchangeData[]>(myUrl, 
        { withCredentials: true,
          headers:myHeaders}
        );
    }  
  }

  
  addExchange(exchangeData:ExchangeData){
    let token = sessionStorage.getItem("jsessionid");
    let tokenJson = JSON.parse(token);
    if(token != null || tokenJson.expires_in > new Date().getTime()){
      const myUrl = 'http://localhost:8087/stock-exchange/stockexchanges';
     
      const myHeaders: HttpHeaders = new HttpHeaders()
          .append('Authorization','Bearer' + tokenJson['access_token'])
          .append("Content-Type","application/json");

      return this.http.post<ExchangeData>(myUrl, exchangeData,
        {
            headers:myHeaders,
            withCredentials:true
        }
      );

    }
  }


}
