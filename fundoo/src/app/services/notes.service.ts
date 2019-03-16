import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ServiceUrlService} from '../serviceUrl/service-url.service';
@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private http :HttpClient,private serviceurl:ServiceUrlService) { 

  }

  createNotes(notes){
      let createnotes = new FormData();
      createnotes.append("title",notes.title);
      createnotes.append("desc",notes.desc);
      return this.http.post(this.serviceurl.host+this.serviceurl.createnotes,createnotes);

  }


  fetchNotes(){
    return this.http.get(this.serviceurl.host+this.serviceurl.fetchnotes);
  }
}
