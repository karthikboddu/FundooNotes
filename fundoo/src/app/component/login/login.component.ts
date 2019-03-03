import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  submitted = false;
  loginform: FormGroup;
  constructor(fb: FormBuilder) {
    this.loginform = fb.group({
      Emailid: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });

  }

  ngOnInit() {  }
  submitForm(value: any){
    this.submitted = true;
    console.log(value);
  }
}
