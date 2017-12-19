import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileEditComponent } from './profile-edit.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../shared/services/api.service';

@NgModule({
  declarations: [
    ProfileEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProfileEditComponent
      }
    ])
  ],
  providers: [ApiService]
})
export class ProfileEditModule { }
