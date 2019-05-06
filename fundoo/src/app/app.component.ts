import { Component,OnInit } from '@angular/core';
import { MessagingService } from './messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  
})
export class AppComponent  implements OnInit {

  postDataArr = [];

  onAddPost(postData){
    console.log(postData.length);
    this.postDataArr.push(postData);
  }
  constructor(private messagingService:MessagingService){
    
  } 
  msg;
  ngOnInit() {
    const userId = 'user001';
    this.messagingService.requestPermission(userId)
    this.messagingService.receiveMessage()
    this.msg = this.messagingService.currentMessage
  }

}
