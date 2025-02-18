import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthenticationService } from '../demo/components/security/authentication.service';
import { LayoutService } from "./service/app.layout.service";
@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit {

    items: MenuItem[];
    constructor(public layoutService: LayoutService,private authenticationService: AuthenticationService) { }
    
    lg: string = 'vi';

    ngOnInit() {
        if (localStorage.getItem('lang')) {
            this.lg = localStorage.getItem('lang') || 'vi';
        }
        this.items = [
            {
                icon: "pi pi-heart",
                routerLink: ['/wish']
                
            },
            {
                icon: "pi pi-cog",
                routerLink: ['/settings']
            },
            {
                icon: "pi pi-user",
                routerLink: ['/profile']
            },
        ];
    }

    logout() {
        this.authenticationService.logout();
      }
}
