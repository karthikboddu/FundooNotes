import { Component, OnInit } from '@angular/core';
import { DateserviceService} from './../dateservice.service';




@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {
  newcmp = "this is cmp";

  constructor() {
  }

  ngOnInit() {
  }

}
