import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataserviceService {
  private datamsg = new BehaviorSubject('');
  // currentdata = this.datamsg.asObservable();
  // view :boolean;
  // setCurrentdata(view){
  //   this.datamsg.next(view);
  // }

  subject;
  variable: any;
  constructor() { }
  searchdata(value) {
    this.subject = new Subject();
    this.subject.next({ data: value });
    this.variable = value;
  }
  returnsearchdata() {
    this.searchdata(this.variable)
    return this.subject.asObservable();
  }


}
