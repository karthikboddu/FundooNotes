import { Component, OnInit, Directive, HostListener, ElementRef, Renderer } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotesService } from '../../services/notes.service';
import * as moment from "moment";
import decode from 'jwt-decode';
import { Router } from '@angular/router';
import { ViewService } from 'src/app/services/view.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { EditnotesComponent } from '../editnotes/editnotes.component';


@Directive({
  selector: '[hoverchange]'
})
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  classcard;
  /**
   * 
   * @param fb 
   * @param notes 
   * @param route 
   */
  constructor(private fb: FormBuilder, private notes: NotesService, private dialog: MatDialog, private route: Router, private viewservice: ViewService, private el: ElementRef, private renderer: Renderer) {
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
  ChangeBgColor(color: string) {
    this.renderer.setElementStyle(this.el.nativeElement, 'color', color);
  }

  @HostListener('mouseover') onMouseOver() {
    this.ChangeBgColor('red');
  }
  view;


  noteform: FormGroup;
  datetimeform: FormGroup;
  notescollabaration: string[];
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
  loadNotes() {

    const token = localStorage.getItem('token');
    if (token == null) {
      this.route.navigate(['../login']);
    } else {
      const tokenPayload = decode(token);
      const emailid = tokenPayload.email;

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
    this.date_panel = false;
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

  openNotes(notes) {
    debugger
    const dialogconfg = new MatDialogConfig();

    dialogconfg.autoFocus = true;
    dialogconfg.width = "600px"
    dialogconfg.height = "180px"
    dialogconfg.panelClass = 'custom-dialog-container'
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
  today() {
    var date = new Date();
    this.datee = date.toDateString();
    // if(this.date == ""){
    //   this.timer =false;
    //   return;
    // }


    this.timedate = moment(8, "HH");

    this.currentdate = moment(8, "HH").format('H HH');
    console.log(this.currentdate);
    //  this.timedate = moment(this.date).format('H HH') + " " + this.period;
    this.timer = true;
  }
  remainder() {

  }

  closetime() {
    this.timer = false;
  }
}
