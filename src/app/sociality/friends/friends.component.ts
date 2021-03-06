import { Component } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { LoaderService } from '../../shared/services/loader.service';
import { TopBarService } from '../../shared/services/top-bar.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.less'],
  providers: [ApiService]
})
export class FriendsComponent {
  private id;
  private friends;
  private users = {};

  constructor(private api: ApiService,
              private loader: LoaderService,
              private topBar: TopBarService) {
    topBar.setViewNavBar(true);
    topBar.setTextNavBar('Friends');
    this.loader.setLoad(true);
    this.id = localStorage.getItem('id');
    this.api.getFriends(1, 10).subscribe(data => {
      this.friends = data;
      this.updateAvatars(data);
      this.loader.setLoad(false);
    });
  }

  updateAvatars(usersArray) {
    for(let item of usersArray) {
        if(!item.avatar) {
          if(item.gender == 'male') {
            item.avatar = 'assets/dev/images/no-avatar-male.svg';
          } else {
            item.avatar = 'assets/dev/images/no-avatar-female.svg';
          }
        }
    }
  }
}
