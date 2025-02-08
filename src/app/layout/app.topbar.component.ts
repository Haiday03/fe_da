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

    ngOnInit() {
        this.items = [
            // {
            //     icon: "pi pi-shopping-cart",
            //     routerLink: ['/cart']
                
            // },
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
