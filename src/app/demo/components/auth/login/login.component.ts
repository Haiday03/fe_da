import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../security/authentication.service';
// import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep p-password input {
            width: 100%;
            padding:1rem;
        }

        :host ::ng-deep .pi-eye{
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }

        :host ::ng-deep .pi-eye-slash{
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent implements OnInit{

     //form parameters
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl!: string;
  error = '';
  lg: string = 'vi';
  dangnhap: string = 'Đăng nhập';
  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'username': [null, [Validators.required]],
      'password': [null, [Validators.required]]
    });
    this.authenticationService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    if (!localStorage.getItem('lang')) {
      localStorage.setItem('lang', 'vi');
    }else {
      this.lg = localStorage.getItem('lang') || 'vi';
      if (this.lg === 'en') {
        this.dangnhap = "Login";
      } else {
        this.dangnhap = "Đăng nhập";
      }
    }
  }
  login() {
    this.submitted = true;
    if (!this.loginForm.valid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
    .subscribe({
      next: () => {
        this.router.navigate(['/pages/list']);
      },
      error: (error) => {
        this.error = error;
        this.loading = false;
      }
    });
  }
  get f() { return this.loginForm.controls; }

  
  switchLanguage(lang: string) {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('lang', lang);
      window.location.reload();
    }
  }
}
