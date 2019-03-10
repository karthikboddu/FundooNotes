import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ServiceUrlService {

  constructor() { }
  public host = environment.baseUrl;
  public register = "register";
  public login = "loginto";
  public forgot = "forgotpass";
  public reset = "resetpass";
  public fetchmail = "fetchemail";
}
