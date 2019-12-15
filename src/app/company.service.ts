import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpRequest } from '@angular/common/http';
import { UserData } from './userData';
import { TokenData } from './tokenData';
import { ExchangeData } from './exchangeData';
import { CompanyData } from './companyData';
import { error } from 'util';
import { IpoData } from './ipoData';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { CompanyPriceData } from './companyPriceData';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  companyUrl = 'http://localhost:8087/stock-company';
  constructor(private http: HttpClient) { }

  getCompany(id:string){
    let token = sessionStorage.getItem("jsessionid");
    let tokenJson = JSON.parse(token);
    if(token != null || tokenJson.expires_in > new Date().getTime()){
      const myUrl = this.companyUrl+'/companies/'+id;
      const myHeaders: HttpHeaders = new HttpHeaders()
      .append('Authorization','Bearer'+tokenJson.access_token);
    
      return this.http.get<CompanyData>(myUrl, 
        { withCredentials: true,
          headers:myHeaders}
        );
    }
  }

  getCompanies(){
    let token = sessionStorage.getItem("jsessionid");
    let tokenJson = JSON.parse(token);
    if(token != null || tokenJson.expires_in > new Date().getTime()){
      const myUrl = this.companyUrl+'/companyvoes';
      const myHeaders: HttpHeaders = new HttpHeaders()
      .append('Authorization','Bearer'+tokenJson.access_token);
    
      return this.http.get<CompanyData[]>(myUrl, 
        { withCredentials: true,
          headers:myHeaders}
        );
    }
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
	    console.error(error); 
	    return of(result as T);
	  };
  }


  updateCompany(companyData:CompanyData){
    let token = sessionStorage.getItem("jsessionid");
    let tokenJson = JSON.parse(token);
    if(token != null || tokenJson.expires_in > new Date().getTime()){
      const myUrl = this.companyUrl+'/companies';

      const jsonParms = JSON.stringify(companyData);
      const myHeaders: HttpHeaders = new HttpHeaders()
          .append('Authorization','Bearer' + tokenJson['access_token'])
          .append("Content-Type","application/json");
      return this.http.put<CompanyData>(myUrl, companyData,
        {
            headers:myHeaders,
            withCredentials:true
        }
      );

    }
  }

  addCompany(companyData:CompanyData){
    let token = sessionStorage.getItem("jsessionid");
    let tokenJson = JSON.parse(token);
    if(token != null || tokenJson.expires_in > new Date().getTime()){
      const myUrl = this.companyUrl+'/companies';

      const myHeaders: HttpHeaders = new HttpHeaders()
          .append('Authorization','Bearer' + tokenJson['access_token'])
          .append("Content-Type","application/json");

      return this.http.post<CompanyData>(myUrl, companyData,
        {
            headers:myHeaders,
            withCredentials:true
        }
      );

    }
  }

  addIpo(ipoData:IpoData){
    let token = sessionStorage.getItem("jsessionid");
    let tokenJson = JSON.parse(token);
    if(token != null || tokenJson.expires_in > new Date().getTime()){
      const myUrl = this.companyUrl+'/ipoes';

      const myHeaders: HttpHeaders = new HttpHeaders()
          .append('Authorization','Bearer' + tokenJson['access_token'])
          .append("Content-Type","application/json");

      return this.http.post<IpoData>(myUrl, ipoData,
        {
            headers:myHeaders,
            withCredentials:true
        }
      );

    }
  }

  getIpo(id:string){
    let token = sessionStorage.getItem("jsessionid");
    let tokenJson = JSON.parse(token);
    if(token != null || tokenJson.expires_in > new Date().getTime()){
      const myUrl = this.companyUrl+'/ipovoes/'+id;
      const myHeaders: HttpHeaders = new HttpHeaders()
      .append('Authorization','Bearer'+tokenJson.access_token);
    
      return this.http.get<IpoData>(myUrl, 
        { withCredentials: true,
          headers:myHeaders
        }
      );
    }
  }

  getIpoes(){
    let token = sessionStorage.getItem("jsessionid");
    let tokenJson = JSON.parse(token);
    if(token != null || tokenJson.expires_in > new Date().getTime()){
      const myUrl = this.companyUrl+'/ipovoes';
      const myHeaders: HttpHeaders = new HttpHeaders()
      .append('Authorization','Bearer'+tokenJson.access_token);
    
      return this.http.get<IpoData[]>(myUrl, 
        { withCredentials: true,
          headers:myHeaders}
        );
    }
  }

  updateIpo(ipoData:IpoData){
    let token = sessionStorage.getItem("jsessionid");
    let tokenJson = JSON.parse(token);
    if(token != null || tokenJson.expires_in > new Date().getTime()){
      const myUrl = this.companyUrl+'/ipoes';

      const jsonParms = JSON.stringify(ipoData);
      const myHeaders: HttpHeaders = new HttpHeaders()
          .append('Authorization','Bearer' + tokenJson['access_token'])
          .append("Content-Type","application/json");
      return this.http.put<IpoData>(myUrl, ipoData,
        {
            headers:myHeaders,
            withCredentials:true
        }
      );

    }
  }

  getCompanyStockPrice(id:string,stockEx:string,fromDate:string,toDate:string){
    let token = sessionStorage.getItem("jsessionid");
    let tokenJson = JSON.parse(token);
    if(token != null || tokenJson.expires_in > new Date().getTime()){
      const myUrl = this.companyUrl+'/companyprice/'+id
         +'?stockExchange='+stockEx+"&fromDate="+fromDate+"&toDate="+toDate;
      const myHeaders: HttpHeaders = new HttpHeaders()
      .append('Authorization','Bearer'+tokenJson.access_token);
    
      return this.http.get<CompanyPriceData[]>(myUrl, 
        { withCredentials: true,
          headers:myHeaders}
        );
    }
  }


}

