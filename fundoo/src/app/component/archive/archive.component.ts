import { Component, OnInit } from '@angular/core';
import decode from 'jwt-decode';
import { ArchiveService } from 'src/app/services/archive.service';
import { Notes } from '../../models/notes.model';
@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  constructor(private archserv : ArchiveService) { }
  notes: Notes[] = [];
  ngOnInit() {
    this.fetchArchive();
  }
  public maticons: string[] = [
    'notification_important',
    'color_lens',
    'unarchive',
    'person_add',
    'more_vert',
  ];


  fetchArchive(){
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token);
    const uid = tokenPayload.id;

    let archiveobs = this.archserv.fetchArchive(uid);
    archiveobs.subscribe((res:any)=>{
      this.notes = res;
    }) 
  } 


  unarchive(id,flag){
    debugger

    let archive = this.archserv.unarchived(id,flag);
    archive.subscribe((res:any)=>{

    });


  }

}
