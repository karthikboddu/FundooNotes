import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';

import { ForgotpasswordComponent } from './component/forgotpassword/forgotpassword.component';
import { ResetComponent } from './component/reset/reset.component';
import { HomeComponent } from './component/home/home.component';
import { NotesComponent } from './component/notes/notes.component';

import { DialogComponent } from './component/dialog/dialog.component';
import { DialogdataComponent } from './component/dialogdata/dialogdata.component';

import { ReminderComponent } from './component/reminder/reminder.component';
import { ArchiveComponent } from './component/archive/archive.component';
import { LabelsdisplayComponent } from './component/labelsdisplay/labelsdisplay.component';
import { TrashComponent } from './component/trash/trash.component';
import { SearchComponent } from './component/search/search.component';
import { AuthguardService } from './authguard.service';

const routes: Routes = [
  {path : 'login',component : LoginComponent,canActivate: [AuthguardService]},
  {path :'register',component :RegisterComponent,canActivate: [AuthguardService]},
  {path :'forgot',component:ForgotpasswordComponent,canActivate: [AuthguardService]},
  {path :'reset' ,component:ResetComponent,canActivate: [AuthguardService]},
  {path:'home',component:HomeComponent,
           children : [
              { path:'',component:NotesComponent,canActivate: [AuthguardService]},
              { path:'notes',component:NotesComponent,canActivate: [AuthguardService]},
             {path:'reminder',component:ReminderComponent,canActivate: [AuthguardService]},
             {path:'archive',component:ArchiveComponent,canActivate: [AuthguardService]},
             {path:'labelsdisplay',component:LabelsdisplayComponent,canActivate: [AuthguardService]},
             {path:'trash',component:TrashComponent,canActivate: [AuthguardService]},
            {path:'search',component:SearchComponent,canActivate: [AuthguardService]}
            ],
 
    },
  {path : '' ,component :LoginComponent,canActivate: [AuthguardService]},
 
  {path:'dialog',component:DialogComponent},
  {path:'dialogdata',component:DialogdataComponent},

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
