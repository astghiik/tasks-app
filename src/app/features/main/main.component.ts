import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Store } from '@ngxs/store';
import { AuthService } from '../../services/auth.service';
import { SetAuthData } from '../../store/app.action';

@Component({
  selector: 'app-main',
  imports: [RouterOutlet, NzButtonModule, NzIconModule],
  templateUrl: './main.component.html',
})

export class MainComponent implements OnInit {
  constructor(private authService: AuthService, private store: Store) {}

  ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('auth') as any);
    this.store.dispatch(new SetAuthData(currentUser));
  }

  logout(): void {
    this.authService.logout();
  }
}
