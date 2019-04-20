import { Component, OnInit } from '@angular/core';
import { LabelService } from 'src/app/services/label.service';
import decode from 'jwt-decode';
import { Label } from 'src/app/models/label.model';
import { DataserviceService } from 'src/app/services/dataservice.service';
import { NotesService } from 'src/app/services/notes.service';
import { Router } from '@angular/router';
import { Notes } from 'src/app/models/notes.model';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private labelsev:LabelService,private dataserv:DataserviceService,private noteserv:NotesService,private route:Router) { }
  labels:Label[];
  searchtext 
  notes:Notes[];
  ngOnInit() {
    debugger
    let searchData = this.dataserv.returnsearchdata();
    searchData.subscribe((res:any)=>{
      console.log("searched ",res);
    })
    this.loadNotes();
    this.fetchLabel();
  }

  fetchLabel() {
    debugger
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token);
    const uid = tokenPayload.id;
    let fetchobs = this.labelsev.fetchLabel(uid);
   
    fetchobs.subscribe((res: any) => {
      debugger
      console.log("labels",res)
      this.labels = res;
    })
  }

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
        console.log(this.notes, "dssssssssss");
      });
    }
  }







}
