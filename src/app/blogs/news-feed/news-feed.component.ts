import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.scss']
})
export class NewsFeedComponent implements OnInit {
  blogsList;
  displayList;
  constructor(private db: AngularFireDatabase, private fb: FormBuilder, private authService: AuthService, private router: Router) {

  }

  ngOnInit() {
    const blogsList = this.db.object('/blogsList');
    blogsList.valueChanges().subscribe(blog => {
      if (blog) {
        this.blogsList = Object.keys(blog).map(item => {
          return {
            ... blog[item],
            id: item
          };
        });
        console.log('blogsList', this.blogsList);
        this.displayList = this.blogsList.slice().reverse();
      }
    });
  }

  sortBy(event) {
    // const sortedArray = [];
    if (event.value) {
      const sortArray = this.blogsList.map(blog => blog[event.value] + blog.id);
      sortArray.sort();
      this.displayList = sortArray.reduce((array, item) => {
        const itemBlog = this.blogsList.filter(blog => blog[event.value]  + blog.id === item)[0];
        array.push(itemBlog);
        return array;
      }, []);
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
