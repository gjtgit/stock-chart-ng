import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'stock-chart';
  constructor(private router:Router){}

  logout(){
    sessionStorage.removeItem("jsessionid");
    sessionStorage.removeItem("usertype");
    sessionStorage.removeItem("username");
    this.router.navigateByUrl("");
  }
}
