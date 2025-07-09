import { NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Subscription } from 'rxjs';
import { APP_CONFIG } from 'src/app/main/configs/environment.config';
import { AuthService } from 'src/app/main/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  formValid: boolean;
  private unsubscribe: Subscription[] = [];

  constructor(
    private _fb: FormBuilder,
    private _service: AuthService,
    private _router: Router,
    private _toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      emailAddress: [
        null,
        [Validators.required, Validators.email],
      ],
      password: [null, [Validators.required]],
    });
  }

  get emailAddress() {
    return this.loginForm.get('emailAddress') as FormControl;
  }

  get password() {
    return this.loginForm.get('password') as FormControl;
  }

  onSubmit() {
    this.formValid = true;

    if (this.loginForm.valid) {
      const loginUserSubscribe = this._service
        .loginUser([
          this.loginForm.value.emailAddress,
          this.loginForm.value.password,
        ])
        .subscribe((res: any) => {
          // ✅ SUCCESSFUL LOGIN
          if (res.result === 1 && res.message === 'Login Successfully') {
            this._service.setToken(res.data);
            const tokenPayload = this._service.decodedToken();
            this._service.setCurrentUser(tokenPayload);

            this._toast.success({
              detail: 'SUCCESS',
              summary: res.message,
              duration: APP_CONFIG.toastDuration,
            });

            if (tokenPayload.userType === 'admin') {
              this._router.navigate(['admin/dashboard']);
            } else {
              this._router.navigate(['/home']);
            }
          }

          // ❌ FAILED LOGIN (result == 0)
          else if (res.result === 0) {
            const errorMsg = res.data?.message || res.message || 'Login failed';
            this._toast.error({
              detail: 'ERROR',
              summary: errorMsg,
              duration: APP_CONFIG.toastDuration,
            });
          }

          // ❌ OTHER ERRORS
          else {
            const errorMsg = res.data?.message || res.message || 'Unexpected error';
            this._toast.error({
              detail: 'ERROR',
              summary: errorMsg,
              duration: APP_CONFIG.toastDuration,
            });
          }
        });

      this.unsubscribe.push(loginUserSubscribe);
      this.formValid = false;
    }
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sub) => sub.unsubscribe());
  }
}
