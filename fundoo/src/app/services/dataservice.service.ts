import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataserviceService {
  private datamsg = new BehaviorSubject('');
  currentdata = this.datamsg.asObservable();
  view :boolean;
  setCurrentdata(view){
    this.datamsg.next(view);
  }
  constructor() { }
}
