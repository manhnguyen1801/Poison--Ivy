import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LoginComponent } from './login/login.component';
import { authReducer } from './state/auth.reducer';
import { AuthEffect } from './state/auth.effect';
import { AuthService } from './auth.service';

const authRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(authRoutes),
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature(
      [AuthEffect]
    ),
  ],
  declarations: [
    LoginComponent
  ],
  exports: [
  ],
  providers: [
    AuthService
  ]
})

export class AuthenticationModule { }
