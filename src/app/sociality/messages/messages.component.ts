import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { Router } from '@angular/router';
import { LoaderService } from '../../shared/services/loader.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.less'],
  providers: [ApiService]
})
export class MessagesComponent implements OnInit {
  private messages;
  private id = "lol";
  private users = {};

  constructor(private api: ApiService,
              private router: Router,
              private loader: LoaderService) {
    this.loader.setLoad(true);
    this.api.getDialogs().subscribe(data => {

      this.messages = data.result.slice().sort(function (a, b) {
        return a['dateMessage'] > b['dateMessage'] ? -1 : 1;
      });

      this.getUsersInfo(data.result);
      this.loader.setLoad(false);
    }, error => router.navigate(['/login']));
  }

  ngOnInit() {

  }

  getUsersInfo(messages) {
    for(let item of messages) {
      let subscriber = this.api.getProfile(item.friendId).subscribe(data => {

        if(!data.avatar) {
          if(data.gender == 'male') {
            data.avatar = 'assets/dev/images/no-avatar-male.svg';
          } else {
            data.avatar = 'assets/dev/images/no-avatar-female.svg';
          }
        }
        this.users[item.friendId] = data;
        subscriber.unsubscribe();
      });
    }
  }
}
