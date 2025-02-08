import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { LoginComponent } from './demo/components/auth/login/login.component';
import { RegisterComponent } from './demo/components/auth/register/register.component';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './demo/components/security/auth.guard';
import { ApiService } from './demo/service/general/api.service';
import { JwtInterceptor } from './demo/components/security/jwt.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationService } from './demo/components/security/authentication.service';
import { ErrorInterceptor } from './demo/components/security/authentication.interceptor';
import { EditorModule } from '@tinymce/tinymce-angular';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ImageModule } from 'primeng/image';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { MenubarModule } from 'primeng/menubar';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        NotfoundComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        CommonModule,
        BrowserModule,
        ButtonModule,
        CheckboxModule,
        PasswordModule,
        MenubarModule,
        InputTextModule,
        HttpClientModule,
        ReactiveFormsModule,
        VirtualScrollerModule,
        FormsModule,
        AppRoutingModule,
        EditorModule,
        NgxDatatableModule,
        ImageModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        ApiService,
        AuthGuard,
        AuthenticationService,
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    
      ],
      bootstrap: [AppComponent],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
