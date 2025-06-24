import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxChessBoardModule } from 'ngx-chess-board';
import { IframePageComponent } from './iframe-page/iframe-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ChessBoardComponent } from './chess-board/chess-board.component';
import { OnlineModeComponent } from './online-mode/online-mode.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    IframePageComponent,
    MainPageComponent,
    ChessBoardComponent,
    OnlineModeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxChessBoardModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
