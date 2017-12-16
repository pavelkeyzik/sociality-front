import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TextsService {
    private selectedLanguage: string = 'en';

    constructor(private http: Http) {}

    get(page: string) {
        return this.http.get('assets/texts/' + this.selectedLanguage + '/' + page + '.json')
                 .map(data => data.json());
    }
}
