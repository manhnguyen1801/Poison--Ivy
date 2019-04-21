import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import * as authActions from '../state/auth.action';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  authenForm: FormGroup;

  constructor(public authService: AuthService, private store: Store<any>, private fb: FormBuilder, private router: Router) {
    this.authenForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.authService.user.subscribe(user => {
      console.log(user);
      if (user && user.uid) {
        this.store.dispatch(new authActions.LoginSuccessful({
          userId: user.uid
        }));
        this.router.navigate(['/landing/chatbox']);
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
}
