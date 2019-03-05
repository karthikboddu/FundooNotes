import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';
import { from } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  submitted = false;
  loginform: FormGroup;
  constructor(private formBuilder: FormBuilder ,private loginservice : LoginService,private route:Router) {}

  errormsg :string="";
  ngOnInit() { 

    this.loginform = this.formBuilder.group({
      Emailid: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
   }
  submitForm(value: any){
    debugger
    this.submitted = true;
    console.log(value);
    let status = this.loginservice.getuser(value);
    status.subscribe((res:any)=>{
      console.log(res.message);
      if(res.message=="200"){
        this.route.navigate['../register'];
      }else if(res.message=="204"){
        this.errormsg = "register failed";
      }
    });


  }
}
