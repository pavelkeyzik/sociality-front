import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class TopBarService {
    public viewNavBar = new BehaviorSubject<boolean>(false);

    setViewNavBar(state: boolean) {
      // this.viewNavBar.next(state);
    }
}
