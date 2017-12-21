import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class NotificationService {
    public statusCode = new BehaviorSubject<number>(-1);

    setStatusCode(code: number) {
      this.statusCode.next(code);
    }

    getStatusCode() {
      return this.statusCode;
    }
}
