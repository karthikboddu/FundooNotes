import { Component, OnInit } from '@angular/core';
import decode from 'jwt-decode';
import {NotesService} from '../../services/notes.service';

import { Notes } from '../../models/notes.model';
import { forEach } from '@angular/router/src/utils/collection';
@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {

  constructor(private noteserv:NotesService) { }

  ngOnInit() {
    this.trashnotes();
  }
  notes: Notes[] = [];


  trashnotes(){

    const token = localStorage.getItem('token');
    const tokenPayload = decode(token);
    const uid = tokenPayload.id;
    let remobs = this.noteserv.trashnote(uid);
    remobs.subscribe((res:any)=>{
      this.notes = res;
    })
  }

  delete(id){
    debugger
    let remobs = this.noteserv.notedelete(id);

    remobs.subscribe((res:any)=>{
      debugger
      console.log(res,"sdas");
      if(res.status=="200"){
        this.notes.forEach(element => {
          if(element.id==id){
            debugger
            console.log(element,"dss");
            element.id=''
            element.color=''
            element.email=''
            element.notes=''
            element.remainder=''
            element.title=''
            
            element.user_id=''
            this.trashnotes();
          }
      });
      }

    })
  }

  noteRestore(id,value){
  debugger
    let remobs = this.noteserv.restorenote(id);

    remobs.subscribe((res:any)=>{
      if(res.status=="200"){
        debugger
        this.notes.forEach(element => {
          if(element.id==id){
            element.trash=value;
           
            this.trashnotes();
          }
      });

      }
    })
  }

  fetchnotes(){
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token);
    const id = tokenPayload.id;
    let notesobs = this.noteserv.fetchNotes(id);

    notesobs.subscribe((data: any) => {
      
      this.notes = data;
  })
}

}
