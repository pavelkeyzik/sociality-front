import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

const API_CONFIG = {
  base_url: 'http://localhost:5000/'
};

@Injectable()
export class ApiService {
    private _env: string;

    constructor(private http: Http) {
      let env = localStorage.getItem('env');
      if(env)
        this._env = env;
      else {
        this._env = 'dev';
        localStorage.setItem('env', 'dev');
      }
    }

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
      if(this._env == 'dev')
        return this.get('assets/dev/user.json');

      let params = {
        login: login,
        password: password
      };
      return this.post(API_CONFIG.base_url + 'authorization', params);
    }
}
