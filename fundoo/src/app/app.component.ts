import { Component } from '@angular/core';
import { DateserviceService} from './dateservice.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'fundoo';


  months = ["January", "Feburary", "March", "April",
  "May", "June", "July", "August", "September",
  "October", "November", "December"];
  isAvailble = false;

  myclick(event){
    alert("button is clicked");
    console.log(event);
  }
 
  constructor() {
  }

  ngOnInit() {

  }

}
