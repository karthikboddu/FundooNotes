import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ServiceUrlService } from '../serviceUrl/service-url.service';

@Injectable({
  providedIn: 'root'
})
export class LabelService {

  constructor(private http :HttpClient,private serviceurl:ServiceUrlService) { }


  setLabel(id,labelname){
    let label = new FormData();
    label.append("uid",id);
    label.append("label",labelname.labelname);
    return this.http.post(this.serviceurl.host+this.serviceurl.setlabel,label);
  }

  fetchLabel(uid){
    let label = new FormData();
    label.append("uid",uid);
    return this.http.post(this.serviceurl.host+this.serviceurl.fetchlabel,label);
  }
}
