import { Component, OnInit, Injectable } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-dialogdata',
  templateUrl: './dialogdata.component.html',
  styleUrls: ['./dialogdata.component.scss']
})
export class DialogdataComponent implements OnInit {

  form: FormGroup;
  
  constructor(    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogdataComponent>,  @Inject(MAT_DIALOG_DATA) private data){}

  ngOnInit() {
    this.form = this.formBuilder.group({
      filename: this.data ? this.data.name : ''
    })
  }
  submit(form) {
    this.dialogRef.close(`${form.value.filename}`);
  }
}