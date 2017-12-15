import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../shared/services/profile.service';
import { LoaderService } from '../../shared/services/loader.service';
import { TopBarService } from '../../shared/services/top-bar.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less'],
  providers: [ProfileService]
})
export class ProfileComponent implements OnInit {
  private id;
  public profile = {};
  private avatar;
  private show: boolean = false;

  constructor(private route: ActivatedRoute,
              private profileService: ProfileService,
              private loaderService: LoaderService,
              private topBar: TopBarService) {
                loaderService.setLoad(true);
                topBar.setViewNavBar(true);
              }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.profileService.get(this.id).subscribe(data => {
      if(!data.avatar) {
        if(data.gender == 'male') {
          data.avatar = 'assets/dev/images/no-avatar-male.svg';
        } else {
          data.avatar = 'assets/dev/images/no-avatar-female.svg';
        }
      }
      this.profile = data;
      this.show = true;
      this.loaderService.setLoad(false);
    });
  }
}
