import { Component, OnInit, Output ,EventEmitter, Input} from '@angular/core';
import * as $ from 'jquery';
import {ViewService} from '../../services/view.service';
import { DataserviceService } from 'src/app/services/dataservice.service';
import { NotesService } from 'src/app/services/notes.service';
import decode from 'jwt-decode';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { LabelsComponent } from '../labels/labels.component';
import { LabelService } from 'src/app/services/label.service';
import { Label } from '../../models/label.model';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Notes } from 'src/app/models/notes.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private viewservice: ViewService, private noteserv: NotesService, 
    private dataservice:DataserviceService,private dialog:MatDialog,
    private cookieserv : CookieService,
    private labelservice:LabelService,private route:Router) { }
  grid: boolean = false;
  list: boolean = true;
  maindiv: boolean = false;
  labels : Label[];
  token;
  tokenPayload;
  uid;
 
  notes: Notes[] = []
  profilename:string;
  profilemail
  ngOnInit() {
    $(document).ready(function () {
      $(".ip").click(function () {
        $(".ip").css("background-color", "white");
      });
      $(".ip").mouseout(function () {
        $(".ip").css("background-color", "#F5F5F5");
      });
    });
debugger


    this.token = localStorage.getItem('token');
    if(this.token!=null){
      this.tokenPayload = decode(this.token);
      this.uid = this.tokenPayload.id;
    }


    let labelobs = this.labelservice.fetchLabel(this.uid);
    labelobs.subscribe((res:any)=>{
      this.labels = res;
    })
    debugger
    this.profilemail = this.cookieserv.get("email");
    console.log("email" +this.profilemail);

    this.profilename = this.profilemail.substring(0,1);
    console.log("name"+this.profilename);
  }


  @Output() changeviewevent = new EventEmitter<boolean>();


  toggle() {
    this.maindiv = true;
  }

  changeView() {
    if (this.list) {
      this.grid = true;
      this.list = false;
      // this.dataservice.setCurrentdata(this.grid);
    } else {
      this.list = true;
      this.grid = false;
      // this.dataservice.setCurrentdata(this.list);
    }

    this.viewservice.gridview();
    
  }

// notes;
//   getId(){
//     const token = localStorage.getItem('token');
//     const tokenPayload = decode(token);
//     const uid = tokenPayload.id;
//     let noteobs = this.noteserv.fetchNotes(uid);
//     noteobs.subscribe((res:any)=>{
//         this.notes = res;
//     })

//     this.outgoingData = this.notes;
//   }
  /**
   * @method logout()
   */
  logout() {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    this.route.navigate(["/home"]);
  }


  openLabel(){
    const config = new MatDialogConfig();
    config.width="600px";
    config.height="250px";
    config.data ={data:this.uid};
    const label = this.dialog.open(LabelsComponent,config);
  }


  /**
	 * var to hold image base64url
	 */
	public base64textString;
  Mainimage
  imageNoteId
  onSelectImage(event,noteId){
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
    debugger
		var binaryString = readerEvt.target.result;
		console.log(binaryString);
		this.base64textString = btoa(binaryString);
		this.notes.forEach(element => {
			if (element.id == this.imageNoteId) {
				element.image = "data:image/jpeg;base64," + this.base64textString;
			}
		});

		if (this.imageNoteId == "01") {
			this.Mainimage = "data:image/jpeg;base64," + this.base64textString;
		} else {
			// let obss = this.image.noteSaveImage(
			// 	this.base64textString,
			// 	this.email,
			// 	this.imageNoteId
			// );
			// obss.subscribe((res: any) => {});
		}
	}



}
