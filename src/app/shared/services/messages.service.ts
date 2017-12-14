import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MessagesService {

    constructor(private http: Http) {}

    get(id: string) {
      if(localStorage.getItem('env') == 'dev')
        return this.http.get('assets/dev/messages.json').map(data => data.json());

      return this.http.get('http://localhost:5000/messages')
                      .map(data => data.json());
    }
}
