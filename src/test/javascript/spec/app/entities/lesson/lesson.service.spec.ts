import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { LessonService } from 'app/entities/lesson/lesson.service';
import { ILesson, Lesson } from 'app/shared/model/lesson.model';

describe('Service Tests', () => {
  describe('Lesson Service', () => {
    let injector: TestBed;
    let service: LessonService;
    let httpMock: HttpTestingController;
    let elemDefault: ILesson;
    let expectedResult: ILesson | ILesson[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(LessonService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Lesson(0, 'AAAAAAA', currentDate, 'AAAAAAA', 'AAAAAAA', false);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            lessonTime: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Lesson', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            lessonTime: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            lessonTime: currentDate
          },
          returnedFromService
        );

        service.create(new Lesson()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Lesson', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            lessonTime: currentDate.format(DATE_TIME_FORMAT),
            lessonType: 'BBBBBB',
            notes: 'BBBBBB',
            approved: true
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            lessonTime: currentDate
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Lesson', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            lessonTime: currentDate.format(DATE_TIME_FORMAT),
            lessonType: 'BBBBBB',
            notes: 'BBBBBB',
            approved: true
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            lessonTime: currentDate
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Lesson', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
