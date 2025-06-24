import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OnlineModeComponent } from './features/online-mode/presentation/online-mode/online-mode.component';
import { FormsModule } from '@angular/forms';
import { HomeModule } from './features/home/home.module';
import { ComponentsModule } from './shared/components/components.module';

@NgModule({
  declarations: [AppComponent, OnlineModeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FormsModule,
    ComponentsModule,
    HomeModule,
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
