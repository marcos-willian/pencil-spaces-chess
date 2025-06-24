import { Component, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Database, ref, set, onValue } from '@angular/fire/database';
import { NgxChessBoardComponent } from 'ngx-chess-board';

@Component({
  selector: 'app-online-mode',
  templateUrl: './online-mode.component.html',
  styleUrls: ['./online-mode.component.css'],
})
export class OnlineModeComponent {
  @ViewChild('board') board!: NgxChessBoardComponent;
  gameId: string | null = null;
  joinCode = '';
  playerColor = 'white';
  isDisabled = false;

  constructor(private db: AngularFireDatabase) {}

  createGame() {
    const newGameRef = this.db.list('games').push({ fen: '', turn: 'w' });
    this.gameId = newGameRef.key;
    this.playerColor = 'white';
    this.listenForMoves();
  }

  joinGame() {
    this.gameId = this.joinCode;
    this.playerColor = 'black';
    this.listenForMoves();
  }

  listenForMoves() {
    if (!this.gameId) return;
    this.db
      .object(`games/${this.gameId}`)
      .valueChanges()
      .subscribe((data: any) => {
        if (data?.fen) {
          this.board.setFEN(data.fen);
          this.isDisabled = data.turn !== this.playerColor[0];
        }
      });
  }

  moveMade(event: any) {
    if (!this.gameId) return;
    this.db
      .object(`games/${this.gameId}`)
      .update({ fen: event.fen, turn: event.color === 'w' ? 'b' : 'w' });
  }
}
