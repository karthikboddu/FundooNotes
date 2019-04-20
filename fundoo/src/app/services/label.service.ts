import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ServiceUrlService } from '../serviceUrl/service-url.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LabelService {

  constructor(private http :HttpClient,private serviceurl:ServiceUrlService) { }
  labelsubject = new Subject();

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

  deletelabel(id){
    let label = new FormData();
    label.append("id",id);
    return this.http.post(this.serviceurl.host+this.serviceurl.deletelabel,label);
  }

  labelnameSet(lname){


    this.labelsubject.next(lname);

  }

  getlname(){
      return this.labelsubject.asObservable();
    }

  getLabelNotes(lid){
    let labelnote = new FormData();
    labelnote.append("lid",lid);
  debugger
    return this.http.post(this.serviceurl.host+this.serviceurl.fetchlabelnote,labelnote);

  } 

  labelAdd(lid,notelid,uid,flag){
    let addlabel = new FormData();
    addlabel.append("uid",uid);
    addlabel.append("labelid",lid);
    addlabel.append("notelid",notelid);
    addlabel.append("flag",flag);

    return this.http.post(this.serviceurl.host+this.serviceurl.addLabel,addlabel);
  }

  labelnamebyid(id){
    let lnameid = new FormData();
    lnameid.append("lid",id)
    return this.http.post(this.serviceurl.host+this.serviceurl.labelnamebyid,lnameid);
  }


}
