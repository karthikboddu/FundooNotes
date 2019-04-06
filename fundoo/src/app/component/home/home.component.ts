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
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private viewservice: ViewService, private noteserv: NotesService, 
    private dataservice:DataserviceService,private dialog:MatDialog,
    private cookieserv : CookieService,
    private labelservice:LabelService) { }
  grid: boolean = false;
  list: boolean = true;
  maindiv: boolean = false;
  labels : Label[];
  token;
  tokenPayload;
  uid;
  breakpoint: number;
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



    this.token = localStorage.getItem('token');
    this.tokenPayload = decode(this.token);
    this.uid = this.tokenPayload.id;

    let labelobs = this.labelservice.fetchLabel(this.uid);
    labelobs.subscribe((res:any)=>{
      this.labels = res;
    })

    this.profilemail = this.cookieserv.get("email");
    this.profilename = this.profilemail.substring(0,1);
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
  }


  openLabel(){
    const config = new MatDialogConfig();
    config.width="600px";
    config.height="250px";
    config.data ={data:this.uid};
    const label = this.dialog.open(LabelsComponent,config);
  }


}
