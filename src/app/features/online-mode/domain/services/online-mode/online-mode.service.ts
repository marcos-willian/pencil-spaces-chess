import { Inject, Injectable } from '@angular/core';
import { Player } from 'src/app/shared/domain/models/player.model';
import {
  RealtimeDbRepository,
  RealtimeDbRepositoryToken,
} from '../../repositories/realtime-db.repository';
import { Move } from 'src/app/shared/domain/models/move.model';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import {
  EndGameEvent,
  OnlineModeErrorEvent,
  OnlineModeEvent,
  UpdateGameInfoEvent,
  UpdateMoveEvent,
} from './online-mode.events';

@Injectable({
  providedIn: 'root',
})
export class OnlineModeService {
  private _gameId: string = '';

  private _player: Player | null = null;
  private _subscription: Subscription | null = null;

  private _stateSubject = new BehaviorSubject<OnlineModeEvent>({ type: '' });
  readonly state$ = this._stateSubject.asObservable();

  constructor(
    @Inject(RealtimeDbRepositoryToken)
    private dbRepository: RealtimeDbRepository
  ) {}

  private _initGame(gameId: string, player: Player): void {
    this._gameId = gameId;
    this._player = player;
    this._stateSubject.next(
      new UpdateGameInfoEvent({ gameId: this._gameId, player: this._player })
    );

    this._subscription = this.dbRepository
      .joinGame(this._gameId)
      .subscribe((move: Move) => {
        if (move === null) {
          return this._stateSubject.next(
            new OnlineModeErrorEvent('Player left the game', true)
          );
        }

        if (move.checkmate) {
          return this._stateSubject.next(new EndGameEvent(move.player));
        }

        this._stateSubject.next(new UpdateMoveEvent(move));
      });
  }

  createGame(): void {
    const id = this.dbRepository.createGame();
    if (!id)
      return this._stateSubject.next(
        new OnlineModeErrorEvent('Failed to create game')
      );

    this._initGame(id, Player.white);
  }

  async joinGame(gameId: string): Promise<void> {
    const gameExists = await this.dbRepository.gameExist(gameId);

    if (!gameExists) {
      return this._stateSubject.next(
        new OnlineModeErrorEvent('Game does not exist!')
      );
    }

    return this._initGame(gameId, Player.black);
  }

  makeMove(move: Move): void {
    this.dbRepository.makeMove(this._gameId!, move);
  }

  endGame(): void {
    if (this._gameId) {
      this.dbRepository.endGame(this._gameId!);
    }
    this._subscription?.unsubscribe();
    this._subscription = null;
    this._gameId = '';
    this._player = null;
    this._stateSubject.next({ type: '' });
  }
}
