import { Component, OnInit, ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {

  constructor() { }

  _opened: boolean = false;
  section = 'products';

  @ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;

  ngOnInit() {
  }

  _toggleSidebar() {
    this._opened = !this._opened;
  }

  selectTab(tabId: number) {
    this.staticTabs.tabs[tabId].active = true;
  }

}
