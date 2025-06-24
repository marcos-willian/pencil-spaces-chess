import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './features/home/presentation/main-page/main-page.component';
import { OnlineModeComponent } from './online-mode/online-mode.component';
import { IframePageComponent } from './features/home/presentation/iframe-page/iframe-page.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

const routes: Routes = [
  { path: 'mainpage', component: MainPageComponent },
  {
    path: 'iframepage',
    component: IframePageComponent,
  },
  { path: 'onlinemode', component: OnlineModeComponent },

  { path: '', redirectTo: '/mainpage', pathMatch: 'full' }, // default route
  { path: '**', component: NotFoundComponent }, // wildcard route for 404 not found
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
