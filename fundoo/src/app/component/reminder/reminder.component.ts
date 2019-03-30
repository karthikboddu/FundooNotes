import { Component, OnInit } from '@angular/core';
import decode from 'jwt-decode';
import { ReminderService } from 'src/app/services/reminder.service';
import { Notes } from '../../models/notes.model';
@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss']
})
export class ReminderComponent implements OnInit {

  constructor(private remservice : ReminderService) { }
  notes: Notes[] = [];
  ngOnInit() {
    this.reminder();
  }

  public maticons: string[] = [
    'notification_important',
    'color_lens',
    'archive',
    'person_add',
    'more_vert',
  ];

  reminder(){

    const token = localStorage.getItem('token');
    const tokenPayload = decode(token);
    const uid = tokenPayload.id;
    let remobs = this.remservice.fetchreminders(uid);
    remobs.subscribe((res:any)=>{
      this.notes = res;
    })
  }
}
