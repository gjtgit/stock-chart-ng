import { Component, OnInit } from '@angular/core';
import { IpoData } from '../ipoData';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CompanyService } from '../company.service';
import { ExchangeService } from '../exchange.service';
import { ExchangeData } from '../exchangeData';
import { CompanyData } from '../companyData';

@Component({
  selector: 'app-edit-ipo',
  templateUrl: './edit-ipo.component.html',
  styleUrls: ['./edit-ipo.component.css']
})
export class EditIpoComponent implements OnInit {
  ipoData:IpoData = new IpoData();
  exchanges: ExchangeData[];
  companies: CompanyData[];
  warninfo:string="";
  isAdd:boolean = true;
  constructor(private companyService:CompanyService, private router:Router, 
    private $location:Location, private exchangeService:ExchangeService) { }

  ngOnInit() {
    const path = this.$location.path();
    let id = path.substr(path.lastIndexOf("/")+1);
    if(id != "addIpo"){
      this.isAdd = false;
      this.getData(id);
    }
    this.getExchanges();
    this.getComapanies();
  }

  getExchanges(){
    this.exchangeService.getExchanges()
      .subscribe(exchanges =>{
      this.exchanges = exchanges;
    });
  }
  getComapanies(){
    this.companyService.getCompanies()
      .subscribe(companies =>{
      this.companies = companies;
    });
  }

  getData(id:string){
    this.companyService.getIpo(id).subscribe(ipo =>{
       this.ipoData = ipo;
       console.log(ipo);
    });
  }

  saveData(ipoData:IpoData){
    if(this.isAdd){
      this.companyService.addIpo(this.ipoData).subscribe(Ipo => {
        this.ipoData = Ipo;
        this.warninfo="Add Ipo sucessfully.";
        this.router.navigateByUrl("manageIpo");
      });
    }else{
      console.log(this.ipoData);
      this.companyService.updateIpo(this.ipoData).subscribe(Ipo => {
        this.warninfo="Update Ipo sucessfully.";
      });
    }
  }
}
