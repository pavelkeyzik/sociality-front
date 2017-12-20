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
        this._env = 'prod';
        localStorage.setItem('env', 'prod');
      }
    }

    createAuthorizationHeader(headers: Headers) {
      headers.append('Authorization', localStorage.getItem('access_token'));
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

    put(url, data) {
      let headers = new Headers();
      this.createAuthorizationHeader(headers);
      return this.http.put(url, data, {
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

    registrationUser(params) {
      return this.post(API_CONFIG.base_url+ 'registration', params);
    }

    getProfile(id: string) {
      if(this._env == 'dev')
        return this.http.get('assets/dev/profile.json').map(data => data.json());

      return this.get(API_CONFIG.base_url + 'profile/' + id);
    }

    updateProfile(id:string, params) {
      return this.put(API_CONFIG.base_url + 'profile/' + id, params);
    }

    updateStatus(id:string, online: boolean) {
      let params = {
        online: online
      };
      return this.put(API_CONFIG.base_url + 'profile/' + id, params);
    }

    getMessages(friendId: string) {
      if(localStorage.getItem('env') == 'dev')
        return this.http.get('assets/dev/messages.json').map(data => data.json());

      return this.get(API_CONFIG.base_url + 'messages/' + friendId);
    }

    sendMessage(friendId: string, params) {
      return this.post(API_CONFIG.base_url + 'messages/' + friendId, params);
    }

    readMessage(friendId: string) {
      console.log('readMessage', friendId);
      console.log('>>>>', API_CONFIG.base_url + 'messages/read/' + friendId);
      return this.get(API_CONFIG.base_url + 'messages/read/' + friendId);
    }

    getDialogs() {
      if(localStorage.getItem('env') == 'dev')
        return this.http.get('assets/dev/messages.json').map(data => data.json());

      return this.get(API_CONFIG.base_url + 'dialogs');
    }

    getFriends(page: number, limit: number) {
      if(localStorage.getItem('env') == 'dev')
        return this.http.get('assets/dev/friends.json').map(data => data.json());

      let params = {
        page: page,
        limit: limit
      };
      return this.post(API_CONFIG.base_url + 'profile', params);
    }
}
