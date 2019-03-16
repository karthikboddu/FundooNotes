import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {NotesService} from '../../services/notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {


  constructor(private fb:FormBuilder,private notes:NotesService) { }

  noteform:FormGroup;
  note : string[];
  ngOnInit() {
    this.noteform = this.fb.group({
      desc: '',
      title:''
    });

    let notesobs = this.notes.fetchNotes();
    notesobs.subscribe((data:any)=>{
      this.note = data as string[];
    });


  }

  token1;

    noteSubmit(value:any){
debugger
    let createobs = this.notes.createNotes(value);
    debugger
    const token = localStorage.getItem('token');
    createobs.subscribe((res:any)=>{
      debugger
      console.log(res.status);
      if(res.status=="200"){
        this.token1 = res.token;
      }
    })
  }
}
