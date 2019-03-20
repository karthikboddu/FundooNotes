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
    
  //  this.tokens= localStorage.getItem('token');
  //   headses.set('Authorization',this.tokens);
      let createnotes = new FormData();
      createnotes.append("email",email);
      createnotes.append("title",notes.title);
      createnotes.append("desc",notes.desc);
      createnotes.append("remainder",time);
      var httpOptions={ headers: new HttpHeaders({ 'Content-Type': 'application/json'})};
      httpOptions.headers = httpOptions.headers.append('Token', localStorage.getItem('token'));

      //  var headerss=  new  HttpHeaders().set("Authorization",localStorage.getItem('token'));
 

      return this.http.post(this.serviceurl.host+this.serviceurl.createnotes,createnotes,httpOptions );

  }


  fetchNotes(data){
    let emaildata = new FormData();
     emaildata.append("email",data);
      
    return this.http.post(this.serviceurl.host+this.serviceurl.fetchnotes,emaildata);
  }
}
