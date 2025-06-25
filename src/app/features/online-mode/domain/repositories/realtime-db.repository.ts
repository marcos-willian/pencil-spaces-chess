import { Observable } from 'rxjs';
import { Move } from 'src/app/shared/domain/models/move.model';

export interface RealtimeDbRepository {
  createGame(): Promise<string>;
  joinGame(gameId: string): [Error, Observable<Move>];
  makeMove(gameId: string, move: Move): Promise<void>;
  endGame(gameId: string): Promise<void>;
  getGameState(gameId: string): Promise<any>;
}
