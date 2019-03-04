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


  submitted = false;
  regform: FormGroup;

  submitForm(value: any) {
    debugger;
    this.submitted = true;
    console.log(value);
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(value))
    if(this.regform.invalid){
      return;
    }
    this.regService.createuser(value)    
    .subscribe(data=>{console.log(data),error=>console.log(data)});

  }








  // onSubmit() {
  //   alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.model))
  // }

}
