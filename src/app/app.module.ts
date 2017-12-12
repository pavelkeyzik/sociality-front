import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SocialityComponent } from './sociality/sociality.component';
import { ProfileModule } from './sociality/profile/profile.module';
import { MessagesModule } from './sociality/messages/messages.module';
import { FriendsModule } from './sociality/friends/friends.module';
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
        path: 'profile',
        loadChildren: () => ProfileModule
      },
      {
        path: 'messages',
        loadChildren: () => MessagesModule
      },
      {
        path: 'friends',
        loadChildren: () => FriendsModule
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: 'profile'
      }
    ])
  ],
  providers: [LoaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
