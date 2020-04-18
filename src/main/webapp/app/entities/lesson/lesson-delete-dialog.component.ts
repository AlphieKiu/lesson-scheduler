import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILesson } from 'app/shared/model/lesson.model';
import { LessonService } from './lesson.service';

@Component({
  templateUrl: './lesson-delete-dialog.component.html'
})
export class LessonDeleteDialogComponent {
  lesson?: ILesson;

  constructor(protected lessonService: LessonService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.lessonService.delete(id).subscribe(() => {
      this.eventManager.broadcast('lessonListModification');
      this.activeModal.close();
    });
  }
}
