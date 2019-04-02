import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  
})
export class AppComponent {

  postDataArr = [];

  onAddPost(postData){
    console.log(postData.length);
    this.postDataArr.push(postData);
  }

}
