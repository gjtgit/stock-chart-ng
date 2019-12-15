import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';
import { ExchangeService } from '../exchange.service';
import { CompanyData } from '../companyData';
import { ExchangeData } from '../exchangeData';
import { SectorData } from '../sectorData';
import { isError } from 'util';
import { Location } from '@angular/common';
import { CompanyPriceData } from '../companyPriceData';
import { SectorPriceData } from '../sectorPriceData';
import { SectorService } from '../sector.service';
import { ExcelService } from '../excel.service';

@Component({
  selector: 'app-compare-chart',
  templateUrl: './compare-chart.component.html',
  styleUrls: ['./compare-chart.component.css']
})
export class CompareChartComponent implements OnInit {
  warninfo:string="";
  isAddOneMore:boolean = false;
  selCompareType1:string = "";
  exId:string = "";
  companyId1:string="";
  sectorId1:string="";
  fromDatetime:string="";
  toDatetime:string="";
  selCompareType2:string = "";
  companyId2:string="";
  sectorId2:string="";

  companies:CompanyData[] = [];
  exchanges:ExchangeData[] = [];
  sectors:SectorData[] = [];

  companyPriceData1:CompanyPriceData[] = [];
  sectorPriceData1:SectorPriceData[] = [];
  companyPriceData2:CompanyPriceData[] = [];
  sectorPriceData2:SectorPriceData[] = [];
  
  constructor(
    private companyService:CompanyService, 
    private exchangeService:ExchangeService,
    private sectorService:SectorService,
    private $location:Location,
    private excelService:ExcelService
  ) { }

  ngOnInit() {
    this.getExchanges();
    this.getComapanies();
    this.getSectors();
    const path = this.$location.path();
    let type = path.substr(path.lastIndexOf("/")+1);
    this.selCompareType2 = type;
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

  getSectors(){
    this.sectorService.getSectors()
      .subscribe(result =>{
      this.sectors = result;
    });
  }

  addOneMore(){
    this.isAddOneMore = true;
  }

  removeOne(){
    this.isAddOneMore = false;
  }

  generateMap(){
    if(this.selCompareType1 === 'Company'){
      this.companyService.getCompanyStockPrice(this.companyId1,this.exId,this.fromDatetime,this.toDatetime)
      .subscribe(result=>{
        console.log(result);
        if(!isError(result)){
          this.companyPriceData1 = result;
          this.setChart1Data();
        }
      });
    }else if(this.selCompareType1 === 'Sector'){
      this.sectorService.getSectorStockPrice(this.sectorId1,this.exId,this.fromDatetime,this.toDatetime)
      .subscribe(result=>{
        console.log(result);
        if(!isError(result)){
          this.sectorPriceData1 = result;
          this.setChart1Data();
        }
      });
    }

    if(this.isAddOneMore){
      this.chartW = 500;
      if(this.selCompareType2 === 'Company'){
        this.companyService.getCompanyStockPrice(this.companyId2,this.exId,this.fromDatetime,this.toDatetime)
        .subscribe(result=>{
          console.log(result);
          if(!isError(result)){
            this.companyPriceData2 = result;
            this.setChart2Data();
          }
        });
      }else if(this.selCompareType2 === 'Sector'){
        this.sectorService.getSectorStockPrice(this.sectorId2,this.exId,this.fromDatetime,this.toDatetime)
        .subscribe(result=>{
          console.log(result);
          if(!isError(result)){
            this.sectorPriceData2 = result;
            this.setChart2Data();
          }
        });
      }

    }else{
      this.chartW = 1000;
    }

  }
  
  showInOne:string = "n";
  chartType:string = "Column2D";//"Column2D";
  chartW:number = 1000;
  chartH:number = 450;
  chart1Data:Object[] = [];
  chart2Data:Object[] = [];
  dataSource1:Object={};
  dataSource2:Object={};

  setChart1Data(){
    this.chart1Data = [];
    if(this.selCompareType1 === 'Company'){
      if(this.companyPriceData1!=null){
        for(var i=0;i<this.companyPriceData1.length;i++){
          let d:Object = { label: this.companyPriceData1[i].curDate, value: this.companyPriceData1[i].curPrice };
          this.chart1Data.push(d);
        }
      }
    }else if (this.selCompareType1 === 'Sector'){
      if(this.sectorPriceData1!=null){
        for(var i=0;i<this.sectorPriceData1.length;i++){
          let d:Object = { label: this.sectorPriceData1[i].curDate, value: this.sectorPriceData1[i].curPrice };
          this.chart1Data.push(d);
        }
      }
    }

    this.dataSource1 = {
      chart: {
        caption: 'Stock price chart 1 - '+this.selCompareType1,
        subCaption: this.selCompareType1,
        xAxisName: 'Date',
        yAxisName: 'Stock price',
        numberSuffix: ' Rs',
        theme: 'fusion'
      },
      data: this.chart1Data
    };

  }

  setChart2Data(){
    this.chart2Data = [];
    if(this.selCompareType2 === 'Company'){
      if(this.companyPriceData2!=null){
        for(var i=0;i<this.companyPriceData2.length;i++){
          let d:Object = { label: this.companyPriceData2[i].curDate, value: this.companyPriceData2[i].curPrice };
          this.chart2Data.push(d);
        }
      }  
    }else if (this.selCompareType2 === 'Sector'){
      if(this.sectorPriceData2!=null){
        for(var i=0;i<this.sectorPriceData2.length;i++){
          let d:Object = { label: this.sectorPriceData2[i].curDate, value: this.sectorPriceData2[i].curPrice };
          this.chart2Data.push(d);
        }
      }
    }

    this.dataSource2 = {
      chart: {
        caption: 'Stock price chart 2 - '+this.selCompareType2,
        subCaption: this.selCompareType2,
        xAxisName: 'Date',
        yAxisName: 'Stock price',
        numberSuffix: ' Rs',
        theme: 'fusion'
      },
      data: this.chart2Data
    };

  }


  exportToExcel1(){
    if(this.selCompareType1 === 'Company'){
      if(this.companyPriceData1.length == 0){
        this.warninfo = "please generate map first then export to excel";
        return;
      }
      this.excelService.exportAsExcelFile('StockPriceChart1-Company', this.companyPriceData1);
    }else if(this.selCompareType1 === 'Sector'){
      if(this.sectorPriceData1.length == 0){
        this.warninfo = "please generate map first then export to excel";
        return;
      }
      this.excelService.exportAsExcelFile('StockPriceChart1-Sector', this.sectorPriceData1);
    }  
　}

  exportToExcel2(){
    if(this.selCompareType2 === 'Company'){
      if(this.companyPriceData2.length == 0){
        this.warninfo = "please generate map first then export to excel";
        return;
      }
      this.excelService.exportAsExcelFile('StockPriceChart2-Company', this.companyPriceData2);
    }else if(this.selCompareType2 === 'Sector'){
      if(this.sectorPriceData2.length == 0){
        this.warninfo = "please generate map first then export to excel";
        return;
      }
      this.excelService.exportAsExcelFile('StockPriceChart2-Sector', this.sectorPriceData2);
    }
　}  

}
