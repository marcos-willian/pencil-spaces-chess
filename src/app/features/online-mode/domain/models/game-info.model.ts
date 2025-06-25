import { Player } from 'src/app/shared/domain/models/player.model';

export interface GameInfo {
  gameId: string;
  player: Player;
}
