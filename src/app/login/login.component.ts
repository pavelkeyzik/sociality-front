import { Component, OnInit } from '@angular/core';
import { TextsService } from '../shared/services/texts.service';
import { ApiService } from '../shared/services/api.service';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less'],
    providers: [TextsService, ApiService]
})
export class LoginComponent implements OnInit {

    public text = {};
    constructor(private textsService: TextsService,
                private apiService: ApiService) {}

    ngOnInit() {
        this.textsService.get('login')
                         .subscribe(texts => this.text = texts);
    }

    onSubmit(form) {
      this.apiService.authUser(form.value.login, form.value.password)
                      .subscribe(
                        data => {
                          let access_token = 'Bearer ' + data.access_token;
                          localStorage.setItem('access_token', access_token);
                        },
                        error => {
                          console.log('ERROR:', error.status);
                          if(error.status == 404) {
                            console.log('Пользователь не найден');
                          }
                        });
    }
}
