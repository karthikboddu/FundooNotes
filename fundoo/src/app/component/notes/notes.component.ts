import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotesService } from '../../services/notes.service';
import * as moment from "moment";
import decode from 'jwt-decode';
import { Router } from '@angular/router';
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {



  constructor(private fb: FormBuilder, private notes: NotesService, private route: Router) { }

  noteform: FormGroup;
  note: string[];
  email: any;
  noteshow: boolean = true;
  cardshow: boolean = false;
  token1;
  date:any;
  currentdate:any;
  timedate:any;
  timer:any;

  ngOnInit() {
    this.noteform = this.fb.group({
      desc: '',
      title: ''
    });

    
    this.timer =false;
    this.loadNotes();

  }


  toggle() {
    this.noteshow = false;
    this.cardshow = true;
  }

  loadNotes() {
    debugger

    const token = localStorage.getItem('token');
    if (token == null) {
      this.route.navigate(['../login']);
    } else {
      const tokenPayload = decode(token);
      const emailid = tokenPayload.email;
      debugger
      let notesobs = this.notes.fetchNotes(emailid);

      notesobs.subscribe((data: any) => {
        this.note = data as string[];

      });
    }

  }


  noteSubmit(value: any) {
    debugger
    this.cardshow = false;
    this.noteshow=true;

    this.loadNotes();
    const email = localStorage.getItem('email');
    let createobs = this.notes.createNotes(value, email,this.timedate);

    createobs.subscribe((res: any) => {
      debugger
      console.log(res.status);
      if (res.status == "200") {
        this.token1 = res.token;
      }
    })
  }



  today(){
    var date = new Date();
    this.date = date.toDateString();
    this.currentdate = moment(this.date).format('DD/MM/YY');
    this.timedate = this.currentdate+" "+"8:00";
    this.timer=true;
  }
}
