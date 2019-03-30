import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ServiceUrlService } from '../serviceUrl/service-url.service';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {

  constructor(private http:HttpClient,private serviceurl:ServiceUrlService) { }

  fetchreminders(uid){
    let remobs = new FormData();
    remobs.append("uid",uid);
    return this.http.post(this.serviceurl.host+this.serviceurl.fetchrem,remobs);
  }

}
