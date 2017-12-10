import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
              private loader: LoaderService) {}

  ngOnInit() {
    this.loader.loaderState.subscribe(data => this.loaderState = data);
    if(localStorage.getItem('access_token') != null) {
      this.authorized = true;
      this.router.navigate(['/sociality']);
    } else {
      this.authorized = false;
      this.router.navigate(['/login']);
    }
  }
}
