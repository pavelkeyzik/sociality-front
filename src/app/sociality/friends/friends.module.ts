import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FriendsComponent } from './friends.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PipesModule } from '../../shared/pipes/pipes.module';

@NgModule({
  declarations: [
    FriendsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    RouterModule.forChild([
      {
        path: '',
        component: FriendsComponent
      }
    ])
  ]
})
export class FriendsModule { }
