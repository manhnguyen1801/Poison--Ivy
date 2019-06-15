import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import * as authActions from '../state/auth.action';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  authenForm: FormGroup;
  registerForm: FormGroup;
  isSignup: boolean;

  constructor(public authService: AuthService, private store: Store<any>, private fb: FormBuilder, private router: Router,
    private db: AngularFireDatabase) {
    this.authenForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {validator: this.checkSamePassword('password', 'confirmPassword') });
  }

  ngOnInit() {
    this.authService.user.subscribe(user => {
      if (user && user.uid) {
        const dataFireBaseUsersList = this.db.object('/usersList');
        dataFireBaseUsersList.valueChanges().subscribe(users => {
          this.store.dispatch(new authActions.SetUserList({
            userList: users
          }));
          if (users) {
          const currentUser = users[user.uid];
          this.store.dispatch(new authActions.LoginSuccessful({
            userId: user.uid,
            user: currentUser
          }));
          this.router.navigate(['/landing/blogs']);
          }
        });
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  // signup() {
  //   const email = this.authenForm.controls.email.value;
  //   const password = this.authenForm.controls.password.value;
  //   this.authService.signup(this.email, this.password);
  // }

  login() {
    const email = this.authenForm.controls.email.value;
    const password = this.authenForm.controls.password.value;
    this.authService.login(email, password);
  }

  openSignUpTab() {
    this.isSignup = true;
  }

  signup() {
    console.log(this.registerForm);
    const email = this.registerForm.controls.email.value;
    const password = this.registerForm.controls.password.value;
    this.authService.signup(email, password);
  }

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

  changeTab(event, index) {
    event.preventDefault();
    this.isSignup = !!index;
  }
}
