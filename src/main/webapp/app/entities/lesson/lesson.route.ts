import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ILesson, Lesson } from 'app/shared/model/lesson.model';
import { LessonService } from './lesson.service';
import { LessonComponent } from './lesson.component';
import { LessonDetailComponent } from './lesson-detail.component';
import { LessonUpdateComponent } from './lesson-update.component';

@Injectable({ providedIn: 'root' })
export class LessonResolve implements Resolve<ILesson> {
  constructor(private service: LessonService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILesson> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((lesson: HttpResponse<Lesson>) => {
          if (lesson.body) {
            return of(lesson.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Lesson());
  }
}

export const lessonRoute: Routes = [
  {
    path: '',
    component: LessonComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'Lessons'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: LessonDetailComponent,
    resolve: {
      lesson: LessonResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Lessons'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: LessonUpdateComponent,
    resolve: {
      lesson: LessonResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Lessons'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: LessonUpdateComponent,
    resolve: {
      lesson: LessonResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Lessons'
    },
    canActivate: [UserRouteAccessService]
  }
];
