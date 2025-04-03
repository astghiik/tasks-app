import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { TaskModel, UserModel } from '../models';
import { AddTask, CompleteTask, RemoveTask, SetAuthData } from './app.action';
import { AppService } from '../services/app.service';

interface StateModel {
  user: UserModel;
}

@State<StateModel>({
  name: 'main',
  defaults: {
    user: {
      id: '',
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      tasks: [],
      completedTasks: [],
    },
  },
})

@Injectable()
export class AppState {
  constructor(private appService: AppService) {}

  @Selector()
  static getTasks(state: StateModel) {
    return state.user.tasks;
  }

  @Selector()
  static getCompletedTasks(state: StateModel) {
    return state.user.completedTasks;
  }

  @Selector()
  static getAuthData(state: StateModel): UserModel {
    return state.user;
  }
  
  @Action(SetAuthData)
  setAuthData({ patchState }: StateContext<StateModel>, { payload }: SetAuthData) {
    patchState({ user: payload });
  }

  @Action(AddTask)
  addTask({ patchState, getState }: StateContext<StateModel>, { payload }: AddTask) {
    const { user } = getState();
    this.appService.addTask(user.id, payload);
    patchState({ user: { ...user, tasks: [...user.tasks, payload] } });
  }

  @Action(RemoveTask)
  removeTask({ patchState, getState }: StateContext<StateModel>, { id }: RemoveTask) {
    const { user } = getState();
    this.appService.removeTask(user.id, id);
    patchState({ user: { ...user, tasks: user.tasks.filter((task: TaskModel) => task.id !== id) } });
  }

  @Action(CompleteTask)
  completeTask({ patchState, getState, dispatch }: StateContext<StateModel>, { id }: CompleteTask) {
    const { user } = getState();
    const task = user.tasks.find((t: TaskModel) => t.id === id);
    this.appService.completeTask(user.id, task!);
    patchState({ user: { 
      ...user,
      completedTasks: [...user.completedTasks, task!],
    } });
    dispatch(new RemoveTask(id));
  }
}
