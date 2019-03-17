import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ServiceUrlService} from '../serviceUrl/service-url.service';
import { Login } from '../models/login.model';
@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private http :HttpClient,private serviceurl:ServiceUrlService) { 

  }

  createNotes(notes,email){
      let createnotes = new FormData();
      createnotes.append("email",email);
      createnotes.append("title",notes.title);
      createnotes.append("desc",notes.desc);
      return this.http.post(this.serviceurl.host+this.serviceurl.createnotes,createnotes);

  }


  fetchNotes(data){
    let emaildata = new FormData();
     emaildata.append("email",data);
      
    return this.http.post(this.serviceurl.host+this.serviceurl.fetchnotes,emaildata);
  }
}
