import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';

import { ForgotpasswordComponent } from './component/forgotpassword/forgotpassword.component';
import { ResetComponent } from './component/reset/reset.component';
import { HomeComponent } from './component/home/home.component';
import { NotesComponent } from './component/notes/notes.component';
import {AuthGuardService as AuthGuard } from './services/authguard.service';
import { DialogComponent } from './component/dialog/dialog.component';
import { DialogdataComponent } from './component/dialogdata/dialogdata.component';

import { ReminderComponent } from './component/reminder/reminder.component';
import { ArchiveComponent } from './component/archive/archive.component';
import { LabelsdisplayComponent } from './component/labelsdisplay/labelsdisplay.component';
import { TrashComponent } from './component/trash/trash.component';
import { SearchComponent } from './component/search/search.component';

const routes: Routes = [
  {path : 'login',component : LoginComponent},
  {path :'register',component :RegisterComponent},
  {path :'forgot',component:ForgotpasswordComponent},
  {path :'reset' ,component:ResetComponent},
  {path:'home',component:HomeComponent,
           children : [
              { path:'',component:NotesComponent},
              { path:'notes',component:NotesComponent},
             {path:'reminder',component:ReminderComponent},
             {path:'archive',component:ArchiveComponent},
             {path:'labelsdisplay',component:LabelsdisplayComponent},
             {path:'trash',component:TrashComponent},
            {path:'search',component:SearchComponent}
            ],
 
    },
  {path : '' ,component :LoginComponent},
 
  {path:'dialog',component:DialogComponent},
  {path:'dialogdata',component:DialogdataComponent},

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
