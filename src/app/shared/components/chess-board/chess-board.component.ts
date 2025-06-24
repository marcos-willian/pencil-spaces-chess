import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import {
  MoveChange,
  NgxChessBoardComponent,
  NgxChessBoardModule,
} from 'ngx-chess-board';
import { Player } from '../../domain/models/player.model';
import { Move } from '../../domain/models/move.model';

@Component({
  selector: 'app-chess-board',
  templateUrl: './chess-board.component.html',
  styleUrls: ['./chess-board.component.css'],
})
export class ChessBoardComponent {
  @ViewChild('board') board!: NgxChessBoardComponent;

  player: Player = Player.white;

  reset() {
    this.board.reset();
    this.board.darkDisabled = true;
    this.board.lightDisabled = false;
    if (this.player === Player.black) {
      this.board.reverse();
    }
  }

  setPlayer(player: Player) {
    this.player = player;

    if (this.player === Player.black) {
      this.board.reverse();
      this.board.lightDisabled = true;
    } else {
      this.board.darkDisabled = true;
    }
  }

  updateOponentMove(move: Move) {
    this.takeTurn();

    this.board.setFEN(move.fen);
    if (this.player === Player.black) {
      this.board.reverse();
    }
  }

  private takeTurn() {
    if (this.player === Player.white) {
      this.board.lightDisabled = false;
      return;
    }
    this.board.darkDisabled = false;
  }

  private passTurn() {
    if (this.player === Player.white) {
      this.board.lightDisabled = true;
      return;
    }
    this.board.darkDisabled = true;
  }

  @Output() onMove = new EventEmitter<Move>();

  moveChange(move: MoveChange) {
    this.onMove.emit({
      fen: move.fen,
      checkmate: move.checkmate,
      player: this.player,
    });

    this.passTurn();
  }
}
