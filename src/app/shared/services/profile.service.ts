import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProfileService {

    constructor(private http: Http) {}

    get(id: string) {
      if(localStorage.getItem('env') == 'dev')
        return this.http.get('assets/dev/profile.json').map(data => data.json());

      return this.http.get('http://localhost:5000/profile')
                      .map(data => data.json());
    }
}
