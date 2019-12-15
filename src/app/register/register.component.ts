import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../token.service';
import { StockService } from '../stock.service';
import { UserData } from '../userData';
import { isError } from 'util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userData:UserData = new UserData();
  warninfo:string = "";
  activateCode:string = "";
  constructor(private router:Router, private tokenService:TokenService, private stockService:StockService) { }

  ngOnInit() {
  }

  register(){
    this.userData.userType = "user";
    this.stockService.register(this.userData).subscribe(result=>{
      console.log(result);
      this.warninfo="Register successfully, a link has sent to your email. Please go to activate your account.";
    });
  }

  activateUser(){
    this.stockService.activateUser(this.activateCode).subscribe(result=>{
      console.log(result);
      this.warninfo="Activated, please login."
      
    })
  }
}
