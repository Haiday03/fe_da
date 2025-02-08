import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SubscriptionComponent } from './subscription.component';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { SubscriptionRoutingModule } from './subscription-routing.module';
import {ImageModule} from 'primeng/image';
import {DividerModule} from 'primeng/divider';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import {ProgressBarModule} from 'primeng/progressbar';
import {CardModule} from 'primeng/card';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ChartModule,
        MenuModule,
        TableModule,
        AvatarModule,
        AvatarGroupModule,
        StyleClassModule,
        PanelMenuModule,
        ButtonModule,
        SubscriptionRoutingModule,
        ImageModule,
        DividerModule,
        ProgressBarModule,
        CardModule
    ],
    declarations: [SubscriptionComponent]
})
export class SubscriptionModule { }
