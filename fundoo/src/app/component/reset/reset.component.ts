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
  resetgrp : FormGroup;
  stat :string ="";
  submitted = false;
  value ;
  session;
  constructor(private fb:FormBuilder,private loginservice :LoginService) { }

  ngOnInit() {
    this.resetgrp = this.fb.group({
      password: [null, [Validators.required]]
    });
  }

  submitForm(value:any){
    
    this.submitted = true;
    if(this.resetgrp.invalid){
      return ;
    }
    debugger
    let obj = this.loginservice.getEmail(value);
    obj.subscribe((res: any) => {
      debugger
      this.value = res.key;
      this.session = res.session;
    });
    debugger
    let status = this.loginservice.userResetPass(value);
    status.subscribe((result:any)=>{
      debugger
      if(result.message=="200"){
        this.stat = "reset successfull";
      }else{
        this.stat =" sadf";
      }
    })
  }


}
