import { Component, OnInit } from '@angular/core';
import { ExchangeService } from '../exchange.service';
import { ExchangeData } from '../exchangeData';

@Component({
  selector: 'app-add-exchange',
  templateUrl: './add-exchange.component.html',
  styleUrls: ['./add-exchange.component.css']
})
export class AddExchangeComponent implements OnInit {
  exchangeData:ExchangeData = new ExchangeData();
  warninfo:string="";
  constructor(private exchangeService:ExchangeService) { }

  ngOnInit() {
  }

  add(){
    if(!this.exchangeData.stockExchange || this.exchangeData.stockExchange.trim() === ''){
      this.warninfo = "StockExchange can't be empty.";
      return;
    }
    this.exchangeService.addExchange(this.exchangeData).subscribe(result=>{
      //console.log(result);
      this.warninfo="Add exchange successfully.";
      //this.router.navigateByUrl('/list-exchange');
    });
  }

}
