import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotesService } from '../../services/notes.service';
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

  ngOnInit() {
    this.noteform = this.fb.group({
      desc: '',
      title: ''
    });

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

    const email = localStorage.getItem('email');
    let createobs = this.notes.createNotes(value, email);

    createobs.subscribe((res: any) => {
      debugger
      console.log(res.status);
      if (res.status == "200") {
        this.token1 = res.token;
      }
    })
  }
}
