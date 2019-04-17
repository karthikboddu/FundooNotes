import { Component, OnInit ,Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-editnotes',
  templateUrl: './editnotes.component.html',
  styleUrls: ['./editnotes.component.scss']
})
export class EditnotesComponent implements OnInit {
  form: FormGroup;
  title:string;
  description;
  id;
  rem
  color:string;
  image;
  constructor(
    public dialogRef: MatDialogRef<EditnotesComponent>,
    public dialog: MatDialog,
    private fb:FormBuilder,
    private noteserv : NotesService, 
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { 
    debugger
    this.title = this.data.notesdata.title;
    this.rem = this.data.notesdata.remainder;
    this.description=  this.data.notesdata.description	;
    this.id = this.data.notesdata.id;
    this.color = this.data.notesdata.color;
    this.image = this.data.notesdata.image;
  }


  ngOnInit() {
    this.form = this.fb.group({
      description: '',
      title :''
  });
  
  }

  deletenote(){
    this.data.notesdata.title='';
    this.data.notesdata.remainder='';
    this.data.notesdata.description=''	;
    this.data.notesdata.id='';
    this.data.notesdata.color='';
    
  }


  public defaultColors: string[] = [
    '#fcf476',
    '#f8bc04',
    '#f28b82',
    '#ffffff',
    '#aecbfa',
    '#cbf0f8',
    '#a7ffea',
    '#ccff90',
    '#e8eaed',
    '#e6c9a8',
    '#fccfe8',
    '#d7aefb',
  ];

  save() {
    this.dialogRef.close(this.form.value);
}
stat
notebg
close(value:any) {
  debugger

  console.log(value);
  this.notebg = value.color;
    this.dialogRef.close(value);  
    if(this.data.notesdata.title != null &&
      this.data.notesdata.description != null &&
      this.data.notesdata.color != ""){

      }
    let updateobs = this.noteserv.updateNotes(this.data,this.id);
    updateobs.subscribe((res:any)=>{
        if( res.status=="200"){
            this.data.notesdata.title = value.title;
            this.data.notesdata.description = value.description;
            this.stat = "update";
        }

    })



}

}
