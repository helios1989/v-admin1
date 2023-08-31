import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  activateToggle: string = '';
  toggleSidebar() {
    if (this.activateToggle) {
      this.activateToggle = ''
    } else {
      this.activateToggle = 'toggled'
    }
  }
}
