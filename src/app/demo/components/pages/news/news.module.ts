import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './news.component';
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
import { TabViewModule } from 'primeng/tabview';
import { DialogModule } from 'primeng/dialog';

@NgModule({
    imports: [
        CommonModule,
        NewsRoutingModule,
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
        TabViewModule,
        DialogModule
    ],
    declarations: [NewsComponent]
})
export class NewsModule { }
