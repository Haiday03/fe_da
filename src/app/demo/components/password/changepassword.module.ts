import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { changepasswordComponent } from './changepassword.component';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ImageModule} from 'primeng/image';
import {DividerModule} from 'primeng/divider';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { changepasswordRoutingModule } from './changepassword-routing.module';
import { ToastModule } from 'primeng/toast';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ChartModule,
        MenuModule,
        TableModule,
        StyleClassModule,
        PanelMenuModule,
        ButtonModule,
        changepasswordRoutingModule,
        ReactiveFormsModule,
        ImageModule,
        DividerModule,
        ConfirmDialogModule,
        ToastModule
    ],
    declarations: [changepasswordComponent]
})
export class changepasswordModule { }
