import { Component, OnInit, Directive, HostListener, ElementRef, Renderer, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotesService } from '../../services/notes.service';
import * as moment from "moment";
import decode from 'jwt-decode';
import { Router } from '@angular/router';
import { ViewService } from 'src/app/services/view.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { EditnotesComponent } from '../editnotes/editnotes.component';
import { Notes } from '../../models/notes.model';
import { EventEmitter } from 'protractor';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
@Directive({
  selector: "[btnhover]"
})
export class NotesComponent implements OnInit {

  classcard;
  notes: Notes[] = [];
  /**
   * 
   * @param fb 
   * @param notes 
   * @param route 
   */
  constructor(private fb: FormBuilder, private noteserv: NotesService, private dialog: MatDialog, private route: Router, private viewservice: ViewService, private el: ElementRef, private renderer: Renderer) {
    this.viewservice.getView().subscribe((res => {
      this.view = res;
      this.direction = this.view.data;
      this.classcard = this.view.class;
      console.log("Direction is :", this.direction);

      this.layout = this.direction + " " + this.wrap;
      console.log("Layout is ", this.layout);
      console.log("class is ", this.classcard);
    }))
  }


  public defaultColors: string[] = [
    '#fcf476',
    '#f8bc04',
    '#f28b82',
    '#ffffff',
    '#aecbfa',
    '#cbf0f8',
    '#a7ffea',
    '#ccff90',
    '#e8eaed',
    '#e6c9a8',
    '#fccfe8',
    '#d7aefb',
  ];
  public maticons: string[] = [
    'notification_important',
    'color_lens',
    'archive',
    'person_add',
    'more_vert',
  ];


  // @HostListener('mouseover') onMouseOver() {
  //   let text = this.el.nativeElement.querySelector('.spanbtn');
  //   this.renderer.setElementStyle(text,'display','inline');
  // }

  // @HostListener('mouseout') onMouseOut() {
  //   let text = this.el.nativeElement.querySelector('.spanbtn');
  //   this.renderer.setElementStyle(text,'display','none');

  // }
  view;


  noteform: FormGroup;
  datetimeform: FormGroup;
  notescollabaration;
  email: any;
  noteshow: boolean = true;
  cardshow: boolean = false;
  newnote: boolean
  token1;
  date: any;
  currentdate: any;
  timedate: any;
  timer: any;
  description: any
  title: any;

  timearr: any;
  rowcard //css class

  wrap: string = "wrap";
  direction: string = "row";
  layout: string = this.direction + " " + this.wrap;
  /**
   * @description fetch the notes when the components loads
   */
  ngOnInit() {
    this.noteform = this.fb.group({
      desc: '',
      title: '',

    });

    this.datetimeform = this.fb.group({
      datetime: '',
      valuee: '',
      value: ''
    });

    this.timer = false;
    this.newnote = false;

    setInterval(() => {

    }, 1000);
    this.loadNotes();


    this.viewservice.getView().subscribe((res => {
      this.view = res;
      this.direction = this.view.data;


      this.layout = this.direction + " " + this.wrap;
    }))

    this.timearr = { name: "asdas", afternoon: ['13:00', '18:00', '21:00'] };

  }

  hide() {

  }
  time
  period
  date_panel
  newdate


  datetime(value: any) {
    this.date = value.datetime;
    this.time = value.value;
    this.period = value.valuee;
    this.date_panel = false;
    this.timer = true;
    debugger
    if (this.date == "") {
      this.timer = false;
      return;
    }

    // var moment = require('moment');
    console.log(this.time + "time is ");
    this.timedate = moment(this.date).format('DD-MMM') + " " + this.period;
    console.log(this.timedate);
    console.log(value);
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
  rem
  loadNotes() {

    const token = localStorage.getItem('token');
    if (token == null) {
      this.route.navigate(['../login']);
    } else {
      const tokenPayload = decode(token);
      const emailid = tokenPayload.email;
      const uid = tokenPayload.id;

      let notesobs = this.noteserv.fetchNotes(uid);

      notesobs.subscribe((data: any) => {
        debugger
        this.notes = data;
        this.notes;
        this.rem = moment(data.remainder).format("HH:mm A");


      });
    }

  }

  getId(notes){
    
  }



  openNotes(notes) {
    debugger
    const dialogconfg = new MatDialogConfig();

    dialogconfg.autoFocus = true;

    
    dialogconfg.panelClass = 'myClass'
    dialogconfg.data = {
      //   titles : notes['title'],
      //   description : notes.description,
      //   reminder : notes.remainder
      notesdata: notes
    }
    const open = this.dialog.open(EditnotesComponent, dialogconfg);

  }


  /**
   * @description generate the date
   * @method today()
   */
  datee
  cc
  todaydb
  today(n) {
    debugger;
    var date = new Date();
    this.datee = date.toDateString();
    // if(this.date == ""){
    //   this.timer =false;
    //   return;
    // }
    if (n = 10) {

      this.timedate = moment(8, "HH");
      this.todaydb = "Today " + moment(this.timedate).format('hh:mm:ss A');
      console.log("db" + this.todaydb);
      console.log(this.timedate);
      this.timedate = "Today " + moment(this.timedate).format('HH:mm A');
    }

    if (n = 20) {
      this.timedate = moment(8, "HH");
      this.todaydb = "Tomorrow " + moment(this.timedate).format('hh:mm:ss A');
      this.timedate = "Tomorrow " + moment(this.timedate).format('HH:mm A');
    }

    console.log(this.currentdate);
    //  this.timedate = moment(this.date).format('H HH') + " " + this.period;
    this.timer = true;
  }



  remainder() {

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
    this.date_panel = false;
    this.newnote = true;

    const token = localStorage.getItem('token');
    const tokenPayload = decode(token);
    const uid = tokenPayload.id;

    this.title = value.title;
    this.description = value.desc;
    this.loadNotes();
    const email = localStorage.getItem('email');
    let createobs = this.noteserv.createNotes(value, uid, this.todaydb);

    createobs.subscribe((res: any) => {
      debugger
      console.log(res.status);
      if (res.status == "200") {
        this.token1 = res.token;
      }
    })
  }


  remainderchange() {

  }
  stat
  notesChaneColor(id, colorid, flag) {
    debugger
    if (id == "undefined") {
      return;
    }
    this.notes.forEach(element => {
      if (element.id == id) {
        if (flag == "color") {
          element.color = colorid;
        }
      }

    });
    let colorObs = this.noteserv.setColor(id, colorid);
    colorObs.subscribe((res: any) => {
      if (res.status == "200") {
        this.stat = "color updated";
      }
    })


  }

 




  closetime() {
    this.timer = false;
  }
}
