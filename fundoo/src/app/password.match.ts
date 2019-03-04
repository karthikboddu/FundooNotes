import { AbstractControl } from '@angular/forms';
export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
        let password = AC.get('password').value;
        if(AC.get('cpassword').touched || AC.get('cpassword').dirty) {
            let verifyPassword = AC.get('cpassword').value;

            if(password != verifyPassword) {
                AC.get('cpassword').setErrors( {MatchPassword: true} )
            } else {
                return null
            }
        }
    }
}
   