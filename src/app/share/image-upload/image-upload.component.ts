import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {
  selectedImageUrl;
  uploadTask;
  imageObject;
  defaultImage;
  @ViewChild('fileUpload') fileUpload: ElementRef;
  @Output() imageObjectChange = new EventEmitter();
  @Input() imgUrl: string;

  constructor() { }

  ngOnInit() {
    console.log(this.imgUrl);
    if (!this.imgUrl) {
      this.defaultImage = true;
    }
    this.selectedImageUrl = this.imgUrl;
  }

  uploadAvatar() {
    const el: HTMLElement = this.fileUpload.nativeElement as HTMLElement;
    el.click();
  }

  uploadFile(imageInput) {
    const file: File = imageInput.files[0];
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`poison-ivy-be7aa.appspot.com/${file.name}`).put(file);
    const imageRef =  storageRef.child(`poison-ivy-be7aa.appspot.com/${file.name}`);
    console.log('firebase.storage.TaskEvent', firebase.storage.TaskEvent);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>  {
        // upload in progress
        console.log(snapshot);
      },
      (error) => {
        // upload failed
        this.imageObjectChange.emit(null);
        console.log(error);
      },
      () => {
        imageRef.getDownloadURL().then(downloadURL => {
          this.selectedImageUrl = downloadURL;
          this.imageObject = {
            downloadURL,
            name: file.name
          };
          this.imageObjectChange.emit(this.imageObject);
        });
      }
    );
  }

}
