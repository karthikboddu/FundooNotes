import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Register} from '../models/register';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient ) { }
  baseUrl : string ="http://localhost/codeigniter/insert"


  createuser(register:Register){
    
    return this.http.post<any>(this.baseUrl,register);
  }
}
