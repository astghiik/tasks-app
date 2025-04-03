import { Component } from '@angular/core';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { Store } from '@ngxs/store';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from '../../../components/toolbar/toolbar.component';
import { TaskModel } from '../../../models';
import { AppState } from '../../../store/app.state';
import { CompleteTask, RemoveTask } from '../../../store/app.action';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    NzListModule, 
    NzTypographyModule, 
    ToolbarComponent, 
    CommonModule, 
    NzIconModule, 
    NzToolTipModule, 
    RouterModule
  ],
  templateUrl: './home.component.html',
})

export class HomeComponent {
  tasks: TaskModel[] = [];
  filteredTasks: TaskModel[] = []

  constructor(private store: Store) {
    this.store.select(AppState.getTasks).subscribe((data: TaskModel[]) => {
      this.tasks = data;
      this.filteredTasks = data;
    })
  }

  removeTask(id: string) {
    this.store.dispatch(new RemoveTask(id));
  }

  completeTask(id: string) {
    this.store.dispatch(new CompleteTask(id));
  }

  filter(filters: any) {
    this.filteredTasks = this.tasks.filter((item: any) => item.text.includes(filters.search));
    if (filters.sort === 'desc') this.filteredTasks.sort((a, b) => a.text > b.text ? -1 : a.text < b.text ? 1 : 0)
    else this.filteredTasks.sort((a, b) => a.text < b.text ? -1 : a.text > b.text ? 1 : 0)
  }
}
