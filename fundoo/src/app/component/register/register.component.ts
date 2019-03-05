import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {RegisterService} from '../../services/register.service';

import { PasswordValidation } from '../../password.match';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {



  constructor(private formBuilder: FormBuilder,private regService:RegisterService) {
  }


  ngOnInit() {
    this.regform = this.formBuilder.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      Emailid: [null, [Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', Validators.required],
      cpassword: ['', Validators.required]
    }, {
      validator: PasswordValidation.MatchPassword
    });
  }

  errormsg :string="";
  submitted = false;
  regform: FormGroup;

  submitForm(value: any) {
    debugger;
    this.submitted = true;
    if(this.regform.invalid){
      return;
    }
    let status = this.regService.createuser(value) ;   
    status.subscribe((res:any)=>{
      console.log(res.message);
      if(res.message=="200"){
        this.errormsg = "register success"; 
      }else if(res.message=="204"){
        this.errormsg = "register failed";
      }
    });

  }








  // onSubmit() {
  //   alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.model))
  // }

}
