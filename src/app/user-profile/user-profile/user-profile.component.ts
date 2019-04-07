import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireDatabase } from '@angular/fire/database';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  avatar;
  selectedAvatar;
  uploadTask;

  @ViewChild('fileUpload') fileUpload: ElementRef;

  constructor(private db: AngularFireDatabase) { }

  ngOnInit() {
    // tslint:disable-next-line:max-line-length
    this.avatar = `https://firebasestorage.googleapis.com/v0/b/poison-ivy-be7aa.appspot.com/o/${encodeURIComponent('images/')}06-christian-isaiah-shameless-2.w700.h700.jpg?alt=media&token=2707e127-579c-4a87-bf93-6aab05424e6a`;
    const dataFireBasePreviewMessenger = this.db.object('/messenger');
    console.log('this.db', this.db);
    dataFireBasePreviewMessenger.valueChanges().subscribe(messenger => {
      console.log('messenger', messenger);
    });
  }

  uploadAvatar() {
    const el: HTMLElement = this.fileUpload.nativeElement as HTMLElement;
    el.click();
  }

  uploadFile(imageInput) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`poison-ivy-be7aa.appspot.com/${file.name}`).put(file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>  {
        // upload in progress
        console.log(snapshot);
      },
      (error) => {
        // upload failed
        console.log(error);
      },
      () => {
        // upload success
        console.log(uploadTask.snapshot.downloadURL);
      }
    );

    // reader.addEventListener('load', (event: any) => {
    //   console.log(event.target.result);
    //   this.selectedAvatar = new ImageSnippet(event.target.result, file);
    //   console.log('this.selectedAvatar.file', this.selectedAvatar.file);
    //   // this.imageService.uploadImage(this.selectedAvatar.file).subscribe(
    //   //   (res) => {
        
    //   //   },
    //   //   (err) => {
        
    //   //   })
    //   const storageRef = firebase.storage().ref();
    //   const imagesRef =  storageRef.child('images');
    //   this.uploadTask = storageRef.child(`poison-ivy-be7aa.appspot.com/${this.selectedAvatar.name}`).put(this.selectedAvatar);
    //   console.log('uploadTask', this.uploadTask);
    // });

    // reader.readAsDataURL(file);
  }

}
