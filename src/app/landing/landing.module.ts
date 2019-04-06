import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing/landing.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChatboxModule } from '../chatbox/chatbox.module';
import { UserProfileModule } from '../user-profile/user-profile.module';

@NgModule({
  declarations: [LandingComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ChatboxModule,
    UserProfileModule
  ]
})
export class LandingModule { }
