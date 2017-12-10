import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class LoaderService {
    public loaderState = new BehaviorSubject<boolean>(false);

    setLoad(state: boolean) {
      this.loaderState.next(state);
    }
}
