import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { NotesService } from 'src/app/services/notes.service';
import { CollabaratorService } from 'src/app/services/collabarator.service';

@Component({
  selector: 'app-collabarator',
  templateUrl: './collabarator.component.html',
  styleUrls: ['./collabarator.component.scss']
})
export class CollabaratorComponent implements OnInit {
  uid
  firstname
  lname
  owneremail
  userdetails
  collemail
  noteid
  constructor(    public dialogRef: MatDialogRef<CollabaratorComponent>,
    public dialog: MatDialog,
    private fb:FormBuilder,
    private noteserv : NotesService,
    private collserv :CollabaratorService ,
    @Inject(MAT_DIALOG_DATA) public data: any
    
    ) {
      debugger
      console.log("dialog",this.data);
      this.uid = this.data.notesdata[0].id;
      this.userdetails = this.data.notesdata;
      this.firstname = this.data.notesdata.fname;
      this.lname = this.data.notesdata.lname;
      this.owneremail = this.data.notesdata.emailid;
      this.noteid = this.data.nid;
     }

  ngOnInit() {

 
  }

error
save(){

    let checkmail = this.collserv.emailCheck(this.collemail);
    checkmail.subscribe((res:any)=>{
      if(res.status=="204"){
        this.error = "email does not exists";
      }else if(res.status=="200"){
        debugger
        let addcollabarator = this.collserv.addCollabarator(this.uid,this.collemail,this.noteid);
        addcollabarator.subscribe((collres:any)=>{
          this.dialogRef.close();
        });
      }
    });
  }
}
