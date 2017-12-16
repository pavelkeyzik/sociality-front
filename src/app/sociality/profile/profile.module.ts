import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../shared/services/api.service';

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProfileComponent
      },
      {
        path: ':login',
        component: ProfileComponent
      }
    ])
  ],
  providers: [ApiService]
})
export class ProfileModule { }
