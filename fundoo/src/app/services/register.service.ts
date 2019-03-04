import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Register} from '../models/register';
import { debug } from 'util';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient ) { }
  baseUrl : string ="http://localhost/codeigniter/register"


  createuser(register:Register){
    let createuser = new FormData();
    debugger
    createuser.append("firstName",register.firstName);
    createuser.append("lastName",register.lastName);
    createuser.append("Emailid",register.Emailid);
    createuser.append("password",register.password);
    
    return this.http.post(this.baseUrl,createuser);
  }
}
