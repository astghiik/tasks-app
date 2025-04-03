import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from '../models';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private router: Router) {}

  private getStorageUsers(): UserModel[] {
    return localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users') as any) : [];
  }

  register(data: any) {
    const currentUser: UserModel =  { 
      ...data, 
      id: crypto.randomUUID(),
      createdAt: new Date().toLocaleDateString(),
      tasks: [],
      completedTasks: [],
    };

    localStorage.setItem('users', JSON.stringify([...this.getStorageUsers(), currentUser]));
    localStorage.setItem('auth', JSON.stringify(currentUser));
    return { status: 'success', message: 'Register Successful!' }
  }

  login({ email, password }: any): any {
    const existingUser = this.getStorageUsers().find((user: UserModel) => user.email === email && user.password === password);

    if (existingUser) {
      localStorage.setItem('auth', JSON.stringify(existingUser));
      return { status: 'success', message: 'Login Successful!' };
    } else {
      return { status: 'failed', message: 'Wrong Credentials!'}
    }
  }

  logout() {
    localStorage.removeItem('auth');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth');
  }
}
