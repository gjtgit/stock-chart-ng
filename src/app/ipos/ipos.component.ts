import { Component, OnInit } from '@angular/core';
import { IpoData } from '../ipoData';
import { CompanyService } from '../company.service';
import $ from "jquery";

@Component({
  selector: 'app-ipos',
  templateUrl: './ipos.component.html',
  styleUrls: ['./ipos.component.css']
})
export class IposComponent implements OnInit {

  warninfo:string="";
  ipoes: IpoData[];
  constructor(private companyService:CompanyService) { }

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


}
