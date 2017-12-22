import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../shared/services/api.service';
import { PostsComponent } from './posts/posts.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProfileComponent,
    PostsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProfileComponent
      },
      {
        path: ':id',
        component: ProfileComponent
      }
    ])
  ],
  providers: [ApiService]
})
export class ProfileModule { }
