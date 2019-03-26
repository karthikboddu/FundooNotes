import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  
})
export class AppComponent {
  title = 'fundoo';
  count = 9;

  changeCount(data) { 

    console.log(data); 

 } 
}
