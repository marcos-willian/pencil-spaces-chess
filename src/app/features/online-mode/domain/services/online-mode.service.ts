import { Injectable } from '@angular/core';
import { Player } from 'src/app/shared/domain/models/player.model';
import { RealtimeDbRepository } from '../repositories/realtime-db.repository';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Move } from 'src/app/shared/domain/models/move.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OnlineModeService {
  private _gameId: string | null = null;
  get gameId(): string | null {
    return this._gameId;
  }

  private _player: Player | null = null;
  get player(): Player | null {
    return this._player;
  }

  constructor(private db: AngularFireDatabase) {}

  createGame(): Observable<Move> {
    this._gameId = this.db.list('games').push({
      fen: '',
      player: Player.white,
      checkmate: false,
    } as Move).key;
    this._player = Player.white;

    return this.db
      .object(`games/${this._gameId}`)
      .valueChanges() as Observable<Move>;
  }

  joinGame(gameId: string): Observable<Move> {
    this._gameId = gameId;
    this._player = Player.black;

    return this.db
      .object(`games/${this._gameId}`)
      .valueChanges() as Observable<Move>;
  }

  makeMove(move: Move): void {
    this.db.object(`games/${this.gameId}`).update(move);
  }

  endGame(): Promise<void> {
    return this.db.object(`games/${this.gameId}`).remove();
  }
}
