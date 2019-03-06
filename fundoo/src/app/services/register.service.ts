import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceUrlService } from '../serviceUrl/service-url.service';
import { Register } from '../models/register.model';
import { debug } from 'util';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  /**
   * @param http 
   * @param serviceurl 
   */
  constructor(private http: HttpClient, private serviceurl: ServiceUrlService) { }

  /**
   * @method createuser
   * @param register 
   * @description method to call api throught httpclient service
   */
  createuser(register: Register) {
    let createuser = new FormData();
    debugger
    createuser.append("firstName", register.firstName);
    createuser.append("lastName", register.lastName);
    createuser.append("Emailid", register.Emailid);
    createuser.append("password", register.password);

    return this.http.post(this.serviceurl.host + this.serviceurl.register, createuser);
  }
}
