import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BorrowedHistoryRoutingModule } from './borrowed-history-routing.module';
import { BorrowedHistoryComponent } from './borrowed-history.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { BreadcrumbModule } from "primeng/breadcrumb";
import { CalendarModule } from 'primeng/calendar';

@NgModule({
    imports: [
        CommonModule,
        BorrowedHistoryRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        TableModule,
        FileUploadModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        InputTextareaModule,
        DropdownModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        BreadcrumbModule,
        CalendarModule
    ],
    declarations: [BorrowedHistoryComponent]
})
export class BorrowedHistoryModule { }
