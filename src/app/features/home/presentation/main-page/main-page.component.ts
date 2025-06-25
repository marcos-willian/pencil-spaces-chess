import { Component, ElementRef, ViewChild } from '@angular/core';
import { MainService } from '../../domain/services/main/main.service';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/shared/components/alert/service/alert.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent {
  @ViewChild('white') white!: ElementRef<HTMLIFrameElement>;
  @ViewChild('black') black!: ElementRef<HTMLIFrameElement>;
  private subscription?: Subscription;

  constructor(
    private mainPageService: MainService,
    private alertService: AlertService
  ) {}

  ngAfterViewInit() {
    window.addEventListener('message', (event) =>
      this.mainPageService.eventHandler(event)
    );
    this.mainPageService.setPlayers(this.white, this.black);
    this.subscription = this.mainPageService.gameStatus$.subscribe((winner) => {
      if (!winner) return;

      this.alertService.showMessage(
        `${winner} won!!`,
        'New Game',
        () => {
          this.mainPageService.reset();

          return true;
        },
        'Close',
        () => {
          return true;
        }
      );
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  onStartNewGame() {
    this.mainPageService.reset();
  }

  onWhiteLoaded() {
    this.mainPageService.onWhiteLoaded();
  }

  onBlackLoaded() {
    this.mainPageService.onBlackLoaded();
  }
}
