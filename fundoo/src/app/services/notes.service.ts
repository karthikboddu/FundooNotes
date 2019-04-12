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
  createNotes(notes,id,time){
  //  this.tokens= localStorage.getItem('token');
  //   headses.set('Authorization',this.tokens);
      let createnotes = new FormData();
      createnotes.append("id",id);
      createnotes.append("title",notes.title);
      createnotes.append("desc",notes.desc);
      createnotes.append("remainder",time);
      createnotes.append("color",notes.color);
      createnotes.append("labelid",notes.lid);
      let headers_object = new HttpHeaders().set("Authorization",
			
      localStorage.getItem("token")
    );

      // var httpOptions={ headers: new HttpHeaders({ 'Content-Type': 'application/json'})};
      // httpOptions.headers = httpOptions.headers.append('Token', localStorage.getItem('token'));

      console.log(headers_object);
      return this.http.post(this.serviceurl.host+this.serviceurl.createnotes,createnotes,{headers:headers_object});

  }


  fetchNotes(data){
    let emaildata = new FormData();
     emaildata.append("id",data);
      
    return this.http.post(this.serviceurl.host+this.serviceurl.fetchnotes,emaildata);
  }

  updateNotes(data,id){
    debugger
    let update = new FormData();
    update.append("title",data.notesdata.title);
    update.append("description",data.notesdata.description);
    update.append("color",data.notesdata.color);
    update.append("uid",id);
    return this.http.post(this.serviceurl.host+this.serviceurl.updatenotes,update);
  }

	/**
	 * @method dateTimeChange()
	 * @return observable data
	 * @param otherPresentTime
	 * @param id
	 * @description Function to send otherPresentTime and id to server
	 */
	dateTimeChange(id, otherPresentTime) {
		debugger;
		let DataTime = new FormData();
		DataTime.append("id", id);
		DataTime.append("presentDateTime", otherPresentTime);
		return this.http.post(
			this.serviceurl.host + this.serviceurl.changeDateTime,
			DataTime
		);
	}

  notesCrud(id,color,flag){
    let setcol = new FormData();
    setcol.append("id",id);
    setcol.append("color",color);
    setcol.append("flag",flag);
    return this.http.post(this.serviceurl.host+this.serviceurl.setcolor,setcol);
  }




  reminderFetch(){
    
  }

  notedtrash(id){
    let del = new FormData();
    del.append("id",id);
    return this.http.post(this.serviceurl.host+this.serviceurl.notetrash,del);
  }


  notedelete(id){
    let del = new FormData();
    del.append("id",id);
    return this.http.post(this.serviceurl.host+this.serviceurl.notedelete,del);
  }

  restorenote(id){
    let restore = new FormData();
    restore.append("id",id);
    return this.http.post(this.serviceurl.host+this.serviceurl.restorenote,restore);
  }


  trashnote(id){
    let trash = new FormData();
    trash.append("id",id);
    return this.http.post(this.serviceurl.host+this.serviceurl.fetchtrash,trash);
  }

  imagesave(base64,uid,noteid){
    let image = new FormData();
    image.append("base64",base64);
    image.append("uid",uid);
    image.append("noteid",noteid);

    return this.http.post(this.serviceurl.host+this.serviceurl.noteimagesave,image);

  }

}
