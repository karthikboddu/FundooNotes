import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {ServiceUrlService} from '../serviceUrl/service-url.service';
import { Login } from '../models/login.model';
@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private http :HttpClient,private serviceurl:ServiceUrlService) { 

  }
  tokens;
  createNotes(notes,email,time){
    let headses=  new  HttpHeaders().set("Authorization",localStorage.getItem('token'));
  //  this.tokens= localStorage.getItem('token');
  //   headses.set('Authorization',this.tokens);
      let createnotes = new FormData();
      createnotes.append("email",email);
      createnotes.append("title",notes.title);
      createnotes.append("desc",notes.desc);
      createnotes.append("remainder",time);
      
      return this.http.post(this.serviceurl.host+this.serviceurl.createnotes,createnotes,
        {headers:headses});

  }


  fetchNotes(data){
    let emaildata = new FormData();
     emaildata.append("email",data);
      
    return this.http.post(this.serviceurl.host+this.serviceurl.fetchnotes,emaildata);
  }
}
