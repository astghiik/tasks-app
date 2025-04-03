export interface UserModel {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  tasks: TaskModel[];
  completedTasks: TaskModel[];
}

export interface TaskModel {
  text: string;
  id: string;
}