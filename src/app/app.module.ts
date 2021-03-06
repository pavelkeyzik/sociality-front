import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { SocialityComponent } from './sociality/sociality.component';
import { ProfileModule } from './sociality/profile/profile.module';
import { ProfileEditModule } from './sociality/profile-edit/profile-edit.module';
import { MessagesModule } from './sociality/messages/messages.module';
import { FriendsModule } from './sociality/friends/friends.module';
import { MusicModule } from './sociality/music/music.module';
import { LoaderComponent } from './loader/loader.component';
import { NotificationComponent } from './notification/notification.component';

import { LoaderService } from './shared/services/loader.service';
import { TopBarService } from './shared/services/top-bar.service';
import { NotificationService } from './shared/services/notification.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    SocialityComponent,
    LoaderComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MusicModule,
    RouterModule.forRoot([
      {
        path: 'profile',
        loadChildren: () => ProfileModule
      },
      {
        path: 'profile-edit',
        loadChildren: () => ProfileEditModule
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
        path: 'music',
        loadChildren: () => MusicModule
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'registration',
        component: RegistrationComponent
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
  providers: [LoaderService, TopBarService, NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
