import { Component, OnInit } from '@angular/core';
import { CompanyData } from '../companyData';
import { CompanyService } from '../company.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css']
})
export class EditCompanyComponent implements OnInit {
  companyData:CompanyData = new CompanyData();
  warninfo:string="";
  isAdd:boolean = true;
  constructor(private companyService:CompanyService, private router:Router, private $location:Location) { }

  ngOnInit() {
    const path = this.$location.path();
    let id = path.substr(path.lastIndexOf("/")+1);
    if(id != "addCompany"){
      this.isAdd = false;
      this.getData(id);
    }
  }

  getData(id:string){
    this.companyService.getCompany(id).subscribe(company => {
      this.companyData = company;
      console.log(company);
    });
  }

  saveData(companyData:CompanyData){
    if(this.isAdd){
      this.companyService.addCompany(this.companyData).subscribe(company => {
        this.companyData = company;
        this.warninfo="Add company sucessfully.";
        this.router.navigateByUrl("manageCompany");
      });
    }else{
      this.companyService.updateCompany(this.companyData).subscribe(company => {
        this.warninfo="Update company sucessfully.";
      });
    }
  }
}
