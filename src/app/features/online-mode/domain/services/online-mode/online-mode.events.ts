import { Move } from 'src/app/shared/domain/models/move.model';
import { GameInfo } from '../../models/game-info.model';
import { Player } from 'src/app/shared/domain/models/player.model';

export interface OnlineModeEvent {
  readonly type: string;
}

export class OnlineModeErrorEvent implements OnlineModeEvent {
  readonly type = OnlineModeErrorEvent.name;
  constructor(public error: string, public exit: boolean = false) {}
}

export class UpdateGameInfoEvent implements OnlineModeEvent {
  readonly type = UpdateGameInfoEvent.name;
  constructor(public gameInfo: GameInfo) {}
}

export class UpdateMoveEvent implements OnlineModeEvent {
  readonly type = UpdateMoveEvent.name;
  constructor(public move: Move) {}
}

export class EndGameEvent implements OnlineModeEvent {
  readonly type = EndGameEvent.name;
  constructor(public winner: Player) {}
}
