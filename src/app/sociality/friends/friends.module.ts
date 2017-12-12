import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FriendsComponent } from './friends.component';

@NgModule({
  declarations: [
    FriendsComponent
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: FriendsComponent
      }
    ])
  ]
})
export class FriendsModule { }
