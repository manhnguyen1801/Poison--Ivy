import { Component, OnInit } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as formAuth from '../../authentication/state/auth.reducer';
import { takeWhile } from 'rxjs/operators';
import { Validators, FormControl } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-find-friends',
  templateUrl: './find-friends.component.html',
  styleUrls: ['./find-friends.component.scss']
})
export class FindFriendsComponent implements OnInit {
  images = [
    'https://placeimg.com/300/300/nature/6',
    'https://placeimg.com/300/300/nature/7',
    'https://placeimg.com/300/300/nature/8',
    'https://placeimg.com/300/300/nature/9',
    'https://placeimg.com/300/300/nature/2',
    'https://placeimg.com/300/300/nature/3',
    'https://placeimg.com/300/300/nature/1',
  ];
  userId$: Observable<any>;
  userId: string;
  componentActive = true;

  public config: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 1,
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    navigation: true,
    pagination: false
  };

  constructor(private store: Store<any>, private db: AngularFireDatabase, private router: Router) {
  }

  ngOnInit() {
    this.store.pipe(
      select(formAuth.getUserId),
      takeWhile(() => this.componentActive))
      .subscribe(userId => {
        this.userId = userId;
        const getUserById = this.db.object(`/usersList/${userId}`);
        getUserById.valueChanges().subscribe(user => {
          console.log('user', user);
          if (!user) {
            this.router.navigate(['/landing/user-profile']);
          }
        });
      });
  }

}
