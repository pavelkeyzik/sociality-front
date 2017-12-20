import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { Router } from '@angular/router';
import { LoaderService } from '../../shared/services/loader.service';
import { TopBarService } from '../../shared/services/top-bar.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.less'],
  providers: [ApiService]
})
export class MessagesComponent implements OnInit, OnDestroy {
  private messages;
  private id = "lol";
  private users = {};
  private query = 0;
  private dialogsInterval;

  constructor(private api: ApiService,
              private router: Router,
              private loader: LoaderService,
              private topBar: TopBarService) {
    this.loader.setLoad(true);
    topBar.setViewNavBar(true);
    this.topBar.setTextNavBar('Messages');
    this.getDialogs();
    this.query += 1;

    this.dialogsInterval = setInterval(() => {
      this.getDialogs();
      this.query += 1;
    }, 2000);
  }

  ngOnInit() {

  }

  getDialogs() {
    this.api.getDialogs().subscribe(data => {

      this.messages = data.result.slice().sort(function (a, b) {
        return a['dateMessage'] > b['dateMessage'] ? -1 : 1;
      });

      this.getUsersInfo(data.result);
      this.loader.setLoad(false);
    }, error => this.router.navigate(['/login']));
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

  ngOnDestroy() {
    clearInterval(this.dialogsInterval);
    console.log('Dialogs destroy');
  }
}
