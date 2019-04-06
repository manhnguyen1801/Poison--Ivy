import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  activeTab;

  constructor() { }

  ngOnInit() {
  }

  selectedItem(index) {
    this.activeTab = index;
  }

  getActiveTab() {
    return this.activeTab;
  }

}
