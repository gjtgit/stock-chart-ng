import { Component, OnInit } from '@angular/core';
import { UserData } from '../userData';
import { StockService } from '../stock.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  userData:UserData = new UserData();
  warninfo:string = "";
  constructor(private stockService:StockService, private router:Router) { }

  ngOnInit() {
    let token = sessionStorage.getItem("jsessionid");
    let tokenJson = JSON.parse(token);
    if(token === null || tokenJson.expires_in < new Date().getTime()){
      this.router.navigateByUrl("/login");
      return;
    }else{
      this.stockService.getLoginUserData().subscribe(user=>this.userData = user);
    }
    
  }

  save(){
    if(!this.userData.password2 || this.userData.password2.trim().length===0){
      this.warninfo="Please re-enter password!";
      return;
    }else{  
      if(this.userData.password != this.userData.password2){
        this.warninfo="The two passwords don't match!";
        return;
      }
    }
    this.stockService.updateUser(this.userData).subscribe(result=>{
      console.log(result);
      this.warninfo="Update user successfully.";
    });
  }

}
