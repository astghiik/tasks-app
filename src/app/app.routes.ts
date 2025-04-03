import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { MainComponent } from './features/main/main.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './features/main/home/home.component';
import { CompletedTasksComponent } from './features/main/completed-tasks/completed-tasks.component';
import { GuestGuard } from './guards/guest.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [GuestGuard] },
    { 
        path: '',
        component: MainComponent, 
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: HomeComponent,
            },
            {
                path: 'completed',
                component: CompletedTasksComponent,
            }
        ]
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' },
];
