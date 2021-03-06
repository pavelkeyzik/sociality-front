import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { LoaderService } from './shared/services/loader.service';
import { LoaderComponent } from './loader/loader.component';
import { TopBarService } from './shared/services/top-bar.service';
import { NotificationService } from './shared/services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  public authorized: boolean;
  public loaderState: boolean = true;
  public viewNavBar: boolean = false;
  public textNavBar: string = '';
  public showNotification: boolean = false;

  constructor(private router: Router,
              private location: Location,
              private loader: LoaderService,
              private topBar: TopBarService,
              private notification: NotificationService) {
                this.topBar.setViewNavBar(false);
                this.notification.getStatusCode()
                  .subscribe(data => {
                    if(data == 0 || data == 404)
                      this.showNotification = true;
                  });
              }

  ngOnInit() {
    this.topBar.setViewNavBar(false);
    this.loader.loaderState.subscribe(data => this.loaderState = data);
    this.topBar.viewNavBar.subscribe(data => this.viewNavBar = data);
    this.topBar.textNavBar.subscribe(data => this.textNavBar = data);

    if(localStorage.getItem('access_token') != null) {
      this.authorized = true;
      if(this.location.path() == '/login' || !this.location.path())
        this.router.navigate(['/profile/' + localStorage.getItem('id')]);
    } else {
      this.authorized = false;
      if(this.location.path() == '/registration')
        this.router.navigate(['/registration']);
      else
        this.router.navigate(['/login']);
    }
  }

  goBack() {
    this.location.back();
  }
}
