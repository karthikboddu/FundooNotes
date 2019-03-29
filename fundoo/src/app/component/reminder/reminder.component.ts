import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss']
})
export class ReminderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public maticons: string[] = [
    'notification_important',
    'color_lens',
    'archive',
    'person_add',
    'more_vert',
  ];

}
