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

import { ForgotpasswordComponent } from './component/forgotpassword/forgotpassword.component';
import { ResetComponent } from './component/reset/reset.component';

import { HomeComponent } from './component/home/home.component';
import { NotesComponent } from './component/notes/notes.component';
import { DialogComponent } from './component/dialog/dialog.component';
import { DialogdataComponent } from './component/dialogdata/dialogdata.component';
import { CollabaratorComponent } from './component/collabarator/collabarator.component';
import { EditnotesComponent } from './component/editnotes/editnotes.component';

import { ReminderComponent } from './component/reminder/reminder.component';
import { ArchiveComponent } from './component/archive/archive.component';
import { LabelsComponent } from './component/labels/labels.component';

import { CookieService } from 'ngx-cookie-service';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotpasswordComponent,
    ResetComponent,

    HomeComponent,

    NotesComponent,

    DialogComponent,

    DialogdataComponent,

    CollabaratorComponent,

    EditnotesComponent,

    ReminderComponent,

    ArchiveComponent,

    LabelsComponent,
   
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
  providers: [RegisterService,CookieService],
  bootstrap: [AppComponent],
  entryComponents : [EditnotesComponent,LabelsComponent]
})
export class AppModule { }
