import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { ChatboxComponent } from '../app/chatbox/chatbox/chatbox.component';
import { UserProfileComponent } from '../app/user-profile/user-profile/user-profile.component';

const appRoutes: Routes = [
  {
    path: 'landing',
    children: [
      {
        path: 'chatbox',
        component: ChatboxComponent
      },
      {
        path: 'user-profile',
        component: UserProfileComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
