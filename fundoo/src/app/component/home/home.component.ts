import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function () {
      $(".ip").click(function () {
        $(".ip").css("background-color", "white");
      });
      $(".ip").mouseout(function () {
        $(".ip").css("background-color", "#F5F5F5");
      });

      $(".matcard").hide();

      $(".ipnotes").click(function(){
        $(".matcard").show();
        $(".ipnotes").hide();
      });
      $(".maindiv").click(function(){
        $(".matcard").hide();
        $(".ipnotes").show();
      });

  

    });
  }

}
