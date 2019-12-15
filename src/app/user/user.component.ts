import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private router:Router) {
    let token = sessionStorage.getItem("jsessionid");
    let tokenJson = JSON.parse(token);
    if(token === null || tokenJson.expires_in < new Date().getTime()){
      this.navToLogin(router);
    }
    // if( token!=null){
    //   console.log('token is not null');
    //   console.log(tokenJson.expires_in +'   '+new Date().getTime());
    // }
    let userType = sessionStorage.getItem("usertype");
    if(userType && userType != 'user'){
      this.navToLogin(router);
    }
  }

  private navToLogin(router: Router) {
    router.navigateByUrl("/login");
  }

  ngOnInit() {
  }

}
