import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router, RouterModule } from '@angular/router'; 
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NzButtonModule, NzFormModule, NzInputModule, NzTypographyModule, RouterModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
    private fb = inject(NonNullableFormBuilder);
    formData = this.fb.group({
      email: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required]),
    });

    constructor(private authService: AuthService, private router: Router, private message: NzMessageService) {}
  
    submitForm(): void {
      if (this.formData.valid) {
        const { status, message } = this.authService.login(this.formData.value);
        if (status === 'success') {
          this.message.create('success', message);
          this.router.navigate(['']);
        } else {
          this.message.create('error', message);
        }
      } else {
        Object.values(this.formData.controls).forEach(control => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        });
      }
    }
}
