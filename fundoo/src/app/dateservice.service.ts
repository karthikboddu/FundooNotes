import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateserviceService {

  constructor() { }
    showtodaydate(){
      let data = new Date();
      return data;
    }

  
}
