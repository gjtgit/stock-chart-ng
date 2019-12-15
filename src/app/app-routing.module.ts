import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { ImportDataComponent } from './import-data/import-data.component';
import { ManageCompanyComponent } from './manage-company/manage-company.component';
import { ManageExchangeComponent } from './manage-exchange/manage-exchange.component';
import { ManageIpoComponent } from './manage-ipo/manage-ipo.component';
import { LoginComponent } from './login/login.component';
import { IposComponent } from './ipos/ipos.component';
import { RegisterComponent } from './register/register.component';
import { AddExchangeComponent } from './add-exchange/add-exchange.component';
import { EditCompanyComponent } from './edit-company/edit-company.component';
import { EditIpoComponent } from './edit-ipo/edit-ipo.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { CompareChartComponent } from './compare-chart/compare-chart.component';

const routes: Routes = [
  { path: '',component:LoginComponent},
  { path: 'login',component:LoginComponent},
  { path: 'register',component:RegisterComponent},
  { path: 'userinfo',component:UserInfoComponent},

  { path: 'admin', component: AdminComponent },
  { path: 'importData', component: ImportDataComponent },
  { path: 'manageCompany', component: ManageCompanyComponent },
  { path: 'manageExchange', component: ManageExchangeComponent },
  { path: 'addExchange', component: AddExchangeComponent },
  { path: 'addCompany', component: EditCompanyComponent },
  { path: 'editCompany/:id', component: EditCompanyComponent },
  { path: 'addIpo', component: EditIpoComponent },
  { path: 'editIpo/:id', component: EditIpoComponent },
  
  { path: 'manageIpo', component: ManageIpoComponent },
  { path: 'user', component: UserComponent },
  { path: 'ipos', component: IposComponent },
  { path: 'compareChart', component: CompareChartComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
