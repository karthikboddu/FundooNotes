import { Component, OnInit ,Input, Output, EventEmitter} from '@angular/core';
import { NotesService } from '../services/notes.service';
import { Router } from '@angular/router';
import { ViewService } from '../services/view.service';
import * as moment from "moment";
import decode from 'jwt-decode';
import { count } from 'rxjs/operators';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
  
})



export class GridComponent implements OnInit {

  classcard;
  /**
   * 
   * @param fb 
   * @param notes 
   * @param route 
   */
  constructor( private notes: NotesService, private route: Router,private viewservice :ViewService) {
    this.viewservice.getView().subscribe((res=>{
      this.view =res;
      this.direction = this.view.data;
      this.classcard = this.view.class;
      console.log("Direction is :", this.direction);

			this.layout = this.direction + " " + this.wrap;
      console.log("Layout is ", this.layout);
      console.log("class is ",this.classcard);
    }))
   }

   @Input() count: number; 
   @Output() countChange = new EventEmitter(); 


   view;


   updateCount(){
     this.count = this.count+1;
     this.countChange.emit(this.count); 
   }

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
  timearr:any;
  rowcard
  wrap: string = "wrap";
	direction: string = "row";
	layout: string = this.direction + " " + this.wrap;
  /**
   * @description fetch the notes when the components loads
   */
  ngOnInit() {
 


    
    this.timer = false;
    this.newnote = false;

    setInterval(()=>{
     
    },1000);
    this.loadNotes();
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 6;

    this.viewservice.getView().subscribe((res=>{
        this.view = res;
        this.direction = this.view.data;
        this.rowcard = this.view.class;
        this.layout = this.direction + " "+this.wrap;
    }))

    this.timearr = {name:"asdas",afternoon:['13:00','18:00','21:00']};
    
  }

  hide(){

  }
  date_panel
  datetime(value:any){
    this.date_panel=false;
    console.log(value);
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 6;
  }

  tiles: Tile[] = [
    {text: 'One', cols: 2, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

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
        debugger
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
    this.date_panel=false;
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
