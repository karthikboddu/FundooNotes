import { Component, OnInit, Output ,EventEmitter} from '@angular/core';
import * as $ from 'jquery';
import {ViewService} from '../../services/view.service';
import { DataserviceService } from 'src/app/services/dataservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private viewservice: ViewService,private dataservice:DataserviceService) { }
  grid: boolean = false;
  list: boolean = true;
  maindiv: boolean = false;

  breakpoint: number;
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


  @Output() changeviewevent = new EventEmitter<boolean>();


  toggle() {
    this.maindiv = true;
  }

  changeView() {
    if (this.list == true) {
      this.grid = true;
      this.list = false;
      this.dataservice.setCurrentdata(this.grid);
    } else {
      this.list = true;
      this.grid = false;
      this.dataservice.setCurrentdata(this.list);
    }

    this.viewservice.gridview();
    
  }
  /**
   * @method logout()
   */
  logout() {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
  }



}
