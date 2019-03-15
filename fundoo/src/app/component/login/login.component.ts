import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  submitted = false;
  loginform: FormGroup;

  /**
   * @param formBuilder 
   * @param loginservice 
   * @param route 
   */
  constructor(private formBuilder: FormBuilder, private loginservice: LoginService, private route: Router) { }

  errormsg: string = "";

  /**
   * @description to validate form group value
   */
  ngOnInit() {
    this.loginform = this.formBuilder.group({
      Emailid: [null, [Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: [null, [Validators.required]]
    });
  }


  /**
 * @method submitForm()
 * @param value 
 * @description function to call login serivce and give repsonse back of api
 */

  submitForm(value: any) {
    debugger
    this.submitted = true;
    if(this.loginform.invalid){
      return;
    }
    console.log(value);
    let status = this.loginservice.getuser(value);
    status.subscribe((res: any) => {
    debugger;
      console.log(res.message);
      if (res.message == "200") {
        
        
      this.route.navigate(["/home"]);
      localStorage.setItem(value.Emailid,value.password);
      } else if (res.message == "204") {
        this.errormsg = "login failed";
      }
    });


  }
}
