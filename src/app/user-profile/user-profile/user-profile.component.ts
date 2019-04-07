import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireDatabase } from '@angular/fire/database';
import { UserProfile } from './user-profile.model';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userProfile: UserProfile;
  genders = ['Nam', 'Nữ'];
  distance = 0;
  options: Options = {
    floor: 0,
    ceil: 200
  };

  constructor(private db: AngularFireDatabase) { }

  ngOnInit() {
  }

  setAvatar(event) {
    if (event && event.downloadURL) {
      this.userProfile = {
        ...this.userProfile,
        avatarUrl: event.downloadURL
      };
      console.log(this.userProfile);
    }
  }

}
