import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Message,MessageService} from 'primeng/api';
import { CartService } from 'src/app/demo/service/cart.service';

@Component({
    templateUrl: './success.component.html',
    providers: [MessageService]
})
export class SuccessComponent implements OnInit {

    currentUser = {};

    constructor(private router: Router,private messageService: MessageService,
        private cartService: CartService) {}

    ngOnInit() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser')|| '{}');

        this.cartService.setFinished().subscribe(
            res=>{
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Cart is finished', life: 3000 });
            },
            error =>{
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Had error while cart status change', life: 3000 });
            }
          );
    }

    redirectToList(): void {
        this.router.navigateByUrl('/pages/list');
    }
}
