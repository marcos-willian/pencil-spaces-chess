import { Component } from '@angular/core';
import { AlertService } from './service/alert.service';

@Component({
  selector: 'app-alert-outlet',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent {
  message: string | null = null;
  primaryButtonText: string | null = null;
  secondaryButtonText: string | null = null;
  primaryButtonAction: (() => boolean) | null = null;
  secondaryButtonAction: (() => boolean) | null = null;
  type: string | null = null;

  primaryAction(): void {
    if (this.primaryButtonAction && this.primaryButtonAction()) {
      this.closeAlert();
    }
  }

  secondaryAction(): void {
    if (this.secondaryButtonAction && this.secondaryButtonAction()) {
      this.closeAlert();
    }
  }

  closeAlert(): void {
    this.message = null;
    this.primaryButtonText = null;
    this.secondaryButtonText = null;
    this.primaryButtonAction = null;
    this.secondaryButtonAction = null;
    this.type = null;
  }

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.alertService.alert$.subscribe((event) => {
      this.message = event.message;
      this.primaryButtonText = event.primaryButtonText || null;
      this.secondaryButtonText = event.secondaryButtonText || null;
      this.primaryButtonAction = event.primaryButtonAction || null;
      this.secondaryButtonAction = event.secondaryButtonAction || null;
      this.type = event.type || null;
    });
  }
}
