export interface IframeEvent {
  type: string;
}
export class SetPlayerEvent implements IframeEvent {
  type = 'SetPlayerEvent';
  constructor(public player: Player) {}
}
export class MoveEvent implements IframeEvent {
  type = 'MoveEvent';
  constructor(public player: Player, public move: Move) {}
}
export class ResetEvent implements IframeEvent {
  type = 'ResetEvent';
}

export enum Player {
  white = 'white',
  black = 'black',
}

export interface Move {
  move: string;
  checkmate: boolean;
  fen: string;
}
