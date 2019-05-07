import { Component, OnInit, Directive, HostListener, ElementRef, Renderer, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotesService } from '../../services/notes.service';
import * as moment from "moment";
import decode from 'jwt-decode';
import { Router } from '@angular/router';
import { ViewService } from 'src/app/services/view.service';
import { MatDialog, MatDialogConfig, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBarConfig, MatDialogRef } from '@angular/material';
import { EditnotesComponent } from '../editnotes/editnotes.component';
import { Notes } from '../../models/notes.model';
import { CookieService } from 'ngx-cookie-service';
import { LabelService } from 'src/app/services/label.service';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { Label } from '../../models/label.model';
import { CollabaratorComponent } from '../collabarator/collabarator.component';
import { RegisterService } from 'src/app/services/register.service';
import { Register } from 'src/app/models/register.model';
import { PushNotificationOptions, PushNotificationService } from 'ngx-push-notifications';
import { ReminderService } from 'src/app/services/reminder.service';
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
  userDetails :Register[] =[];
  labels: Label[];
  /**
   * 
   * @param fb 
   * @param notes 
   * @param route 
   */
  constructor(private fb: FormBuilder, private noteserv: NotesService, private dialog: MatDialog,
    private route: Router, private viewservice: ViewService,
    private el: ElementRef, private renderer: Renderer, private snackBar: MatSnackBar,
    private cookieserv: CookieService,
    private labelserv: LabelService,private regServ:RegisterService,
    private _pushNotificationService: PushNotificationService,
    private remServ : ReminderService

  ) {
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
  postDataArr = [];

  onAddPost(postData) {
    console.log(postData.length);
    this.postDataArr.push(postData);
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
  public isArchived = "n";
  timearr: any;
  rowcard //css class
  timeReminder:boolean=true;
  wrap: string = "wrap";
  direction: string;
  layout: string;
  token
  tokenPayload
  uid
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
    this.notes_timer = true;

      setInterval(() => {
       
      }, 1000);
    
      this.remainder123();
      this.myFunction();
    this.loadNotes();
    this.userImage();

    this._pushNotificationService.requestPermission();


    this.viewservice.getView().subscribe((res => {
      this.view = res;
      this.direction = this.view.data;
      this.layout = this.direction + " " + this.wrap;
    }))

    this.token = localStorage.getItem('token');
    this.tokenPayload = decode(this.token);

    this.uid = this.tokenPayload.id;
    let labelosb = this.labelserv.fetchLabel(this.uid);
    labelosb.subscribe((res: any) => {
      console.log(res, "labels");
      this.labels = res;
    });




  }

  hide() {

  }
  time
  period
  date_panel
  newdate
  image

  userImage(){
    this.token = localStorage.getItem('token');
    this.tokenPayload = decode(this.token);

    this.uid = this.tokenPayload.id;
    let profileImage = this.regServ.fetchUserImage(this.uid);
    profileImage.subscribe((res:any)=>{
      debugger
      this.userDetails = res;
      this.image = res[0].image;

        });
  }

  datetime(id, value: any) {
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
    this.timedate = moment(this.date).format("DD/MM/YYYY") + " " + this.period;
    this.reminderfun(id, this.timedate);
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

  myFunction() {
    const title = 'Hello';
    const options = new PushNotificationOptions();
    options.body = 'Native Push Notification';
 
    this._pushNotificationService.create(title, options).subscribe((notif) => {
      if (notif.event.type === 'show') {
        console.log('onshow');
        setTimeout(() => {
          notif.notification.close();
        }, 3000);
      }
      if (notif.event.type === 'click') {
        console.log('click');
        notif.notification.close();
      }
      if (notif.event.type === 'close') {
        console.log('close');
      }
    },
    (err) => {
         console.log(err);
    });
}

trigger(){
  debugger
  let push = this.remServ.pushRemainder("barry","allen");
  push.subscribe((res:any)=>{
    
  })
}

currentDateAndTime
remainder123() {
  // this.toasterservice.success("ddd", "asfasdf"); 
  debugger
  var day = new Date();
  var fulldate =
    day.toDateString() + " " + (day.getHours() % 12) + ":" + day.getMinutes();
  fulldate = moment(fulldate).format("DD/MM/YYYY hh:mm") + " PM";
  const token = localStorage.getItem('token');
  const tokenPayload = decode(token);

  const uid = tokenPayload.id;

  let notesobs = this.noteserv.fetchNotes(uid);

  notesobs.subscribe((data: any) => {

    this.notes = data;
    this.notes.forEach(element => {
      debugger

      let DateAndTime = fulldate;
      this.currentDateAndTime = DateAndTime;
      console.log("remainder " + element.reminder);
      /**
       * compare with present time if equal alert remainder
       */

       
      if (DateAndTime == element.reminder) {
 
        console.log("remainder " + element.reminder);
        debugger
        this.remServ.pushRemainder(element.title,element.desc);
        this.timeReminder = false;
        this.snackBar.open(element.title, "", {
          duration: 2000
        });
      }
    });
  })

}







  /**
   * @description loadnotes from the database
   * @method loadNotes()
   */
  rem
  loadNotes() {
    debugger
    const token = localStorage.getItem('token');
    if (token == null) {
      this.route.navigate(['../login']);
    } else {
      const tokenPayload = decode(token);

      const uid = tokenPayload.id;

      let notesobs = this.noteserv.fetchNotes(uid);

      notesobs.subscribe((data: any) => {
        debugger
        this.notes = data;
        console.log(this.notes, "before");
        this.notes.forEach(element => {
          debugger
          element.reminder = moment(element.reminder).format("MMM-DD HH:mm A");

          if (element.reminder == 'Invalid date') {
            element.reminder = null;
          }
        });
        console.log(this.notes, "dssssssssss");
      });
    }
  }


 


  openColl(n){
    debugger
    const dialogconfg = new MatDialogConfig();

    dialogconfg.autoFocus = true;
    dialogconfg.panelClass = 'custom-dialog-container';
    dialogconfg.width = "600px"
    dialogconfg.height = "290px"
    dialogconfg.data = {
      //   titles : notes['title'],
      //   description : notes.description,
      //   reminder : notes.remainder
      notesdata: this.userDetails,
      nid:n
    }
    let open = this.dialog.open(CollabaratorComponent, dialogconfg);
    open.afterClosed().subscribe(result => {
      console.log(result, "dialog");
    });
  }

  openNotes(notes) {
    debugger
    const dialogconfg = new MatDialogConfig();

    dialogconfg.autoFocus = true;
    dialogconfg.panelClass = 'custom-dialog-container';
    dialogconfg.width = "900px"
    dialogconfg.height = "490px"
    dialogconfg.data = {
      //   titles : notes['title'],
      //   description : notes.description,
      //   reminder : notes.remainder
      notesdata: notes
    }
    let open = this.dialog.open(EditnotesComponent, dialogconfg);
    open.afterClosed().subscribe(result => {
      console.log(result, "dialog");
    });

  }



  /**
   * @description generate the date
   * @method today()
   */
  datee
  cc
  todaydb
  

  fulldate: any;
  fulltime: any;
  flag
  todayy(id, rem_id) {
    debugger
    this.flag = true;
    var day = new Date();
    this.fulldate = day.toDateString();
    let currentDate = moment(this.fulldate).format("DD/MM/YYYY");
    this.currentDateAndTime = currentDate + " " + "08:00 PM";
    if (id == "01") {
      this.timer = true;
      this.timedate = this.currentDateAndTime;
      this.flag = false;
    } else {
      this.reminderfun(id, this.currentDateAndTime);
    }

    if (rem_id != null) {
      this.reminderfun(rem_id, this.currentDateAndTime);
    }
  }

  tomorrow(id, rem_id) {
    debugger;
    var day = new Date();
    day.setDate(day.getDate() + 1);
    this.fulldate = day.toDateString();
    let currentDate = moment(this.fulldate).format("DD/MM/YYYY");
    this.currentDateAndTime = currentDate + " " + "08:00 AM";
    if (id == "01") {
      this.timer = true;
      this.timedate = this.currentDateAndTime;
    } else {
      this.reminderfun(id, this.currentDateAndTime);
    }

    if (rem_id != null) {
      this.reminderfun(rem_id, this.currentDateAndTime);
    }
  }

  nextWeek(id) {
    debugger;
    var day = new Date();

    this.fulldate = day.setDate(day.getDate() + ((1 + 7 - day.getDay()) % 7));
    let currentDate = moment(this.fulldate).format("DD/MM/YYYY");
    this.currentDateAndTime = currentDate + " " + "08:00 AM";
    if (id == "01") {
      this.timer = true;
      this.timedate = this.currentDateAndTime;
    } else {
      this.reminderfun(id, this.currentDateAndTime);
    }
  }
  otherPresentTime
  notes_timer
  reminderfun(id, date) {
    // this.notes.forEach(element => {
    // 	if (element.id == id) {
    // 		element.remainder = date;
    // 		this.otherPresentTime = date;
    // 	}
    // });
    debugger
    this.otherPresentTime = date;
    //if (this.model.date != null && this.model.time != null)
    if (date != null) {
      let obs = this.noteserv.dateTimeChange(id, this.otherPresentTime);
      obs.subscribe((res: any) => {
        //  obs.unsubscribe();
        this.notes_timer = true;
        console.log(this.notes_timer);
      });
      debugger;

      // this.other_timer_panel = false;
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

    // this.notes.forEach(element => {
    //   element.title = value.title;
    //   element

    // });


    const token = localStorage.getItem('token');
    const tokenPayload = decode(token);
    const uid = tokenPayload.id;
    this.flag =0;
    this.title = value.title;
    this.description = value.desc;
    // this.loadNotes();
    if(value.title==""||value.desc==""){
      if(this.Mainimage!=""||value.color!=""||value.labelid!=""){
        this.flag =1;
      }
    }
    if(value.title!=""||value.desc!=""){

      this.flag =1;
    }
    
    // if (
    //   (value.title != "" ||
    //     value.desc != "")||
    //  (this.Mainimage!=""||this.timedate!="" ) ) 
    if(this.flag==1)
     {
      let createobs = this.noteserv.createNotes(value, uid, this.timedate,this.Mainimage);
      createobs.subscribe((res: any) => {
        debugger
        console.log(res,"notecreate");
        if (res.status == "200") {
          debugger
          this.token1 = res.token;
          this.notes.forEach(element => {
            debugger
            let thingsObj = {} as Notes;

            // thingsObj.id = value.id
            thingsObj.title = value.title;
            thingsObj.desc = value.desc;
            thingsObj.color = value.color;


            this.notes.push(thingsObj);

            console.log("new notes ", this.notes);
            this.loadNotes();


          });
        }
      })
    }



  }


  remainderchange() {

  }



  stat
  notestools(id, value, flag) {
    debugger
    if (id == "undefined") {
      return;
    }
    this.notes.forEach(element => {
      if (element.id == id) {
        if (flag == "color") {
          element.color = value;
        }
      }

    });
    let colorObs = this.noteserv.notesCrud(id, value, flag);
    colorObs.subscribe((res: any) => {
      if (res.status == "200") {


        this.notes.forEach(element => {
          if (element.id == id) {
            if (flag == "color") {
              element.archive = value;
            }

          }
        });
        this.stat = " updated";

      }
    })


  }

	/**
	 * var to hold image base64url
	 */
  public base64textString;
  Mainimage
  imageNoteId
  onSelectImage(event, noteId) {
    debugger;
    this.imageNoteId = noteId;
    var files = event.target.files;
    var file = files[0];
    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token);
    const uid = tokenPayload.id;
    debugger
    var binaryString = readerEvt.target.result;
    console.log(binaryString);
    this.base64textString = btoa(binaryString);
    this.notes.forEach(element => {
      if (element.id == this.imageNoteId) {
        debugger
        element.image = "data:image/jpeg;base64," + this.base64textString;
      }
    });

    if (this.imageNoteId == "01") {
      this.Mainimage = "data:image/jpeg;base64," + this.base64textString;
    } else {
      this.Mainimage = "data:image/jpeg;base64," + this.base64textString;
      let obss = this.noteserv.imagesave(
        this.Mainimage,
        uid,
        this.imageNoteId
      );
      obss.subscribe((res: any) => { });
    }
  }

	/**
	 * @var difference intger having the difference
	 * @var dirrection string having the direction of drag
	 */
  difference;
  dirrection;
	/**
	 * @method drop
	 * @description function to drag and drop the card
	 * @param CdkDragDrop array
	 */
  drop(event: CdkDragDrop<string[]>) {
    debugger
    moveItemInArray(this.notes, event.previousIndex, event.currentIndex);
    if (event.previousIndex - event.currentIndex >= 0) {
      this.difference = event.previousIndex - event.currentIndex;
      // alert("pas");
      this.dirrection = "positive";
    } else {
      this.difference = (event.previousIndex - event.currentIndex) * -1;
      // alert("neg");
      this.dirrection = "negative";
    }
    console.log(event.currentIndex);

    console.log(this.notes[event.currentIndex]);

    let obbs = this.noteserv.dragAndDrop(
    	this.difference,
    	this.notes[event.currentIndex].dragId,
    	this.dirrection,
    	this.uid
    );
    obbs.subscribe(
    	(res: any) => {
    		//   obbs.unsubscribe();
    	},
    	error => {
    		// this.iserror = true;
    		// this.errorMessage = error.message;
    	}
    );
  }



  closetime() {
    this.timer = false;
  }
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 2000;
  addExtraClass: boolean = false;
  actionButtonLabel: string = 'Undo';


  deletenote(id, value) {
    debugger
    let delobs = this.noteserv.notedtrash(id);
    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;

    delobs.subscribe((res: any) => {
      if (res.status == "200") {
        debugger
        this.notes.forEach(element => {
          debugger
          if (element.id == id) {
            element.trash = value;
            this.loadNotes();
          }
        });
        this.stat = "Note bined";
        this.snackBar.open(this.stat, this.action ? this.actionButtonLabel : undefined, config);
      }
    })

  }


  labelname
  lname
  addLabel(labelid, notelid, flag) {
    debugger

    let addlabel = this.labelserv.labelAdd(labelid, notelid, this.uid, flag);
    addlabel.subscribe((res: any) => {
debugger
      this.notes.forEach(element => {
        debugger
        if(element.id==notelid){
          if(flag=="delete"){
            element.labelname="";
          }
          if(flag="add"){
            
            let labelname = this.labelserv.labelnamebyid(labelid);
            labelname.subscribe((res)=>{
              
              debugger
              this.labelname = res;
              const lname =this.labelname[0].labelname;
              console.log(this.lname,"labelname");
              element.labelname=lname; 
            })
            
          }
        }
        
      });

    })

  }




  /**
 * set label
 * @param labelname 
 */
  setLabel(labelid) {
    debugger
    this.labelserv.labelnameSet(labelid);
  }
}
