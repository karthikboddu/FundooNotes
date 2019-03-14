import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { DashboradComponent } from './component/dashborad/dashborad.component';
import { ForgotpasswordComponent } from './component/forgotpassword/forgotpassword.component';
import { ResetComponent } from './component/reset/reset.component';
import { SampleComponent } from './sample/sample.component';

const routes: Routes = [
  {path : 'login',component : LoginComponent},
  {path :'register',component :RegisterComponent},
  {path :'dashboard',component: DashboradComponent},
  {path :'forgot',component:ForgotpasswordComponent},
  {path :'reset' ,component:ResetComponent},
  {path:'sample',component:SampleComponent},
  {path : '' ,component :LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
