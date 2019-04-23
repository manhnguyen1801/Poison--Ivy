import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  email: string;
  password: string;
  authenForm: FormGroup;

  constructor(public authService: AuthService, private store: Store<any>, private fb: FormBuilder, private router: Router) {
    this.authenForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {validator: this.checkSamePassword('password', 'confirmPassword') });
  }

  ngOnInit() {
  }

  signup() {
    console.log(this.authenForm);
    const email = this.authenForm.controls.email.value;
    const password = this.authenForm.controls.password.value;
    this.authService.signup(email, password);
  }

  // login() {
  //   const email = this.authenForm.controls.email.value;
  //   const password = this.authenForm.controls.password.value;
  //   this.authService.login(email, password);
  // }

  checkSamePassword(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    };
}

}
