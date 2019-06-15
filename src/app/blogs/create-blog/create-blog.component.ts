import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import { DatePipe } from '@angular/common';
import { ImageUploadComponent } from '../../share/image-upload/image-upload.component';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.scss']
})
export class CreateBlogComponent implements OnInit {
  imageUrl: string;
  createBlogForm: FormGroup;
  pipe = new DatePipe('en-US');
  uploading: boolean;
  @ViewChild('fileUpload') imageUploaded: ImageUploadComponent;

  constructor(private fb: FormBuilder) {
    this.createBlogForm = this.fb.group({
      title: ['', Validators.required],
      imageUrl: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit() {
  }

  setImage(file) {
    console.log('file', file);
    this.imageUrl = file.downloadURL;
    this.createBlogForm.get('imageUrl').setValue(file.downloadURL);
    this.imageUploaded.defaultImage = false;
  }

  saveData() {
    if (this.createBlogForm.valid) {
      const objectModel = this.createBlogForm.value;
      const formattedDate = this.pipe.transform(new Date(), 'yyyy-MM-dd hh:mm');
      objectModel.createdDate = formattedDate;
      console.log('objectModel', objectModel);
      firebase.database().ref('/blogsList').push(objectModel);
      console.log(firebase.database().ref('/blogsList'));
      this.createBlogForm.reset();
      console.log(this.imageUploaded);
      this.imageUploaded.selectedImageUrl = null;
      this.imageUploaded.defaultImage = true;
    }
  }

}
