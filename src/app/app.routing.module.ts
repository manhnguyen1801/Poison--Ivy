import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from '../app/user-profile/user-profile/user-profile.component';
import { BlogsShellComponent } from '../app/blogs/blogs-shell/blogs-shell.component';

const appRoutes: Routes = [
  {
    path: 'landing',
    children: [
      {
        path: 'blogs',
        component: BlogsShellComponent
      }
    ],
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
