import { Component, OnInit } from '@angular/core';
import { TextsService } from '../shared/services/texts.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less'],
    providers: [TextsService]
})
export class LoginComponent implements OnInit {

    public text = {};
    constructor(private textsService: TextsService) {}

    ngOnInit() {
        this.textsService.get('login')
                         .subscribe(texts => this.text = texts);
    }
}