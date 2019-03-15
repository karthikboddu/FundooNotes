import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';

import { ForgotpasswordComponent } from './component/forgotpassword/forgotpassword.component';
import { ResetComponent } from './component/reset/reset.component';
import { HomeComponent } from './component/home/home.component';

const routes: Routes = [
  {path : 'login',component : LoginComponent},
  {path :'register',component :RegisterComponent},
  {path :'forgot',component:ForgotpasswordComponent},
  {path :'reset' ,component:ResetComponent},
  {path:'home',component:HomeComponent},
  {path : '' ,component :LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
