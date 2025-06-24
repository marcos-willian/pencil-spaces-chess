import { Move } from '../../../../shared/domain/models/move.model';
import { Player } from '../../../../shared/domain/models/player.model';

export interface ChessGameEvent {
  type: string;
}

export class SetPlayerEvent implements ChessGameEvent {
  type = this.constructor.name;
  constructor(public player: Player) {}
}
export class MoveEvent implements ChessGameEvent {
  type = this.constructor.name;
  constructor(public move: Move) {}
}
export class ResetEvent implements ChessGameEvent {
  type = this.constructor.name;
}
