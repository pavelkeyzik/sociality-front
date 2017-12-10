import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SocialityComponent } from './sociality/sociality.component';
import { LoaderComponent } from './loader/loader.component';

import { LoaderService } from './shared/services/loader.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SocialityComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: 'sociality',
        component: SocialityComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ])
  ],
  providers: [LoaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
