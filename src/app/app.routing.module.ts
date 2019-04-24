import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { ChatboxComponent } from '../app/chatbox/chatbox/chatbox.component';
import { UserProfileComponent } from '../app/user-profile/user-profile/user-profile.component';
import { FindFriendsComponent } from '../app/chatbox/find-friends/find-friends.component';

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
      },
      {
        path: 'find-friends',
        component: FindFriendsComponent
      },
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
