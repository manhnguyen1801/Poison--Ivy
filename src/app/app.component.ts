import { Component, OnInit } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'poison-ivy';
  policies;
  public lat;
  public lng;
  constructor(private db: AngularFireDatabase) { }

  ngOnInit() {
    const dataFireBasePreviewMessenger = this.db.object('/messenger');
    dataFireBasePreviewMessenger.valueChanges().subscribe(messenger => {
      console.log('messenger', messenger);
    });
    this.getLocation();
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: Position) => {
        if (position) {
          console.log("Latitude: " + position.coords.latitude +
            "Longitude: " + position.coords.longitude);
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          console.log(this.lat);
          console.log(this.lng);
          console.log(this.getDistance(this.lat, this.lng));
        }
      },
        (error: PositionError) => console.log(error));
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  rad(x) {
    return x * Math.PI / 180;
  }

  getDistance(p1, p2) {
    const R = 6378137; // Earth’s mean radius in meter
    const dLat = this.rad(this.lat - 21.016807);
    const dLong = this.rad(this.lng - 105.781904);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.rad(this.lat)) * Math.cos(this.rad(21.016807)) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d; // returns the distance in meter
  }
}
