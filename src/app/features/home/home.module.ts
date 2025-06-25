import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './presentation/main-page/main-page.component';
import { IframePageComponent } from './presentation/iframe-page/iframe-page.component';
import { MainService } from './domain/services/main.service';
import { StorageService } from './domain/services/storage.service';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [IframePageComponent, MainPageComponent],
  providers: [MainService, StorageService],
  imports: [CommonModule, ComponentsModule, RouterModule],
})
export class HomeModule {}
