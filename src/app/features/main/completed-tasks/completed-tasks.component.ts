import { Component } from '@angular/core';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TaskModel } from '../../../models';
import { AppState } from '../../../store/app.state';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-completed-tasks',
  imports: [
    NzListModule,
    NzTypographyModule,
    CommonModule, 
    NzIconModule, 
    NzToolTipModule, 
    RouterModule
  ],
  templateUrl: './completed-tasks.component.html',
})

export class CompletedTasksComponent {
  data$: Observable<TaskModel[]>;

  constructor(private store: Store) {
    this.data$ = this.store.select(AppState.getCompletedTasks);
  }
}
