import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Login} from '../models/login.model';
import {ServiceUrlService} from '../serviceUrl/service-url.service';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  /**
   * @param http 
   */
  constructor(private http :HttpClient,private serviceurl:ServiceUrlService) { }
  baseUrl : string ="http://localhost/codeigniter/loginto"

  /**
   * @param users 
   * @method getuser
   * @description method to call api throught httpclient 
   */
  getuser(users:Login){
    let getuser = new FormData();
    getuser.append("Emailid",users.Emailid);
    getuser.append("password",users.password);

   return this.http.post(this.baseUrl,getuser);
  }

  forgotpass(user:Login){
    let forgot = new FormData();
    forgot.append("Emailid",user.Emailid);

    return this.http.post(this.serviceurl.host+this.serviceurl.forgot,forgot);
  }

}
