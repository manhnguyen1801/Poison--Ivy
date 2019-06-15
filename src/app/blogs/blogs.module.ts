import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogsShellComponent } from './blogs-shell/blogs-shell.component';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { NewsFeedComponent } from './news-feed/news-feed.component';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { ShareModule } from '../share/share.module';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    BlogsShellComponent, CreateBlogComponent,
    NewsFeedComponent, BlogDetailComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    ShareModule,
    MatSelectModule
  ]
})

export class BlogsModule {
}
