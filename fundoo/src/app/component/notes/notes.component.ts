import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotesService } from '../../services/notes.service';
import * as moment from "moment";
import decode from 'jwt-decode';
import { Router } from '@angular/router';
import { ViewService } from 'src/app/services/view.service';
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {


  /**
   * 
   * @param fb 
   * @param notes 
   * @param route 
   */
  constructor(private fb: FormBuilder, private notes: NotesService, private route: Router,private viewservice :ViewService) {
    this.viewservice.getView().subscribe((res=>{
      this.view =res;
      this.direction = this.view.data;
      console.log("Direction is :", this.direction);

			this.layout = this.direction + " " + this.wrap;
			console.log("Layout is ", this.layout);
    }))
   }

   view;


  noteform: FormGroup;
  notescollabaration: string[];
  email: any;
  noteshow: boolean = true;
  cardshow: boolean = false;
  newnote :boolean
  token1;
  date: any;
  currentdate: any;
  timedate: any;
  timer: any;
  description:any
  title:any;
  breakpoint:number;


  wrap: string = "wrap";
	direction: string = "row";
	layout: string = this.direction + " " + this.wrap;
  /**
   * @description fetch the notes when the components loads
   */
  ngOnInit() {
    this.noteform = this.fb.group({
      desc: '',
      title: ''
    });
    this.timer = false;
    this.newnote = false;
    this.loadNotes();
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 6;

    this.viewservice.getView().subscribe((res=>{
        this.view = res;
        this.direction = this.view.data;
        this.layout = this.direction + " "+this.wrap;
    }))

  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 6;
  }

/**
 * @description toggle to hide show 
 */
  toggle() {
    this.noteshow = false;
    this.cardshow = true;
  }

  /**
   * @description loadnotes from the database
   * @method loadNotes()
   */
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
        this.notescollabaration = data as string[];

      });
    }

  }

  /**
   * @description submit title descrption data
   * @method :noteSubmit()
   * @param value 
   */
  noteSubmit(value: any) {
    debugger
    this.cardshow = false;
    this.noteshow = true;

    this.newnote = true;
    this.title = value.title;
    this.description = value.desc;
    this.loadNotes();
    const email = localStorage.getItem('email');
    let createobs = this.notes.createNotes(value, email, this.timedate);

    createobs.subscribe((res: any) => {
      debugger
      console.log(res.status);
      if (res.status == "200") {
        this.token1 = res.token;
      }
    })
  }


  /**
   * @description generate the date
   * @method today()
   */
  today() {
    var date = new Date();
    this.date = date.toDateString();
    this.currentdate = moment(this.date).format('DD/MM/YY');
    this.timedate = this.currentdate + " " + "8:00";
    this.timer = true;
  }

  closetime(){
    this.timer=false;
  }
}
