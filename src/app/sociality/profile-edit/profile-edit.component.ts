import { Component } from '@angular/core';
import { TopBarService } from '../../shared/services/top-bar.service';
import { LoaderService } from '../../shared/services/loader.service';
import { ApiService } from '../../shared/services/api.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.less'],
  providers: [ApiService]
})
export class ProfileEditComponent {
  private profile = {};
  private show = false;
  private gender: string = '';

  constructor(private topBar: TopBarService,
              private api: ApiService,
              private loader: LoaderService,
              private router: Router) {
    topBar.setViewNavBar(true);
    topBar.setTextNavBar('Edit profile');
    loader.setLoad(true);
    api.getProfile(localStorage.getItem('id'))
       .subscribe(data => {
         this.gender = data.gender;
         if(!data.avatar) {
           if(data.gender == 'male') {
             data.avatar = 'assets/dev/images/no-avatar-male.svg';
           } else {
             data.avatar = 'assets/dev/images/no-avatar-female.svg';
           }
         }
         this.profile = data;
    });
  }

  ngOnInit() {
    this.loader.setLoad(false);
    this.show = true;
  }

  onSubmit(form) {
    let params = {};

    if(form.value.name != '')
      params.name = form.value.name;

    if(form.value.phone != '')
      params.phone = form.value.phone;

    if(form.value.email != '')
      params.email = form.value.email;

    console.log(params);
    params.gender = this.gender;
    this.api.updateProfile(localStorage.getItem('id'), params)
            .subscribe(data => {
              this.router.navigate(['/profile']);
            });
  }

  selectGender(gender: string) {
    this.gender = gender;
  }

  signOut() {
    this.api.updateStatus(localStorage.getItem('id'), false).subscribe(() => {
      this.topBar.setViewNavBar(false);
      localStorage.clear();
      this.router.navigate(['/login']);
    });
  }
}
