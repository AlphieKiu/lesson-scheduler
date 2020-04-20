import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ILesson, Lesson } from 'app/shared/model/lesson.model';
import { LessonService } from './lesson.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-lesson-update',
  templateUrl: './lesson-update.component.html'
})
export class LessonUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];
  min: any;
  max: any;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    lessonTime: [null, [Validators.required]],
    lessonType: [null, [Validators.required]],
    notes: [],
    approved: [],
    lessonToUser: [null, Validators.required]
  });

  constructor(
    protected lessonService: LessonService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.min = moment()
      .startOf('day')
      .format(DATE_TIME_FORMAT);
    this.max = moment()
      .startOf('day')
      .add(1, 'week')
      .format(DATE_TIME_FORMAT);
    this.activatedRoute.data.subscribe(({ lesson }) => {
      if (!lesson.id) {
        const today = moment().startOf('day');
        lesson.lessonTime = today;
      }

      this.updateForm(lesson);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
    });
  }

  updateForm(lesson: ILesson): void {
    this.editForm.patchValue({
      id: lesson.id,
      name: lesson.name,
      lessonTime: lesson.lessonTime ? lesson.lessonTime.format(DATE_TIME_FORMAT) : null,
      lessonType: lesson.lessonType,
      notes: lesson.notes,
      approved: lesson.approved,
      lessonToUser: lesson.lessonToUser
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const lesson = this.createFromForm();
    if (lesson.id !== undefined) {
      this.subscribeToSaveResponse(this.lessonService.update(lesson));
    } else {
      this.subscribeToSaveResponse(this.lessonService.create(lesson));
    }
  }

  private createFromForm(): ILesson {
    return {
      ...new Lesson(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      lessonTime: this.editForm.get(['lessonTime'])!.value ? moment(this.editForm.get(['lessonTime'])!.value, DATE_TIME_FORMAT) : undefined,
      lessonType: this.editForm.get(['lessonType'])!.value,
      notes: this.editForm.get(['notes'])!.value,
      approved: this.editForm.get(['approved'])!.value,
      lessonToUser: this.editForm.get(['lessonToUser'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILesson>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IUser): any {
    return item.id;
  }
}
