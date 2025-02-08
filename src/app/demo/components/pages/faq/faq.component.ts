import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
    templateUrl: './faq.component.html',
    styleUrls: ['./faq.component.css']
})
export class FAQComponent {
    itemsMenu: MenuItem[];
    home: MenuItem;

    ngOnInit(): void {

        this.itemsMenu = [
            {label: 'Danh mục'},
            {label: 'Câu hỏi thường gặp'}
        ];

        this.home = {icon: 'pi pi-home'};
    }
 }
