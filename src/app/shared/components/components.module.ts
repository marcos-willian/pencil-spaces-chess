import { NgModule } from '@angular/core';
import { ChessBoardComponent } from './chess-board/chess-board.component';
import { NgxChessBoardModule } from 'ngx-chess-board';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ChessBoardComponent, NotFoundComponent],
  imports: [CommonModule, NgxChessBoardModule, RouterModule],
  exports: [ChessBoardComponent, NotFoundComponent],
})
export class ComponentsModule {}
