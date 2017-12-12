import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MessagesComponent } from './messages.component';

@NgModule({
  declarations: [
    MessagesComponent
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: MessagesComponent
      }
    ])
  ]
})
export class MessagesModule { }
