import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { LoaderService } from '../../shared/services/loader.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.less'],
  providers: [ApiService]
})
export class FriendsComponent implements OnInit {
  private id;
  private friends;

  constructor(private api: ApiService,
              private loader: LoaderService) {
    this.loader.setLoad(true);
    this.id = localStorage.getItem('id');
    this.api.getFriends(1, 10).subscribe(data => {
      this.friends = data;
      this.loader.setLoad(false);
    });
  }

  ngOnInit() {
  }
}
