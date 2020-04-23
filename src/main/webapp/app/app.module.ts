import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import './vendor';
import { LessonSchedulerSharedModule } from 'app/shared/shared.module';
import { LessonSchedulerCoreModule } from 'app/core/core.module';
import { LessonSchedulerAppRoutingModule } from './app-routing.module';
import { LessonSchedulerHomeModule } from './home/home.module';
import { LessonSchedulerEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    LessonSchedulerSharedModule,
    LessonSchedulerCoreModule,
    LessonSchedulerHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    LessonSchedulerEntityModule,
    LessonSchedulerAppRoutingModule,
    HttpClientModule
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent]
})
export class LessonSchedulerAppModule {}
