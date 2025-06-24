import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { IframePageComponent } from './iframe-page/iframe-page.component';
import { OnlineModeComponent } from './online-mode/online-mode.component';

const routes: Routes = [
  { path: 'mainpage', component: MainPageComponent },
  { path: 'iframepage', component: IframePageComponent },
  { path: 'onlinemode', component: OnlineModeComponent },
  { path: '', redirectTo: '/mainpage', pathMatch: 'full' }, // default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
