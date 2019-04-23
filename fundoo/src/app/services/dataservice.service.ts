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
  text: any;
  constructor() { }
  searchdata(searchText) {
    debugger
    this.subject = new Subject();
    this.subject.next({ data: searchText });
    this.text = searchText;
  }
  returnsearchdata() {
    this.searchdata(this.text)
    return this.subject.asObservable();
  }


}
