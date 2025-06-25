import { Observable } from 'rxjs';
import { Move } from 'src/app/shared/domain/models/move.model';

export const RealtimeDbRepositoryToken = 'RealtimeDbRepository';

export interface RealtimeDbRepository {
  createGame(): string | null;
  joinGame(gameId: string): Observable<Move>;
  makeMove(gameId: string, move: Move): void;
  endGame(gameId: string): void;
  gameExist(gameId: string): Promise<boolean>;
}
