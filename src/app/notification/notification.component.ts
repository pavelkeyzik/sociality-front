import { Component } from '@angular/core';
import { NotificationService } from '../shared/services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.less']
})
export class NotificationComponent {
  private codeStatus: number = 0;
  private show: boolean = false;

  constructor(private notification: NotificationService) {
    this.notification.getStatusCode().subscribe(data => {
      if(data >= 0) {
        this.codeStatus = data;
        this.openWindow();
      }
    });
  }

  openWindow() {
    this.show = true;
    setTimeout(() => {
      this.show = false;
    }, 5000);
  }

  closeNotification() {
    this.show = false;
  }
}
