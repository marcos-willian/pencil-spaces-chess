import { Component, ViewChild } from '@angular/core';
import { NgxChessBoardComponent } from 'ngx-chess-board';

@Component({
  selector: 'app-chess-board',
  templateUrl: './chess-board.component.html',
  styleUrls: ['./chess-board.component.css'],
})
export class ChessBoardComponent {
  @ViewChild('board') board!: NgxChessBoardComponent;

  player: Player = Player.white;

  ngAfterViewInit() {
    if (this.player == Player.black) {
      this.board.reverse();
    }
  }

  onMoveChange(event: any) {
    parent.postMessage({ type: 'chess-move', move: event }, '*');
  }

  onCheckmate() {}
}

enum Player {
  white = 'white',
  black = 'black',
}
