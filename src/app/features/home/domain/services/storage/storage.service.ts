import { Injectable } from '@angular/core';
import { Move } from '../../../../../shared/domain/models/move.model';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly _storageKey = 'game-state';

  constructor() {}

  saveMove(move: Move): void {
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
