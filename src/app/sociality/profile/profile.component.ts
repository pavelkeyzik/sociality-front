import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent {
  private id;

  constructor(private route: ActivatedRoute) {
    this.id = route.snapshot.params['id'];
  }
}
