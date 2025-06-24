import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  MoveEvent,
  Player,
  ResetEvent,
  SetPlayerEvent,
} from '../iframe-page/iframe-events';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent {
  @ViewChild('white') white!: ElementRef<HTMLIFrameElement>;
  @ViewChild('black') black!: ElementRef<HTMLIFrameElement>;

  ngAfterViewInit() {
    window.addEventListener('message', (event) => {
      switch (event.data.type) {
        case 'MoveEvent':
          return this.moveEvent(event.data);
        default:
          break;
      }
    });
  }

  onWhiteLoaded() {
    this.white.nativeElement.contentWindow?.postMessage(
      new SetPlayerEvent(Player.white)
    );
    const lastMoveMade = localStorage.getItem('teste');
    if (lastMoveMade) {
      const move = JSON.parse(lastMoveMade);
      this.white.nativeElement.contentWindow?.postMessage(move);
    }
  }

  onBlackLoaded() {
    this.black.nativeElement.contentWindow?.postMessage(
      new SetPlayerEvent(Player.black)
    );
    const lastMoveMade = localStorage.getItem('teste');
    if (lastMoveMade) {
      const move = JSON.parse(lastMoveMade);
      this.black.nativeElement.contentWindow?.postMessage(move);
    }
  }

  moveEvent(moveEvent: MoveEvent) {
    if (moveEvent.move.checkmate) {
      if (window.confirm('Checkmate! Start a new game?')) {
        this.black.nativeElement.contentWindow?.postMessage(new ResetEvent());
        this.white.nativeElement.contentWindow?.postMessage(new ResetEvent());
      }
      localStorage.clear();
      return;
    }

    localStorage.setItem('teste', JSON.stringify(moveEvent));

    if (moveEvent.player === Player.white) {
      this.black.nativeElement.contentWindow?.postMessage(moveEvent);
      return;
    }
    this.white.nativeElement.contentWindow?.postMessage(moveEvent);
  }
}
