import { NgModule } from '@angular/core';
import { ChessBoardComponent } from './chess-board/chess-board.component';
import { NgxChessBoardModule } from 'ngx-chess-board';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ChessBoardComponent],
  imports: [CommonModule, NgxChessBoardModule],
  exports: [ChessBoardComponent],
})
export class ComponentsModule {}
