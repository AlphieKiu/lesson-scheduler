import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LessonSchedulerSharedModule } from 'app/shared/shared.module';
import { LessonComponent } from './lesson.component';
import { LessonDetailComponent } from './lesson-detail.component';
import { LessonUpdateComponent } from './lesson-update.component';
import { LessonDeleteDialogComponent } from './lesson-delete-dialog.component';
import { lessonRoute } from './lesson.route';

@NgModule({
  imports: [LessonSchedulerSharedModule, RouterModule.forChild(lessonRoute)],
  declarations: [LessonComponent, LessonDetailComponent, LessonUpdateComponent, LessonDeleteDialogComponent],
  entryComponents: [LessonDeleteDialogComponent]
})
export class LessonSchedulerLessonModule {}
