import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {Router} from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {
  commentForm: FormGroup;
  userId;
  userId$: Observable<any>;
  userList$: Observable<any>;
  userList;
  displayComments: Array<any>;
  @Input() blogData;

  constructor(private fb: FormBuilder, private store: Store<any>, private router: Router) {
    this.commentForm = this.fb.group({
      comment: ['']
    });
   }

  ngOnInit() {
    this.userId$ = this.store.select<any>(state => {
      return state.auth.userId;
    });
    this.userList$ = this.store.select<any>(state => {
      return state.auth.userList;
    });
    this.userId$.subscribe(userId => {
      if (userId) {
        this.userId = userId;
        this.userList$.subscribe(userList => {
          this.userList = userList;
          if (userList) {
            if (this.blogData.comments && this.blogData.comments.length) {
              this.displayComments = this.blogData.comments.map(comment => {
                const commentUser = this.userList[comment.userId];
                return commentUser ? {
                  ...comment,
                  userName: commentUser.name
                } : comment;
              });
              console.log(this.displayComments);
            }
          }
        });
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  submit() {
    const comment = this.commentForm.value.comment;
    if (comment) {
      const commentObject = {
        comment,
        userId: this.userId
      };
      this.blogData.comments = this.blogData && this.blogData.comments && this.blogData.comments.length
                              ? this.blogData.comments : [];
      this.blogData.comments.push(commentObject);
      console.log(this.blogData);
      firebase.database().ref('/blogsList/' + this.blogData.id).set(this.blogData);
      this.commentForm.reset();
    }
  }

}
