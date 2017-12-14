import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class FriendsService {
    searchText: string = '';

    constructor(private http: Http) {}

    get(userId: string) {
      if(localStorage.getItem('env') == 'dev')
        return this.http.get('assets/dev/friends.json').map(data => data.json());

      return this.http.get('http://localhost:5000/friends')
                      .map(data => data.json());
    }
}
