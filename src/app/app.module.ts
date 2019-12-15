import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { FileUploadModule } from 'ng2-file-upload';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './user-info/user-info.component';
import { CompareChartComponent } from './compare-chart/compare-chart.component';
import { FusionChartsModule} from 'angular-fusioncharts';
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

FusionChartsModule.fcRoot(FusionCharts, Charts, FusionTheme);


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    UserComponent,
    ImportDataComponent,
    ManageCompanyComponent,
    ManageExchangeComponent,
    ManageIpoComponent,
    LoginComponent,
    IposComponent,
    RegisterComponent,
    AddExchangeComponent,
    EditCompanyComponent,
    EditIpoComponent,
    UserInfoComponent,
    CompareChartComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    FileUploadModule,
    FusionChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
