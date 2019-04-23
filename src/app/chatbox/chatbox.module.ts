import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatboxComponent } from './chatbox/chatbox.component';
import { MatInputModule } from '@angular/material';

@NgModule({
  declarations: [ChatboxComponent],
  imports: [
    CommonModule,
    MatInputModule
  ],
  exports: [ChatboxComponent]
})
export class ChatboxModule { }
