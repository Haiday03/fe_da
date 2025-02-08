import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListComponent } from './list.component';
import { ListRoutingModule } from './list-routing.module';
import { DataViewModule } from 'primeng/dataview';
import { PickListModule } from 'primeng/picklist';
import { OrderListModule } from 'primeng/orderlist';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import {ImageModule} from 'primeng/image';
import { BreadcrumbModule } from "primeng/breadcrumb";
import { CalendarModule } from 'primeng/calendar';
import { CurrencyReverseModule } from '../../../common/pipes/currency-reverse.module';
import { InputNumberModule } from 'primeng/inputnumber';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ListRoutingModule,
        DataViewModule,
        PickListModule,
        OrderListModule,
        InputTextModule,
        DropdownModule,
        RatingModule,
        ButtonModule,
        ImageModule,
        BreadcrumbModule,
        CalendarModule,
        CurrencyReverseModule,
        InputNumberModule
    ],
    declarations: [ListComponent]
})
export class ListModule { }