import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WishComponent } from './wish.component';
import { WishRoutingModule } from './wish-routing.module';
import { DataViewModule } from 'primeng/dataview';
import { PickListModule } from 'primeng/picklist';
import { OrderListModule } from 'primeng/orderlist';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import {InputNumberModule} from 'primeng/inputnumber';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {CardModule} from 'primeng/card';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {BadgeModule} from 'primeng/badge';
import { CurrencyReverseModule } from '../../common/pipes/currency-reverse.module';
import { TagModule } from 'primeng/tag';
import { BreadcrumbModule } from "primeng/breadcrumb";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        WishRoutingModule,
        TableModule,
        DataViewModule,
        PickListModule,
        OrderListModule,
        InputTextModule,
        ToolbarModule,
        DropdownModule,
        RatingModule,
        CardModule, 
        ButtonModule,
        ToastModule,
        BadgeModule,
        InputNumberModule,
        MessagesModule,
        MessageModule,
        TagModule,
        BreadcrumbModule,
        CurrencyReverseModule
    ],
    declarations: [WishComponent]
})
export class WishModule { }
