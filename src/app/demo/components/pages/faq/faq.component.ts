import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
    templateUrl: './faq.component.html',
    styleUrls: ['./faq.component.css'],
})
export class FAQComponent {
    itemsMenu: MenuItem[];
    home: MenuItem;
    lg: string = 'vi';

    ngOnInit(): void {
        if (!localStorage.getItem('lang')) {
            localStorage.setItem('lang', 'vi');
        } else {
            this.lg = localStorage.getItem('lang') || 'vi';
        }
        // Giả sử lg là biến ngôn ngữ 'vi' hoặc 'en'
        this.itemsMenu = [
            { label: this.lg === 'vi' ? 'Danh mục' : 'Category' },
            { label: this.lg === 'vi' ? 'Câu hỏi thường gặp' : 'FAQ' },
        ];

        this.home = { icon: 'pi pi-home' };
    }
}
