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

import { CollabaratorComponent } from './component/collabarator/collabarator.component';
import { EditnotesComponent } from './component/editnotes/editnotes.component';

import { ReminderComponent } from './component/reminder/reminder.component';
import { ArchiveComponent } from './component/archive/archive.component';
import { LabelsComponent } from './component/labels/labels.component';
import { AuthService as auth } from "./services/auth.service";
import { CookieService } from 'ngx-cookie-service';
import {CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import {
	AuthService as social,
	SocialLoginModule,
	AuthServiceConfig,
  AuthService
} from "angular-6-social-login";;
import { getAuthServiceConfigs } from './socialloginconfig';

import { LabelsdisplayComponent } from './component/labelsdisplay/labelsdisplay.component';
import { TrashComponent } from './component/trash/trash.component';
import { SearchComponent } from './component/search/search.component';
import { SearchPipe } from './pipe/search.pipe';
import { PushNotificationService } from 'ngx-push-notifications';
import { messaging } from 'firebase';
import { MessagingService } from './messaging.service';

import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { environment } from '../environments/environment';
import { AsyncPipe } from '../../node_modules/@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotpasswordComponent,
    ResetComponent,

    HomeComponent,

    NotesComponent,

    CollabaratorComponent,

    EditnotesComponent,

    ReminderComponent,

    ArchiveComponent,

    LabelsComponent,

    LabelsdisplayComponent,

    TrashComponent,

    SearchComponent,

    SearchPipe,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CustomMaterial,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
  
    DragDropModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),

  ],
  providers: [RegisterService,CookieService,SocialLoginModule,AuthService,PushNotificationService,AsyncPipe,MessagingService,
		auth,
		{
			provide: AuthServiceConfig,
			useFactory: getAuthServiceConfigs
		}],
  bootstrap: [AppComponent],
  entryComponents : [EditnotesComponent,LabelsComponent,CollabaratorComponent]
})
export class AppModule { }
