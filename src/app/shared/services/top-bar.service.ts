import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class TopBarService {
    public textNavBar = new BehaviorSubject<string>('');
    public viewNavBar = new BehaviorSubject<boolean>(false);

    setViewNavBar(state: boolean) {
      this.viewNavBar.next(state);
    }

    setTextNavBar(text: string) {
      this.textNavBar.next(text);
    }
}
