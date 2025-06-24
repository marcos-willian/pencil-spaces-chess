import { Player } from './player.model';

export interface Move {
  player: Player;
  checkmate: boolean;
  fen: string;
}
