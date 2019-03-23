import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DialogdataComponent } from '../dialogdata/dialogdata.component';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  fileDialogRef: MatDialogRef<DialogdataComponent>;
  breakpoint: number;
  constructor(private dialog:MatDialog){}
  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 6;
  }
files:any;
onResize(event) {
  this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 6;
}

  openAddFileDialog(file?) {
    this.fileDialogRef = this.dialog.open(DialogdataComponent,{
      hasBackdrop: false,
      data: {
        filename: file ? file.name : ''
      }
    });   
    this.fileDialogRef
    .afterClosed()
    .pipe(filter(name => name))
    .subscribe(name => this.files.push({ name, content: '' }));

    this.fileDialogRef.afterClosed().pipe(
      filter(name => name)
    ).subscribe(name => {
      if (file) {
        const index = this.files.findIndex(f => f.name == file.name);
        if (index !== -1) {
          this.files[index] = { name, content: file.content }
        }
      } else {
        this.files.push({ name, content: ''});
      }



      
  });

  }
}
