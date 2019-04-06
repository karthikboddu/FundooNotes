import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import {
	AuthService,
	FacebookLoginProvider,
	GoogleLoginProvider
} from "angular-6-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  submitted = false;
  loginform: FormGroup;

  /**
   * @param formBuilder 
   * @param loginservice 
   * @param route 
   */
  constructor(private formBuilder: FormBuilder, private loginservice: LoginService,
    private socialAuthService: AuthService,private cookieserv:CookieService ,private route: Router) { }

  errormsg: string = "";
  tokens;
  /**
   * @description to validate form group value
   */
  ngOnInit() {
    this.loginform = this.formBuilder.group({
      Emailid: [null, [Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: [null, [Validators.required]]
    });
  }


  /**
 * @method submitForm()
 * @param value 
 * @description function to call login serivce and give repsonse back of api
 */

  submitForm(value: any) {
    debugger
    this.submitted = true;
    if(this.loginform.invalid){
      return;
    }
    console.log(value);
    let status = this.loginservice.getuser(value);
    status.subscribe((res: any) => {
    debugger;
      console.log(res.message);
      this.cookieserv.set("email",value.Emailid);
      if (res.message == "200") {
        let headers: HttpHeaders = new HttpHeaders();
        headers.set("Authorization",value.Emailid);
        localStorage.setItem('email',value.Emailid);
        this.tokens = res.token;
        
      this.route.navigate(["/home"]);
      localStorage.setItem('token',this.tokens);
      } else if (res.message == "204") {
        this.errormsg = "login failed";
      }
    });


  }

  public socialSignIn(socialPlatform : string) {
    debugger
    let socialPlatformProvider;
    if(socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }else if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform+" sign in data : " , userData);
        // Now sign-in with userData   
        this.saveSocialUser(userData.name,userData.email,userData.image,userData.token)

      }
    );
  }

  message
saveSocialUser(name,email,image,token){
  debugger
    let socialres = this.loginservice.socialLogin(email,name);
    socialres.subscribe((res:any)=>{
      debugger
      console.log(res);
      if(res.message=="200"){ 
        this.cookieserv.set("email",email);
        this.cookieserv.set("image",image);
        localStorage.setItem("token",token);
        
        this.route.navigate(["/home"]);
      }
    })
}
  
}
