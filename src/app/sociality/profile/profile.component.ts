import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  template: '<b>Profile {{ id }}</b>'
})
export class ProfileComponent {
  private id;

  constructor(private route: ActivatedRoute) {
    this.id = route.snapshot.params['id'];
  }


}
