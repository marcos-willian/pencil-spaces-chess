import { Component, ViewChild } from '@angular/core';

import { Move } from 'src/app/shared/domain/models/move.model';
import { ChessBoardComponent } from 'src/app/shared/components/chess-board/chess-board.component';
import { Player } from 'src/app/shared/domain/models/player.model';
import {
  MoveEvent,
  ResetEvent,
  SetPlayerEvent,
} from '../../domain/services/chess-game-events';

@Component({
  selector: 'app-iframe-page',
  templateUrl: './iframe-page.component.html',
  styleUrls: ['./iframe-page.component.css'],
})
export class IframePageComponent {
  @ViewChild('board') board!: ChessBoardComponent;
  player: Player = Player.black;

  constructor() {}

  ngOnInit() {
    //As this service is used jus for ui updates, we can handle eventes here
    window.addEventListener('message', (event) => {
      switch (event.data.type) {
        case SetPlayerEvent.name:
          return this.board.setPlayer((<SetPlayerEvent>event.data).player);
        case MoveEvent.name:
          return this.board.updateOponentMove((<MoveEvent>event.data).move);
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
