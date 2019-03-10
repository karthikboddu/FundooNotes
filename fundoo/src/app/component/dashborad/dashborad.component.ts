import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashborad',
  templateUrl: './dashborad.component.html',
  styleUrls: ['./dashborad.component.scss']
})
export class DashboradComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
    
   }

   name : '';
  ngOnInit() {
   this.name = this.route.snapshot.params.name;

  }

}
