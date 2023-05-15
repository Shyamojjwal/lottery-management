import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public prgBarObserver = new Subject();

  public prgBarSubscriber$ = this.prgBarObserver.asObservable();

  showProgress = () => {
    return this.prgBarObserver.next(true);
  }

  hideProgress = () => {
    return this.prgBarObserver.next(false);
  }
}
