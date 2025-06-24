import { Component, ViewChild } from '@angular/core';

import { Move } from 'src/app/shared/domain/models/move.model';
import { ChessBoardComponent } from 'src/app/shared/components/chess-board/chess-board.component';
import { Player } from 'src/app/shared/domain/models/player.model';
import {
  MoveEvent,
  ResetEvent,
  SetPlayerEvent,
} from '../../domain/models/chess-game-events';
import { Router } from '@angular/router';

@Component({
  selector: 'app-iframe-page',
  template: `<app-chess-board #board (onMove)="onMove($event)">
  </app-chess-board>`,
  styleUrls: [],
})
export class IframePageComponent {
  @ViewChild('board') board!: ChessBoardComponent;

  constructor(private router: Router) {}

  ngOnInit() {
    // Check if happened a direct access by browser and redirect to mainpage
    if (window.top === window.self) {
      this.router.navigate(['/mainpage']);
    }

    //As this service is used jus for ui updates, we can handle eventes here
    window.addEventListener('message', (event) => {
      switch (event.data.type) {
        case SetPlayerEvent.name:
          return this.board.setPlayer((<SetPlayerEvent>event.data).player);
        case MoveEvent.name:
          return this.board.updateMove((<MoveEvent>event.data).move);
        case ResetEvent.name:
          return this.board.reset();
        default:
          break;
      }
    });
  }

  onMove(move: any) {
    parent.postMessage(new MoveEvent(move));
  }
}
