import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatboxComponent } from './chatbox/chatbox.component';
import { FindFriendsComponent } from './find-friends/find-friends.component';

@NgModule({
  declarations: [ChatboxComponent, FindFriendsComponent],
  imports: [
    CommonModule
  ],
  exports: [ChatboxComponent]
})
export class ChatboxModule { }
