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
  }


  ngOnInit() {
    this.form = this.fb.group({
      description: '',
      title :''
  });
  
  }

  save() {
    this.dialogRef.close(this.form.value);
}
stat
close(value:any) {
    this.dialogRef.close();
    let updateobs = this.noteserv.updateNotes(value,this.id);
    updateobs.subscribe((res:any)=>{
        if( res.status=="200"){
            this.stat = "update";
        }

    })



}

}
