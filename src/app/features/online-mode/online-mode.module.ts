import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlineModeComponent } from './presentation/online-mode/online-mode.component';
import { FormsModule } from '@angular/forms';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { OnlineModeService } from './domain/services/online-mode/online-mode.service';
import { RouterModule } from '@angular/router';
import { RealtimeDbRepositoryToken } from './domain/repositories/realtime-db.repository';
import { RealtimeDbRepositoryImpl } from './data/repositories/realtime-db.repository.impl';

@NgModule({
  declarations: [OnlineModeComponent],
  imports: [
    CommonModule,
    AngularFireDatabaseModule,
    FormsModule,
    ComponentsModule,
    RouterModule,
  ],
  providers: [
    OnlineModeService,
    {
      provide: RealtimeDbRepositoryToken,
      useClass: RealtimeDbRepositoryImpl,
    },
  ],
})
export class OnlineModeModule {}
