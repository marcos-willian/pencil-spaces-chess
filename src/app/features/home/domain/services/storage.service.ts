import { Injectable } from '@angular/core';
import { MoveEvent } from './chess-game-events';
import { Move } from '../../../../shared/domain/models/move.model';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private get _storageKey() {
    return 'game-state';
  }

  constructor() {}

  saveMove(move: Move) {
    const value = JSON.stringify(move);
    localStorage.setItem(this._storageKey, value);
  }

  getLastMove(): Move | null {
    const moveStored = localStorage.getItem(this._storageKey);
    if (!moveStored) return null;

    try {
      return JSON.parse(moveStored);
    } catch (_) {
      return null;
    }
  }
}
