import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DialogdataComponent } from '../dialogdata/dialogdata.component';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  template :`
  <div class="input-group input-group-lg">
  <input type="text" class="form-control margin10px comment" placeholder="Type something..."  #postMessage>

  
<button type="button"  (click)="addPostMessage(postMessage)">Send</button>
</div>

<hr>
  `,
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

