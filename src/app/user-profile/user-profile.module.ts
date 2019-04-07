import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    AngularFireModule,
    AngularFireDatabaseModule
  ],
  exports: [UserProfileComponent]
})
export class UserProfileModule { }
