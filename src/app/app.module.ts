import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HeaderComponent} from "./shared";
import {HomeComponent} from "./home/home.component";
import {RouterModule} from "@angular/router";
import {CarlistComponent} from "./carlist/carlist.component";
import {CarlistModule} from "./carlist/carlist.module";
import {HomeModule} from "./home/home.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {SigninComponent, SignupComponent} from "./auth";
import {DriveComponent} from "./drive/drive.component";
import {AgmCoreModule} from "@agm/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {MatSnackBarConfig, MatSnackBarModule} from "@angular/material/snack-bar";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {UpperCasePipe} from "@angular/common";
import {UserComponent} from "./user/user.component";
import {UserlistComponent} from "./user/userlist/userlist.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CarlistComponent,
    SigninComponent,
    SignupComponent,
    DriveComponent,
    UserComponent,
    UserlistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    CarlistModule,
    HomeModule,
    FormsModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA2RgvBdLzKDWENISE5kgjJn7INAwc_6To'
    }),
    HttpClientModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatMenuModule,
    MatIconModule,
  ],
  providers: [MatSnackBarConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
