import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { APP_CONFIG } from 'src/app/main/configs/environment.config';
import { AuthService } from 'src/app/main/services/auth.service';
import { HeaderComponent } from '../../header/header.component';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { NgIf } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, ReactiveFormsModule, NgIf],
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  formValid: boolean = false;
  private unsubscribe: Subscription[] = [];

  constructor(
    private _fb: FormBuilder,
    private _service: AuthService,
    private _router: Router,
    private _toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this._fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        phoneNumber: [
          '',
          [Validators.required, Validators.minLength(10), Validators.maxLength(10)],
        ],
        emailAddress: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordCompareValidator }
    );
  }

  passwordCompareValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirm = control.get('confirmPassword')?.value;
    return password === confirm ? null : { notmatched: true };
  }

  get firstName() {
    return this.registerForm.get('firstName') as FormControl;
  }
  get lastName() {
    return this.registerForm.get('lastName') as FormControl;
  }
  get phoneNumber() {
    return this.registerForm.get('phoneNumber') as FormControl;
  }
  get emailAddress() {
    return this.registerForm.get('emailAddress') as FormControl;
  }
  get password() {
    return this.registerForm.get('password') as FormControl;
  }
  get confirmPassword() {
    return this.registerForm.get('confirmPassword') as FormControl;
  }

  onSubmit() {
    this.formValid = true;

    if (this.registerForm.valid) {
      const register = this.registerForm.value;
      register.userType = 'user'; // Set the default userType

      const sub = this._service.registerUser(register).subscribe({
        next: (data: any) => {
          if (data?.result === 1) {
            this._toast.success({
              detail: 'SUCCESS',
              summary: data?.data || 'User added successfully!',
              duration: APP_CONFIG.toastDuration,
            });
            setTimeout(() => this._router.navigate(['admin/user']), 1000);
          } else {
            this._toast.error({
              detail: 'ERROR',
              summary: data?.message || 'Something went wrong.',
              duration: APP_CONFIG.toastDuration,
            });
          }
        },
        error: (err) => {
          this._toast.error({
            detail: 'ERROR',
            summary: err?.message || 'Server error',
            duration: APP_CONFIG.toastDuration,
          });
        },
      });

      this.unsubscribe.push(sub);
      this.formValid = false;
    } else {
      this._toast.error({
        detail: 'ERROR',
        summary: 'Please fill out the form correctly.',
        duration: APP_CONFIG.toastDuration,
      });
    }
  }

  onCancel() {
    this._router.navigateByUrl('admin/user');
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sub) => sub.unsubscribe());
  }
}
