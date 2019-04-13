import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material';
import { ShareModule } from '../share/share.module';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { Ng5SliderModule } from 'ng5-slider';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    AngularFireModule,
    AngularFireDatabaseModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    ShareModule,
    MatCardModule,
    MatInputModule,
    Ng5SliderModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  providers: [],
  exports: [UserProfileComponent]
})
export class UserProfileModule { }
