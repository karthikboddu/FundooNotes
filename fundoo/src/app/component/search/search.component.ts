import { Component, OnInit } from '@angular/core';
import { LabelService } from 'src/app/services/label.service';
import decode from 'jwt-decode';
import { Label } from 'src/app/models/label.model';
import { DataserviceService } from 'src/app/services/dataservice.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private labelsev:LabelService,private dataserv:DataserviceService) { }
  labels:Label[];
  searchtext 
  ngOnInit() {
    debugger
    this.searchtext = this.dataserv.returnsearchdata();
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
      this.labels = res;
    })
  }







}
