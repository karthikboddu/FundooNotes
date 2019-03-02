import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {



  ngOnInit() {
  }


  submitted = true;
  regform: FormGroup;
  constructor(fb: FormBuilder) {
    this.regform = fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      Emailid: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });

  }
  submitForm(value: any){
    this.submitted = true;
    console.log(value);
  }








  // onSubmit() {
  //   alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.model))
  // }

}
