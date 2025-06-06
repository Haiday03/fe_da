import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewRoutingModule } from './review-routing.module';
import { ReviewComponent } from './review.component';
import { FormsModule } from '@angular/forms';
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
import { ToggleButtonModule } from 'primeng/togglebutton';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SelectButtonModule } from 'primeng/selectbutton';

@NgModule({
    imports: [
        CommonModule,
        ReviewRoutingModule,
        FormsModule,
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
        CalendarModule,
        ToggleButtonModule,
        SplitButtonModule,
        SelectButtonModule
    ],
    declarations: [ReviewComponent]
})
export class ReviewModule { }
