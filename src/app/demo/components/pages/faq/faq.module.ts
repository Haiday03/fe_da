import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FAQRoutingModule } from './faq-routing.module';
import { FAQComponent } from './faq.component';
import { TabViewModule } from 'primeng/tabview';
import { AccordionModule } from 'primeng/accordion';
import { BreadcrumbModule } from "primeng/breadcrumb";

@NgModule({
    imports: [
        CommonModule,
        FAQRoutingModule,
        TabViewModule,
        AccordionModule,
        BreadcrumbModule
    ],
    declarations: [FAQComponent]
})
export class FAQModule { }
