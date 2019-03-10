import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from "@angular/flex-layout";

import { CustomMaterial } from './material.module';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';

import {HttpClientModule} from "@angular/common/http";
import {RegisterService} from './services/register.service';
import { DashboradComponent } from './component/dashborad/dashborad.component';
import { ForgotpasswordComponent } from './component/forgotpassword/forgotpassword.component';
import { ResetComponent } from './component/reset/reset.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboradComponent,
    ForgotpasswordComponent,
    ResetComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CustomMaterial,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  providers: [RegisterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
