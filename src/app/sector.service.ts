import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpRequest } from '@angular/common/http';
import { UserData } from './userData';
import { TokenData } from './tokenData';
import { SectorData } from './sectorData';
import { SectorPriceData } from './sectorPriceData';

@Injectable({
  providedIn: 'root'
})
export class SectorService {

  constructor(private http: HttpClient) { }

  getSectors(){
    let token = sessionStorage.getItem("jsessionid");
    let tokenJson = JSON.parse(token);
    if(token != null || tokenJson.expires_in > new Date().getTime()){
      const myUrl = 'http://localhost:8087/stock-sector/sectors';
      const myHeaders: HttpHeaders = new HttpHeaders()
      .append('Authorization','Bearer'+tokenJson.access_token);
    
      return this.http.get<SectorData[]>(myUrl, 
        { withCredentials: true,
          headers:myHeaders}
        );
    }  
  }

  getSectorStockPrice(id:string,stockEx:string,fromDate:string,toDate:string){
    let token = sessionStorage.getItem("jsessionid");
    let tokenJson = JSON.parse(token);
    if(token != null || tokenJson.expires_in > new Date().getTime()){
      const myUrl = 'http://localhost:8087/stock-sector/sectorprice/'+id
         +'?stockExchange='+stockEx+"&fromDate="+fromDate+"&toDate="+toDate;
      const myHeaders: HttpHeaders = new HttpHeaders()
      .append('Authorization','Bearer'+tokenJson.access_token);
    
      return this.http.get<SectorPriceData[]>(myUrl, 
        { withCredentials: true,
          headers:myHeaders}
        );
    }
  }

}
