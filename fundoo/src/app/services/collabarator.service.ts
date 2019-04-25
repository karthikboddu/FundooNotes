import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceUrlService } from '../serviceUrl/service-url.service';

@Injectable({
  providedIn: 'root'
})
export class CollabaratorService {

  constructor(private http :HttpClient,private serviceurl:ServiceUrlService ) { }

  emailCheck(email){
    let check = new FormData();
    check.append("email",email);
    return this.http.post(this.serviceurl.host+this.serviceurl.emailCheck,check);
  }

  addCollabarator(uid,collemail,noteid){
    let addcoll = new FormData();
    addcoll.append("owneruid",uid);
    addcoll.append("collemail",collemail);
    addcoll.append("noteid",noteid);
    return this.http.post(this.serviceurl.host+this.serviceurl.addCollabarator,addcoll);
  }

}
