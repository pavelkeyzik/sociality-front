import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FriendsComponent } from './friends.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../shared/pipes/filter.pipe';

@NgModule({
  declarations: [
    FriendsComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: FriendsComponent
      }
    ])
  ]
})
export class FriendsModule { }
