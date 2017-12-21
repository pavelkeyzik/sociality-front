import { Component, OnInit } from '@angular/core';
import { TextsService } from '../shared/services/texts.service';
import { ApiService } from '../shared/services/api.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from '../shared/services/loader.service';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.less'],
    providers: [TextsService, ApiService]
})
export class RegistrationComponent implements OnInit {
    public text = {};
    public show = false;
    private gender: string = 'male';

    constructor(private textsService: TextsService,
                private apiService: ApiService,
                private route: Router,
                private loader: LoaderService) {
                  this.loader.setLoad(true);
                }

    ngOnInit() {
      this.textsService.get('login')
                       .subscribe(texts => {
                         this.text = texts;
                         this.show = true;
                         this.loader.setLoad(false);
                       });
    }

    onSubmit(form) {
      this.loader.setLoad(true);
      let params = {
        login: form.value.login,
        password: form.value.password,
        repeatedPassword: form.value.repeatedPassword,
        gender: this.gender
      };
      this.apiService.registrationUser(params)
                      .subscribe(
                        success => {
                          this.apiService.authUser(params.login, params.password)
                              .subscribe(data => {
                                this.loader.setLoad(false);
                                let access_token = 'Bearer ' + data.access_token;
                                localStorage.setItem('access_token', access_token);
                                localStorage.setItem('id', data.id);
                                this.route.navigate(['/profile/' + data.id]);
                              });
                        },
                        error => {
                          this.loader.setLoad(false);
                          console.log('ERROR:', error);
                          if(error.status == 404) {
                            console.log('Пользователь не зарегистрирован');
                          }
                          if(error.status == 0) {
                            console.log('Возможно сервер не запущен или находится по другому адресу');
                          }
                        });
    }

    selectGender(gender: string) {
      this.gender = gender;
    }
}
