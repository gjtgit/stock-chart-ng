import { Component, OnInit } from '@angular/core';
import { ExchangeData } from '../exchangeData';
import { Router } from '@angular/router';
import { ExchangeService } from '../exchange.service';
import $ from 'jquery';

@Component({
  selector: 'app-manage-exchange',
  templateUrl: './manage-exchange.component.html',
  styleUrls: ['./manage-exchange.component.css']
})
export class ManageExchangeComponent implements OnInit {
  warninfo:string="";
  exchanges: ExchangeData[];
  constructor(private exchangeService:ExchangeService, private router:Router) { }

  ngOnInit() {
    this.getExchanges();
  }

  getExchanges(){
    this.exchangeService.getExchanges()
      .subscribe(exchanges => this.exchanges = exchanges);
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
