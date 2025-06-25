import { NgModule } from '@angular/core';
import { ChessBoardComponent } from './chess-board/chess-board.component';
import { NgxChessBoardModule } from 'ngx-chess-board';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { AlertComponent } from './alert/alert.component';
import { AlertService } from './alert/service/alert.service';

@NgModule({
  declarations: [ChessBoardComponent, NotFoundComponent, AlertComponent],
  imports: [CommonModule, NgxChessBoardModule, RouterModule],
  providers: [AlertService],
  exports: [ChessBoardComponent, NotFoundComponent, AlertComponent],
})
export class ComponentsModule {}
