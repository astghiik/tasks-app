import { TaskModel, UserModel } from '../models';

export class SetAuthData {
  static readonly type = '[Auth] Set auth data';
  constructor(readonly payload: UserModel) {}
}

export class SetTasks {
  static readonly type = '[Tasks] Set tasks action';
  constructor(readonly payload: TaskModel[]) {}
}

export class AddTask {
  static readonly type = '[Tasks] Add';
  constructor(readonly payload: TaskModel) {}
}

export class RemoveTask {
  static readonly type = '[Tasks] Remove';
  constructor(readonly id: string) {}
}

export class CompleteTask {
  static readonly type = '[Tasks] Complete';
  constructor(readonly id: string) {}
}
