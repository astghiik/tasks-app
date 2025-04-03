import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngxs/store';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { AddTask } from '../../store/app.action';

@Component({
  selector: 'app-toolbar',
  imports: [NzButtonModule, NzModalModule, FormsModule, NzInputModule, NzIconModule, NzSelectModule],
  templateUrl: './toolbar.component.html',
})

export class ToolbarComponent {
  newTask = '';
  creationModalShow = false;
  filters = {
    search: '',
    sort: 'asc'
  }
  @Output() filter: EventEmitter<any> = new EventEmitter();

  constructor(private store: Store) {}

  addTask(): void {
    if (this.newTask.trim()) {
      this.store.dispatch(new AddTask({ text: this.newTask, id: crypto.randomUUID() }))
        .subscribe(() => {
          this.newTask = '';
        });
    }
  }

  sort(v: any): void {
    this.filters.sort = v;
    this.filter.emit(this.filters);
  }

  search(): void {
    this.filter.emit(this.filters);
  }
}
