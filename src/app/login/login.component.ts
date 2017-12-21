import { Component, OnInit } from '@angular/core';
import { TextsService } from '../shared/services/texts.service';
import { ApiService } from '../shared/services/api.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from '../shared/services/loader.service';
import { NotificationService } from '../shared/services/notification.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less'],
    providers: [TextsService, ApiService]
})
export class LoginComponent implements OnInit {
    public text = {};
    public show = false;
    public id = localStorage.getItem('id');

    constructor(private textsService: TextsService,
                private apiService: ApiService,
                private route: Router,
                private loader: LoaderService,
                private notification: NotificationService) {
                  this.loader.setLoad(true);
                }

    ngOnInit() {
      this.textsService.get('login')
                       .subscribe(texts => {
                         this.text = texts;
                         this.show = true;
                       });
    }

    onSubmit(form) {
      this.loader.setLoad(true);
      this.apiService.authUser(form.value.login, form.value.password)
                      .subscribe(
                        data => {
                          this.loader.setLoad(false);
                          let access_token = 'Bearer ' + data.access_token;
                          localStorage.setItem('access_token', access_token);
                          localStorage.setItem('id', data.id);
                          this.route.navigate(['/profile/' + data.id]);
                        },
                        error => {
                          this.loader.setLoad(false);
                          console.log(error.status);
                          this.notification.setStatusCode(error.status);
                        });
    }
}
