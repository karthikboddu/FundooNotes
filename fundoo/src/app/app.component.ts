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
  message;
  ngOnInit() {

    var registrationToken = 'key=dPWn5w4axR4:APA91bGn5_DQoSkuZ4SvcMwE2Ru7jzt23BGwJqJ8V8WMOVHoIGNlNwC818TNWIXjqkUZA1RyZYMtZSmMhLrhe5Ve3kre131DGpHukF_DBk3nspNCaqfI18IXxzf9m-EUHHeGT6Esu80u';
    localStorage.setItem("fcm",registrationToken);
    var message = {
      data: {
        score: '850',
        time: '14:45'
      },
      token: registrationToken
    };
    
    this.messagingService.getPermission()
    this.messagingService.receiveMessage()
    this.message = this.messagingService.currentMessage






  }


}
