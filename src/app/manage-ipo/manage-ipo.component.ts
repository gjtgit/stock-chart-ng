import { Component, OnInit } from '@angular/core';
import $ from 'jquery';
import { CompanyData } from '../companyData';
import { Router } from '@angular/router';
import { CompanyService } from '../company.service';
import { IpoData } from '../ipoData';

@Component({
  selector: 'app-manage-ipo',
  templateUrl: './manage-ipo.component.html',
  styleUrls: ['./manage-ipo.component.css']
})
export class ManageIpoComponent implements OnInit {
  warninfo:string="";
  ipoes: IpoData[];
  constructor(private companyService:CompanyService, private router:Router) { }

  ngOnInit() {
    this.getIpoes();
  }

  getIpoes(){
    this.companyService.getIpoes()
      .subscribe(ipoes => this.ipoes = ipoes);
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

  goDetail(ipo:IpoData) {
    this.router.navigate(['/editIpo',ipo.id]);
  }

}
