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

  constructor() { }
  search =new Subject();
  word:string;
  searchdata(value:any){
  debugger;
  this.word =value;
  this.search.next({data:value});
  } 
  
  getserch(){
  debugger
  this.searchdata(this.word);
  return this.search.asObservable();
  }


}
