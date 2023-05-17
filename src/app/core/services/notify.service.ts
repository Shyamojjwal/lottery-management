import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  private readonly notifier: NotifierService;

  constructor(notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  success = (_message: string = '') => {
    this.notifier.show({
      type: 'success',
      message: _message
    });
  }

  error = (_message: string = '') => {
    this.notifier.show({
      type: 'error',
      message: _message
    });
  }

  info = (_message: string = '') => {
    this.notifier.show({
      type: 'info',
      message: _message
    });
  }
}
