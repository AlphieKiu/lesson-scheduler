import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';

export interface ILesson {
  id?: number;
  name?: string;
  lessonTime?: Moment;
  lessonType?: string;
  notes?: string;
  approved?: boolean;
  lessonToUser?: IUser;
}

export class Lesson implements ILesson {
  constructor(
    public id?: number,
    public name?: string,
    public lessonTime?: Moment,
    public lessonType?: string,
    public notes?: string,
    public approved?: boolean,
    public lessonToUser?: IUser
  ) {
    this.approved = this.approved || false;
  }
}
