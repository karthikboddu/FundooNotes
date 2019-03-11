import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { PasswordValidation } from '../../services/password.match';
@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {
  resetgrp: FormGroup;
  stat: string = "";
  submitted = false;
  value: any;
  show: any;
  session;
  constructor(private fb: FormBuilder, private loginservice: LoginService) { }

  ngOnInit() {
    this.resetgrp = this.fb.group({
      password: [null, [Validators.required]]
    });
    let obj = this.loginservice.getEmail(this.resetgrp.value);
    obj.subscribe((res: any) => {
      debugger

      if (res.status == 200) {
        this.session = "active",
          this.value = res.key;
        this.show = true;
      } else if (res.status == 204) {
        this.session = "Reset link expired",
          this.show = false
      }
    });
  }

  submitForm(value: any) {

    this.submitted = true;
    if (this.resetgrp.invalid) {
      return;
    }
    debugger
    let status = this.loginservice.userResetPass(value);
    status.subscribe((res: any) => {
      debugger
      if (res.message == "200") {
        this.stat = "reset successfull";
      } else {
        this.stat = " reset not succesfull";
      }
    })
  }


}
