import {
  Component,
  DestroyRef,
  HostListener,
  inject,
  ViewChild,
} from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Database, ref, set, onValue } from '@angular/fire/database';
import { NgxChessBoardComponent } from 'ngx-chess-board';
import { ChessBoardComponent } from 'src/app/shared/components/chess-board/chess-board.component';
import { OnlineModeService } from '../../domain/services/online-mode.service';
import { Move } from 'src/app/shared/domain/models/move.model';
import { Player } from 'src/app/shared/domain/models/player.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-online-mode',
  templateUrl: './online-mode.component.html',
  styleUrls: ['./online-mode.component.css'],
})
export class OnlineModeComponent {
  @ViewChild('board') board!: ChessBoardComponent;
  gameId: string | null = null;
  joinCode: string = '';
  subscription?: Subscription;
  constructor(private service: OnlineModeService, private router: Router) {}

  @HostListener('window:beforeunload', ['$event'])
  handleBeforeUnload(event: BeforeUnloadEvent) {
    this.service.endGame();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.service.endGame();
  }

  createGame() {
    this.subscription = this.service
      .createGame()
      .subscribe((data: Move) => this.opponentMoveMade(data));
    this.gameId = this.service.gameId;

    this.board.initWithPlayer(this.service.player ?? Player.white);
  }

  joinGame() {
    if (!this.joinCode) return;
    this.subscription = this.service
      .joinGame(this.joinCode)
      .subscribe((data: Move) => this.opponentMoveMade(data));
    this.gameId = this.service.gameId;
    this.board.initWithPlayer(this.service.player ?? Player.black);
  }

  opponentMoveMade(move: Move) {
    if (!move.fen) return;
    if (move.checkmate) {
      this.showResult(move);
    }
    this.board.updateMove(move);
  }

  onMove(move: Move) {
    this.service.makeMove(move);
    if (move.checkmate) {
      this.showResult(move);
    }
  }

  showResult(move: Move) {
    window.alert(`Game Over! ${move.player} wins!`);
    this.service.endGame();
    this.router.navigate(['/']);
  }
}
