import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DialogdataComponent } from '../dialogdata/dialogdata.component';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',

  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(){}
  ngOnInit() {
    
  }
  @Output() postData = new EventEmitter();

  addPostMessage(postMessage:HTMLInputElement){
  
  // Emits the post message.
    this.postData.emit(postMessage.value);
    postMessage.value = '';
  }

  }

