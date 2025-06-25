import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private _alertSubject = new Subject<AlertEvent>();
  alert$ = this._alertSubject.asObservable();

  showError(
    message: string,
    primaryButtonText: string = 'Ok',
    primaryButtonAction?: () => boolean
  ) {
    this._alertSubject.next({
      message,
      type: 'danger',
      primaryButtonText,
      primaryButtonAction,
    });
  }

  showMessage(
    message: string,
    primaryButtonText: string = 'Ok',
    primaryButtonAction?: () => boolean,
    secondaryButtonText?: string,
    secondaryButtonAction?: () => boolean
  ) {
    this._alertSubject.next({
      message,
      type: 'primary',
      primaryButtonText,
      primaryButtonAction,
      secondaryButtonText,
      secondaryButtonAction,
    });
  }
}

interface AlertEvent {
  message: string;
  type: 'danger' | 'primary';
  primaryButtonText?: string;
  secondaryButtonText?: string;
  primaryButtonAction?: () => boolean;
  secondaryButtonAction?: () => boolean;
}
