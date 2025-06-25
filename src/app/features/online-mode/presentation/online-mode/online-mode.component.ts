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
import { OnlineModeService } from '../../domain/services/online-mode/online-mode.service';
import { Move } from 'src/app/shared/domain/models/move.model';
import { Player } from 'src/app/shared/domain/models/player.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import {
  EndGameEvent,
  OnlineModeErrorEvent,
  OnlineModeEvent,
  UpdateGameInfoEvent,
  UpdateMoveEvent,
} from '../../domain/services/online-mode/online-mode.events';
import { AlertService } from 'src/app/shared/components/alert/service/alert.service';

@Component({
  selector: 'app-online-mode',
  templateUrl: './online-mode.component.html',
})
export class OnlineModeComponent {
  @ViewChild('board') board!: ChessBoardComponent;
  gameId: string | null = null;
  joinCode: string = '';
  subscription: Subscription | null = null;
  constructor(
    private service: OnlineModeService,
    private router: Router,
    private alertService: AlertService
  ) {}

  @HostListener('window:beforeunload', ['$event'])
  handleBeforeUnload(_: BeforeUnloadEvent) {
    this.service.endGame();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.service.endGame();
  }

  ngAfterViewInit() {
    this.subscription = this.service.state$.subscribe((event) => {
      switch (event.type) {
        case UpdateGameInfoEvent.name:
          this.updateGameInfo(event as UpdateGameInfoEvent);
          return;
        case OnlineModeErrorEvent.name:
          this.onError(event as OnlineModeErrorEvent);
          return;
        case UpdateMoveEvent.name:
          this.updateMove((event as UpdateMoveEvent).move);
          return;
        case EndGameEvent.name:
          this.showResult((event as EndGameEvent).winner);
          return;
        default:
          return;
      }
    });
  }

  /// Service event handlers ---------------
  private onError(event: OnlineModeErrorEvent) {
    this.joinCode = '';
    this.alertService.showError(event.error, 'Close', () => {
      this.service.endGame();

      if (event.exit) {
        this.router.navigate(['/']);
      }

      return true;
    });
  }

  private updateGameInfo(event: UpdateGameInfoEvent) {
    this.gameId = event.gameInfo.gameId;
    this.board.initWithPlayer(event.gameInfo.player);
  }

  updateMove(move: Move) {
    if (!move.fen) return;
    this.board.updateMove(move);
  }

  showResult(winner: Player) {
    this.subscription?.unsubscribe();

    this.alertService.showMessage(`Game Over! ${winner} wins!`, 'Close', () => {
      this.service.endGame();
      this.router.navigate(['/']);
      return true;
    });
  }

  /// UI event handlers ---------------
  onMove(move: Move) {
    this.service.makeMove(move);
  }

  exitGame() {
    this.subscription?.unsubscribe();
    this.service.endGame();
    this.router.navigate(['/']);
  }
  createGame() {
    this.service.createGame();
  }

  joinGame() {
    if (!this.joinCode) return;

    this.service.joinGame(this.joinCode);
  }
}
