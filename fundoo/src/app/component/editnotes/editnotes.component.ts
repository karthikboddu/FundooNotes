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
  color:string;
  constructor(
    public dialogRef: MatDialogRef<EditnotesComponent>,
    public dialog: MatDialog,
    private fb:FormBuilder,
    private noteserv : NotesService, 
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { 
    debugger
    this.title = this.data.notesdata.title;
    this.description=  this.data.notesdata.description	;
    this.id = this.data.notesdata.id;
    this.color = this.data.notesdata.color;
  }


  ngOnInit() {
    this.form = this.fb.group({
      description: '',
      title :''
  });
  
  }


  public defaultColors: string[] = [
    '#ffffff',
    '#000105',
    '#3e6158',
    '#3f7a89',
    '#96c582',
    '#b7d5c4',
    '#bcd6e7',
    '#7c90c1',
    '#9d8594',
    '#dad0d8',
    '#4b4fce',
    '#4e0a77',
    '#a367b5',
    '#ee3e6d',
    '#d63d62',
    '#c6a670',
    '#f46600',
    '#cf0500',
    '#efabbd',
    '#8e0622',
    '#f0b89a',
    '#f0ca68',
    '#62382f',
    '#c97545',
    '#c1800b'
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
    this.dialogRef.close();
    let updateobs = this.noteserv.updateNotes(value,this.id);
    updateobs.subscribe((res:any)=>{
        if( res.status=="200"){
            this.stat = "update";
        }

    })



}

}
