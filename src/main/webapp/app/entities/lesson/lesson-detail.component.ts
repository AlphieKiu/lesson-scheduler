import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILesson } from 'app/shared/model/lesson.model';

@Component({
  selector: 'jhi-lesson-detail',
  templateUrl: './lesson-detail.component.html'
})
export class LessonDetailComponent implements OnInit {
  lesson: ILesson | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ lesson }) => (this.lesson = lesson));
  }

  previousState(): void {
    window.history.back();
  }
}
