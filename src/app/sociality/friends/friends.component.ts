import { Component, OnInit } from '@angular/core';
import { FriendsService } from '../../shared/services/friends.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  providers: [FriendsService]
})
export class FriendsComponent implements OnInit {
  private id;
  private friends;

  constructor(private friendsService: FriendsService) {}

  ngOnInit() {
    this.friendsService.get(this.id).subscribe(data => this.friends = data);
  }
}
