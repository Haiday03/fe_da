import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
    constructor() {}
    lg: string = 'vi';

    ngOnInit(): void {
        if (!localStorage.getItem('lang')) {
            localStorage.setItem('lang', 'vi');
        } else {
            this.lg = localStorage.getItem('lang') || 'vi';
        }
    }
}
