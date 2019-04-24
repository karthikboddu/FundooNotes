import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-collabarator',
  templateUrl: './collabarator.component.html',
  styleUrls: ['./collabarator.component.scss']
})
export class CollabaratorComponent implements OnInit {
  firstname
  lname
  email
  userdetails
  constructor(    public dialogRef: MatDialogRef<CollabaratorComponent>,
    public dialog: MatDialog,
    private fb:FormBuilder,
    private noteserv : NotesService, 
    @Inject(MAT_DIALOG_DATA) public data: any
    
    ) {
      debugger
      console.log("dialog",this.data);
      this.userdetails = this.data.notesdata;
      this.firstname = this.data.notesdata.fname;
      this.lname = this.data.notesdata.lname;
      this.email = this.data.notesdata.emailid;
     }

  ngOnInit() {

 
  }

}
