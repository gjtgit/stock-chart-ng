import { Component, OnInit } from '@angular/core';
import { UserData } from '../userData';
import { Router } from '@angular/router';
import { TokenService } from '../token.service';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  warninfo:string="";
  constructor(private router:Router, private tokenService:TokenService, private stockService:StockService) { }

  userData:UserData = new UserData();
  error=false;
  expires_in:number;
  
  ngOnInit() {
  }

  login(){
    if(this.userData.username && this.userData.password){
      this.stockService.getLoginUser(this.userData).subscribe(result=>{
        if(!result){
          this.warninfo = "Wrong username or password!";
          return;
        }
        if(result.confirmed === 0 ){
          this.warninfo = "Please go to the email to activate your account.";
        }else{
          sessionStorage.setItem("usertype",result.userType);
          sessionStorage.setItem("username",result.username);
          this.tokenService.getToken(this.userData).subscribe(token=>{
            token.expires_in = new Date().getTime() + token.expires_in*1000;
            this.expires_in = new Date().getTime() + 3000;
            sessionStorage.setItem("jsessionid", JSON.stringify(token));
            
            if(result.userType === 'admin'){
              this.router.navigateByUrl('/admin');
            }else if(result.userType === 'user'){
              this.router.navigateByUrl('/user');
            }
          }, error => this.error = true);
  
        }
      });
      
    }
  }
  
}
