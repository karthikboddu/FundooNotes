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

  pushRemainder(title,desc){
    let pushRem = new FormData();
    pushRem.append("title",title);
    pushRem.append("desc",desc);
    let headers_object = new HttpHeaders().set("Authorization",
			
    localStorage.getItem("fcm"))

    return this.http.post(this.serviceurl.firebase,pushRem,{headers:headers_object});

    }

}
