import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './features/home/home.module';
import { ComponentsModule } from './shared/components/components.module';
import { OnlineModeModule } from './features/online-mode/online-mode.module';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    ComponentsModule,
    HomeModule,
    OnlineModeModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
