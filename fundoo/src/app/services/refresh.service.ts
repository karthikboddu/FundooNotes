import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {

  constructor() { }


  refreshservice(method){
    setInterval(() => {
      
    }, 1000);
  }
}
