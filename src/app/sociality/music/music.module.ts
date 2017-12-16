import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MusicComponent } from './music.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PipesModule } from '../../shared/pipes/pipes.module';

@NgModule({
  declarations: [
    MusicComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    RouterModule.forChild([
      {
        path: '',
        component: MusicComponent
      }
    ])
  ]
})
export class MusicModule { }
