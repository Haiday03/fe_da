import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuccessComponent } from './success.component';
import { SuccessRoutingModule } from './success-routing.module';
import {BadgeModule} from 'primeng/badge';
import {MessageModule} from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import {ButtonModule} from 'primeng/button';
@NgModule({
    imports: [
        CommonModule,
        SuccessRoutingModule,
        MessagesModule,
        MessageModule,
        BadgeModule,
        ButtonModule
    ],
    declarations: [SuccessComponent]
})
export class SuccessModule { }
