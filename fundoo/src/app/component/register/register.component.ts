import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { AbstractControl } from '@angular/forms';

import { PasswordValidation } from '../../services/password.match';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  /**
   * @param formBuilder 
   * @param regService 
   */
  constructor(private formBuilder: FormBuilder, private regService: RegisterService) { }

  /**
    * @return void
    * @description Function to error validation
    */
  ngOnInit() {
    this.regform = this.formBuilder.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      Emailid: [null, [Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required,Validators.minLength(6)]],
      cpassword: ['', [Validators.required,Validators.minLength(6)]]
    }, {
        validator: PasswordValidation.MatchPassword
      });
  }


//   static MatchPassword(AC: AbstractControl) {
//     let password = AC.get('password').value;
//     if (AC.get('cpassword').touched || AC.get('cpassword').dirty) {
//         let verifyPassword = AC.get('cpassword').value;

//         if (password != verifyPassword) {
//             AC.get('cpassword').setErrors({ MatchPassword: true })
//         } else {
//             return null
//         }
//     }
// }

  errormsg: string = "";
  submitted = false;
  regform: FormGroup;
  show ;
  /**
   * @method submitForm()
   * @param value 
   * @description function to call register serivce and give repsonse back of api
   */
  submitForm(value: any) {
    debugger;
    this.submitted = true;
    if (this.regform.invalid) {
      return;
    }
    let status = this.regService.createuser(value);
    status.subscribe((res: any) => {
      debugger;
      console.log(res.message);
      if (res.status == "200") {
        this.show = true; 
        this.errormsg = "Register success";
      } else if (res.status == "204") {
        this.show = true; 
        this.errormsg = "Register failed";
      }
      else if(res.status =="201"){
        this.errormsg = "Email is present";
        this.show = true; 
      }
    });

  }








  // onSubmit() {
  //   alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.model))
  // }

}