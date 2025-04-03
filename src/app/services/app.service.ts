import { Injectable } from "@angular/core";
import { TaskModel, UserModel } from "../models";

@Injectable({
  providedIn: 'root'
})

export class AppService {
  addTask(userId: string, task: TaskModel) {
    const authUser: UserModel = JSON.parse(localStorage.getItem('auth') as any);
    const users: UserModel[] = JSON.parse(localStorage.getItem('users') as any);
    authUser.tasks.push(task);
    users[users.findIndex((u: UserModel) => u.id === userId)] = authUser;

    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('auth', JSON.stringify(authUser));
  }

  removeTask(userId: string, taskId: string) {
    const authUser: UserModel = JSON.parse(localStorage.getItem('auth') as any);
    const users: UserModel[] = JSON.parse(localStorage.getItem('users') as any);
    authUser.tasks = authUser.tasks.filter((t: TaskModel) => t.id !== taskId);
    users[users.findIndex((u: UserModel) => u.id === userId)] = authUser;

    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('auth', JSON.stringify(authUser));
  }

  completeTask(userId: string, task: TaskModel) {
    const authUser: UserModel = JSON.parse(localStorage.getItem('auth') as any);
    const users: UserModel[] = JSON.parse(localStorage.getItem('users') as any);
    authUser.completedTasks.push(task);
    users[users.findIndex((u: UserModel) => u.id === userId)] = authUser;

    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('auth', JSON.stringify(authUser));
  }
}