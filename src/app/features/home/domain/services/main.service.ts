import { ElementRef, Injectable, signal } from '@angular/core';
import {
  MoveEvent,
  ResetEvent,
  SetPlayerEvent,
} from '../models/chess-game-events';
import { Player } from '../../../../shared/domain/models/player.model';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  private _white: Window | null = null;
  private _black: Window | null = null;
  private _gameStatusSubject = new BehaviorSubject<string | null>(null);
  gameStatus$ = this._gameStatusSubject.asObservable();

  constructor(private storageService: StorageService) {}

  eventHandler(event: MessageEvent) {
    switch (event.data.type) {
      case MoveEvent.name:
        return this.moveEvent(event.data);
      default:
        break;
    }
  }

  setPlayers(
    white: ElementRef<HTMLIFrameElement>,
    black: ElementRef<HTMLIFrameElement>
  ) {
    this._white = white.nativeElement.contentWindow;
    this._black = black?.nativeElement.contentWindow;
  }

  onWhiteLoaded() {
    this._white?.postMessage(new SetPlayerEvent(Player.white));
    const lastMoveMade = this.storageService.getLastMove();
    if (lastMoveMade) {
      this._white?.postMessage(new MoveEvent(lastMoveMade));
    }
  }

  onBlackLoaded() {
    this._black?.postMessage(new SetPlayerEvent(Player.black));
    const lastMoveMade = this.storageService.getLastMove();
    if (lastMoveMade) {
      this._black?.postMessage(new MoveEvent(lastMoveMade));
    }
  }

  reset() {
    this._black?.postMessage(new ResetEvent());
    this._white?.postMessage(new ResetEvent());
    localStorage.clear();
  }

  moveEvent(moveEvent: any) {
    if (moveEvent.move.checkmate) {
      this._gameStatusSubject.next(moveEvent.move.player);
      return;
    }

    this.storageService.saveMove(moveEvent.move);

    if (moveEvent.move.player === Player.white) {
      this._black?.postMessage(moveEvent);
      return;
    }
    this._white?.postMessage(moveEvent);
  }
}
