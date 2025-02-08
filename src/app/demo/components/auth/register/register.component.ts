import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../security/authentication.service';
import {Message,MessageService} from 'primeng/api';
import { DatePipe } from '@angular/common';


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    providers:[MessageService,DatePipe],
    styles: [`
        :host ::ng-deep .p-password input {
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
export class RegisterComponent implements OnInit {

    registerForm!: FormGroup;
    loading = false;
    submitted = false;
    error = '';

    valCheck: string[] = ['remember'];

    password!: string;

    lg:string = 'vi';
    dangky: string = 'Đăng ký';

    constructor(private datePipe: DatePipe,private messageService: MessageService, public layoutService: LayoutService, private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService) {
}
ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
      confirmpassword: [null, Validators.required],
      dateCreated: Date.now()
    });
    this.authenticationService.logout();
    if (localStorage.getItem('lang')) {
      this.lg = localStorage.getItem('lang') || 'vi';
      if (this.lg === 'en') {
        this.dangky = "Register";
      } else {
        this.dangky = "Đăng ký";
      }
    }
  }

  get f() { return this.registerForm.controls; }
  register() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    this.authenticationService.register(this.registerForm.value)
      .subscribe({
        next: () => {
          this.router.navigate(['/auth/login']);
        },
        error: (error) => {
          this.error = error;
          this.loading = false;
        }
        
            });
      }

      showResponse(event) {
        this.messageService.add({severity:'info', summary:'Succees', detail: 'User Responded', sticky: true});
    }
  }

