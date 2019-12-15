import { Component, OnInit } from '@angular/core';
import $ from 'jquery';
import { CompanyData } from '../companyData';
import { Router } from '@angular/router';
import { CompanyService } from '../company.service';
import { Subject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-manage-company',
  templateUrl: './manage-company.component.html',
  styleUrls: ['./manage-company.component.css']
})
export class ManageCompanyComponent implements OnInit {
  warninfo:string="";
  companies: CompanyData[] = new Array<CompanyData>();
  allcompanies: CompanyData[];
  private searchTerms = new Subject<string>();
  constructor(private companyService:CompanyService, private router:Router) { }

  ngOnInit() {
    this.getCompanies();
  }

  getCompanies(){
    this.companyService.getCompanies()
    .subscribe(companies =>{
      this.allcompanies = companies;
      for(var i=0;i<this.allcompanies.length;i++){
         this.companies.push(this.allcompanies[i]); 
      }
    });
  }
  
  search(searchName:string){
    this.companies = [];
    for(var i=0;i<this.allcompanies.length;i++){
      if(this.allcompanies[i].companyName.includes(searchName)){
          this.companies.push(this.allcompanies[i]); 
      }
   }
  }

  changeBg(seqId:number){
    var vList = $("tbody").find("tr");
    for(var i=0;i<vList.length;i++){
      if(i == seqId){
        vList[i].className = "bg-info";
      }else{
        vList[i].className = "";
      }
    }
  }

  goDetail(company:CompanyData) {
    this.router.navigate(['/editCompany',company.id]);
  }

}
