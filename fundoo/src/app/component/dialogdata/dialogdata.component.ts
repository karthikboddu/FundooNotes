import { Component, OnInit, Injectable, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-dialogdata',
  templateUrl: './dialogdata.component.html',
  template: `
  <div *ngFor = "let post of listPost;"> 
  <span>{{post}}</span> 
  </div> 
    `,
  styleUrls: ['./dialogdata.component.scss']
})
export class DialogdataComponent implements OnInit {


  
  constructor(   ){}

  ngOnInit() {
  }

  // Listen the post message
@Input() listPost = [];

}