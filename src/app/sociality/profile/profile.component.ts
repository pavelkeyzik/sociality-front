import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../shared/services/api.service';
import { LoaderService } from '../../shared/services/loader.service';
import { TopBarService } from '../../shared/services/top-bar.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less'],
  providers: [ApiService]
})
export class ProfileComponent implements OnInit {
  private id;
  private authId;
  public profile = {};
  private avatar;
  private show: boolean = false;

  constructor(private route: ActivatedRoute,
              private api: ApiService,
              private loaderService: LoaderService,
              private topBar: TopBarService,
              private router: Router) {
                loaderService.setLoad(true);
                topBar.setViewNavBar(true);
              }

  ngOnInit() {
    this.loaderService.setLoad(true);
    this.id = this.route.snapshot.params['id'];
    this.authId = localStorage.getItem('id');

    if(this.id == null)
      this.id = this.authId;

    this.api.getProfile(this.id).subscribe(data => {
      if(!data.avatar) {
        if(data.gender == 'male') {
          data.avatar = 'assets/dev/images/no-avatar-male.svg';
        } else {
          data.avatar = 'assets/dev/images/no-avatar-female.svg';
        }
      }
      this.profile = data;
      this.topBar.setTextNavBar(data.name);
      this.show = true;
      this.loaderService.setLoad(false);
    },
    error => {
      if(error.status == 401) {
        this.router.navigate(['/login']);
      }
    });
  }
}
