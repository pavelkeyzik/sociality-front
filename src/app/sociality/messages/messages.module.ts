import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MessagesComponent } from './messages.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../../shared/pipes/pipes.module';

@NgModule({
  declarations: [
    MessagesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    RouterModule.forChild([
      {
        path: '',
        component: MessagesComponent
      }
    ])
  ]
})
export class MessagesModule { }
