import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

maindiv:boolean =false;


  ngOnInit() {
    $(document).ready(function () {
      $(".ip").click(function () {
        $(".ip").css("background-color", "white");
      });
      $(".ip").mouseout(function () {
        $(".ip").css("background-color", "#F5F5F5");
      });
    });
  }

 toggle(){
   this.maindiv = true;
 }


 /**
  * @method logout()
  */
 logout(){
  localStorage.removeItem('email');
  localStorage.removeItem('token');
 }



}
