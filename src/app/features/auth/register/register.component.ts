import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, NzButtonModule, NzCheckboxModule, NzFormModule, NzInputModule, NzSelectModule, NzTypographyModule, RouterModule],
  templateUrl: './register.component.html',
})

export class RegisterComponent {
  private fb = inject(NonNullableFormBuilder);
  formData = this.fb.group({
    email: this.fb.control('', [Validators.email, Validators.required]),
    password: this.fb.control('', [Validators.required]),
    firstname: this.fb.control('', [Validators.required]),
    lastname: this.fb.control('', [Validators.required]),
  });

  constructor (private authService: AuthService, private router: Router, private message: NzMessageService) {}

  submitForm(): void {
    if (this.formData.valid) {
      const { status, message } = this.authService.register(this.formData.value);
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
