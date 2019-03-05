import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Login} from '../models/login';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http :HttpClient) { }
  baseUrl : string ="http://localhost/codeigniter/loginto"

  getuser(users:Login){
    let getuser = new FormData();
    getuser.append("Emailid",users.Emailid);
    getuser.append("password",users.password);

   return this.http.post(this.baseUrl,getuser);
  }

}
