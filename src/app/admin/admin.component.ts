import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StockService } from '../stock.service';
import { UserData } from '../userData';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private stockService:StockService, private router:Router) { 
    let token = sessionStorage.getItem("jsessionid");
    let tokenJson = JSON.parse(token);
    if(token === null || tokenJson.expires_in < new Date().getTime()){
      this.navToLogin(router);
    }
    let userType = sessionStorage.getItem("usertype");
    if(userType && userType !== 'admin'){
      this.navToLogin(router);
    }
  }

  private navToLogin(router: Router) {
    router.navigateByUrl("/login");
  }

  ngOnInit() {
  }

  getLoginUser(){
    let userData = new UserData();
    userData.username='admin';
    userData.password='admin';

    // this.stockService.getLoginUser(userData).substribe(result=>{
    //   console.log(result);
    //   sessionStorage.setItem("loginUser", JSON.stringify(result));

    // });
    this.stockService.getLoginUser(userData).subscribe(result=>{
      console.log(result);
    });
  }

  test(){
    this.stockService.test();
  }
  test2(){
    this.stockService.test2();
  }
  test3(){
    this.stockService.test3();
  }
}
