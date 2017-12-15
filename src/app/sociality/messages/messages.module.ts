import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MessagesComponent } from './messages.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../../shared/pipes/pipes.module';
import { ViewImageComponent } from './dialog/view-image/view-image.component';

import { DialogComponent } from './dialog/dialog.component';

@NgModule({
  declarations: [
    MessagesComponent,
    DialogComponent,
    ViewImageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    RouterModule.forChild([
      {
        path: '',
        component: MessagesComponent
      },
      {
        path: ':id',
        component: DialogComponent
      }
    ])
  ]
})
export class MessagesModule { }
