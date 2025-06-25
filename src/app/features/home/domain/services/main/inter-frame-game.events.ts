import { Move } from '../../../../../shared/domain/models/move.model';
import { Player } from '../../../../../shared/domain/models/player.model';

export interface InterFrameGameEvent {
  type: string;
}

export class SetPlayerEvent implements InterFrameGameEvent {
  type = this.constructor.name;
  constructor(public player: Player) {}
}
export class MoveEvent implements InterFrameGameEvent {
  type = this.constructor.name;
  constructor(public move: Move) {}
}
export class ResetEvent implements InterFrameGameEvent {
  type = this.constructor.name;
}
