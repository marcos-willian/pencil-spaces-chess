import { AngularFireDatabase } from '@angular/fire/compat/database';
import { RealtimeDbRepository } from '../../domain/repositories/realtime-db.repository';
import { Observable } from 'rxjs';
import { Move } from 'src/app/shared/domain/models/move.model';
import { Player } from 'src/app/shared/domain/models/player.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RealtimeDbRepositoryImpl implements RealtimeDbRepository {
  private readonly dataBasePath = 'games';

  constructor(private db: AngularFireDatabase) {}

  createGame(): string | null {
    const id = this.db.list(this.dataBasePath).push({
      fen: '',
      player: Player.white,
      checkmate: false,
    } as Move).key;

    return id;
  }

  joinGame(gameId: string): Observable<Move> {
    return this.db
      .object(`${this.dataBasePath}/${gameId}`)
      .valueChanges() as Observable<Move>;
  }

  makeMove(gameId: string, move: Move): void {
    this.db.object(`${this.dataBasePath}/${gameId}`).update(move);
  }
  endGame(gameId: string): void {
    this.db.object(`${this.dataBasePath}/${gameId}`).remove();
  }

  async gameExist(gameId: string): Promise<boolean> {
    const gameReference = await this.db
      .object(`${this.dataBasePath}/${gameId}`)
      .query.get();

    return gameReference.exists();
  }
}
