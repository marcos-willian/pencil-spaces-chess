import { Component, ViewChild } from '@angular/core';
import { NgxChessBoardComponent } from 'ngx-chess-board';
import { MoveEvent, Player, SetPlayerEvent } from './iframe-events';

@Component({
  selector: 'app-iframe-page',
  templateUrl: './iframe-page.component.html',
  styleUrls: ['./iframe-page.component.css'],
})
export class IframePageComponent {
  @ViewChild('board') board!: NgxChessBoardComponent;
  player: Player = Player.black;

  ngOnInit() {
    window.addEventListener('message', (event) => {
      switch (event.data.type) {
        case 'SetPlayerEvent':
          return this.setPlayerEvent(event.data);
        case 'MoveEvent':
          return this.moveEvent(event.data);
        case 'ResetEvent':
          return this.resetEvent();
        default:
          break;
      }
    });
  }

  resetEvent() {
    this.board.reset();
    if (this.player === Player.black) {
      this.board.reverse();
    }
  }

  setPlayerEvent(arg: SetPlayerEvent) {
    this.player = arg.player;

    if (this.player === Player.black) {
      this.board.reverse();
      this.board.lightDisabled = true;
    } else {
      this.board.darkDisabled = true;
    }
  }

  moveEvent(moveEvent: MoveEvent) {
    this.enableOnwMove();

    this.board.setFEN(moveEvent.move.fen);
    if (this.player === Player.black) {
      this.board.reverse();
    }
  }

  enableOnwMove() {
    if (this.player === Player.white) {
      this.board.lightDisabled = false;
      return;
    }
    this.board.darkDisabled = false;
  }

  disableOnwMove() {
    if (this.player === Player.white) {
      this.board.lightDisabled = true;
      return;
    }
    this.board.darkDisabled = true;
  }

  moveChange(move: any) {
    parent.postMessage(new MoveEvent(this.player, move));
    this.disableOnwMove();
  }
}
