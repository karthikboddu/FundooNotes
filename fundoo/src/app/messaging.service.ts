import { Injectable }          from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth }     from '@angular/fire/auth';
import * as firebase from 'firebase';
import { take } from 'rxjs/operators';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs'

@Injectable()
export class MessagingService {

  currentMessage = new BehaviorSubject(null);
  messaging;

  constructor(){
    try{
      firebase.initializeApp({
      'messagingSenderId': '853453207465'
      });
      this.messaging=firebase.messaging();
      }catch(err){
      console.log('Firebase intial',err.stack);
      }
  }


  /**
   * update token in firebase database
   * 
   * @param userId userId as a key 
   * @param token token as a value
   */
  // updateToken(userId, token) {
  //   // we can change this function to request our backend service
  //   this.angularFireAuth.authState.pipe(take(1)).subscribe(
  //     () => {
  //       const data = {};
  //       data[userId] = token
  //       this.angularFireDB.object('fcmTokens/').update(data)
  //     })
  // }

  /**
   * request permission for notification from firebase cloud messaging
   * 
   * @param userId userId
   */
  getPermission() {
    this.messaging.requestPermission()
    .then(() => {
      console.log('Notification permission granted.');
      return this.messaging.getToken()
    })
    .then(token => {
      console.log("FCM Token",token)
      // this.updateToken(token)
    })
    .catch((err) => {
      console.log('Unable to get permission to notify.', err);
    });
  }

  receiveMessage() {
    
     this.messaging.onMessage((payload) => {
      console.log("Message received. ", payload);
      this.currentMessage.next(payload)
    });

  }


}