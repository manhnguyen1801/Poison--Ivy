import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireDatabase } from '@angular/fire/database';
import { UserProfile } from './user-profile.model';
import { Options } from 'ng5-slider';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observer } from 'rxjs';
import * as formAuth from '../../authentication/state/auth.reducer';
import { takeWhile } from 'rxjs/operators';

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
    ceil: 100
  };
  optionsRange: Options = {
    floor: 0,
    ceil: 100
  };
  userAvatarUrl: string;
  userProfileForm: FormGroup;
  componentActive = true;
  userId: string;

  constructor(private db: AngularFireDatabase, private fb: FormBuilder, private store: Store<any>) {
    this.userProfileForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      description: [''],
      // partnerGender: ['', Validators.required],
      // partnerAge: new FormControl([10, 80]),
      // distance: ['']
    });
  }

  ngOnInit() {
    this.store.pipe(
      select(formAuth.getUserId),
      takeWhile(() => this.componentActive))
      .subscribe(userId => {
        this.userId = userId;
        const dataFireBaseUsersList = this.db.object('/usersList');
        dataFireBaseUsersList.valueChanges().subscribe(users => {
          console.log('users', users);
          this.userProfile = users[userId];
          console.log('this.userProfile', this.userProfile);
          if (this.userProfile) {
            this.userProfileForm = this.fb.group({
              name: [this.userProfile.name, Validators.required],
              age: [this.userProfile.age, Validators.required],
              gender: [this.userProfile.gender, Validators.required],
              description: [this.userProfile.description],
              partnerGender: [this.userProfile['partnerGender'], Validators.required],
              partnerAge: new FormControl(this.userProfile['partnerAge']),
              distance: [this.userProfile['distance']]
            });
            this.distance = this.userProfile['distance'];
            this.userAvatarUrl = this.userProfile.avatarUrl;
          } else {
            this.userAvatarUrl = ' ';
          }
        });
      });
  }

  setValue(event) {
    this.userProfileForm.value.distance = event;
  }

  setAvatar(event) {
    if (event && event.downloadURL) {
      this.userAvatarUrl = event.downloadURL;
    }
  }

  saveData() {
    if (this.userProfileForm.valid) {
      this.userProfile = this.userProfileForm.value;
      this.userProfile.avatarUrl = this.userAvatarUrl || '';
      console.log(this.userProfileForm);
      // this.db.object('/usersList').set({data: this.userProfileForm});
      // const user = firebase.auth().currentUser;
      // user.updateProfile({
      //   userInfor: this.userProfile
      // }).then(function() {
      //   // Update successful.
      // }).catch(function(error) {
      //   // An error happened.
      // });
      firebase.database().ref('/usersList/' + this.userId).set(this.userProfile);
    }
  }

}
