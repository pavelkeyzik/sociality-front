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
      this.apiService.authUser(form.value.login, form.value.password)
                      .subscribe(
                        data => {
                          this.loader.setLoad(false);
                          let access_token = 'Bearer ' + data.access_token;
                          localStorage.setItem('access_token', access_token);
                          this.route.navigate(['/profile']);
                        },
                        error => {
                          this.loader.setLoad(false);
                          console.log('ERROR:', error.status);
                          if(error.status == 404) {
                            console.log('Пользователь не найден');
                          }
                        });
    }
}
