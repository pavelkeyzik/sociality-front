import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

const API_CONFIG = {
  base_url: 'http://localhost:5000/'
};

@Injectable()
export class ApiService {
    constructor(private http: Http) {}

    createAuthorizationHeader(headers: Headers) {
      headers.append('Authorization', 'Bearer ' +
        localStorage.getItem('access_token'));
    }

    get(url) {
      let headers = new Headers();
      this.createAuthorizationHeader(headers);
      return this.http.get(url, {
        headers: headers
      }).map(data => data.json());
    }

    post(url, data) {
      let headers = new Headers();
      this.createAuthorizationHeader(headers);
      return this.http.post(url, data, {
        headers: headers
      }).map(data => data.json());
    }

    authUser(login: string, password: string) {
      let params = {
        login: login,
        password: password
      };
      return this.post(API_CONFIG.base_url + 'authorization', params);
    }
}
