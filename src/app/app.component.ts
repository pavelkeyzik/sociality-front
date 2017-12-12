import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { LoaderService } from './shared/services/loader.service';
import { LoaderComponent } from './loader/loader.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  public authorized: boolean;
  public loaderState: boolean = true;

  constructor(private router: Router,
              private location: Location,
              private loader: LoaderService) {}

  ngOnInit() {
    this.loader.loaderState.subscribe(data => this.loaderState = data);
    if(localStorage.getItem('access_token') != null) {
      this.authorized = true;
      if(this.location.path() == '/login' || !this.location.path())
        this.router.navigate(['/profile']);
    } else {
      this.authorized = false;
      this.router.navigate(['/login']);
    }
  }
}
