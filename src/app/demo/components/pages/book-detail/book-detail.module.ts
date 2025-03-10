import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookDetailComponent } from './book-detail.component';
import { BookDetailRoutingModule } from './book-detail-routing.module';
import {ToastModule} from 'primeng/toast';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {RatingModule} from 'primeng/rating';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputTextModule} from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DividerModule} from 'primeng/divider';
import {ImageModule} from 'primeng/image';
import {CarouselModule} from 'primeng/carousel';
import { TooltipModule } from 'primeng/tooltip';
import { TabViewModule } from 'primeng/tabview';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { CurrencyReverseModule } from '../../../common/pipes/currency-reverse.module'
import { PanelModule } from 'primeng/panel';
import { AvatarModule } from 'primeng/avatar';
import { FieldsetModule } from 'primeng/fieldset';
import {TableModule} from 'primeng/table';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        BookDetailRoutingModule,
        ReactiveFormsModule,
        ToastModule,
        CardModule,
        ButtonModule,
        RatingModule,
        InputTextareaModule,
        InputTextModule,
        DividerModule,
        ImageModule,
        CarouselModule,
        TooltipModule,
        TabViewModule,
        InputNumberModule,
        DialogModule,
        CurrencyReverseModule,
        PanelModule,
        AvatarModule,
        FieldsetModule,
        TableModule
    ],
    declarations: [BookDetailComponent]
})
export class BookDetailModule {
 }
