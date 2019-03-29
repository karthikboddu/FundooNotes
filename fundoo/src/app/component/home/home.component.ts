import { Component, OnInit, Output ,EventEmitter} from '@angular/core';
import * as $ from 'jquery';
import {ViewService} from '../../services/view.service';
import { DataserviceService } from 'src/app/services/dataservice.service';
import { NotesService } from 'src/app/services/notes.service';
import decode from 'jwt-decode';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private viewservice: ViewService, private noteserv: NotesService, private dataservice:DataserviceService) { }
  grid: boolean = false;
  list: boolean = true;
  maindiv: boolean = false;
 
  breakpoint: number;
  ngOnInit() {
    $(document).ready(function () {
      $(".ip").click(function () {
        $(".ip").css("background-color", "white");
      });
      $(".ip").mouseout(function () {
        $(".ip").css("background-color", "#F5F5F5");
      });
    });
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



}
