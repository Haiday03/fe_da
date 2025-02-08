import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { Book } from 'src/app/demo/api/book/Book';
import { CartService } from 'src/app/demo/service/cart.service';
import { Cart } from '../../api/cart/Cart';
import { Table } from 'primeng/table';
import { environment } from 'src/environments/environment';
import { loadStripe } from '@stripe/stripe-js';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { StripeService } from '../../service/stripe/stripe.service';
@Component({
    templateUrl: './cart.component.html',
    providers: [MessageService]
})

export class CartComponent implements OnInit {

    currentUser = {};

    books: Book[];

    flag = true;

    cart: Cart;

    sum: any = 0    ;

    sortOptions: SelectItem[] = [];

    sortOrder: number = 0;

    sortField: string = '';

    userId: string;

    cols: any[] = [];

    selectedBooks: Book[] = [];

    loading = [false, false, false, false]  


    constructor(private router: Router, private messageService: MessageService, private cartService: CartService,private  stripeService: StripeService) { }

    ngOnInit() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser')|| '{}');

        this.cartService.getCart().subscribe(
            res=>{
                this.cart=res;
                this.flag=false;
                this.books=this.cart.bookList;
                this.books.forEach(element => {
                    element.selectedQuantity=1;
                });
            },
        );
        this.sortOptions = [
            { label: 'Price High to Low', value: '!price' },
            { label: 'Price Low to High', value: 'price' }
        ];

        this.cols = [
            { field: 'book', header: 'Book' },
            { field: 'quantity', header: 'Quantity' },
            { field: 'action', header: 'Description' },
        ];
    };



    calculateSum()
    {
        this.sum=0;
        this.books?.forEach(element => {
            this.sum=this.sum+(element.price*element.selectedQuantity);
        });
        return this.sum;
    }

       // We load  Stripe
    stripePromise = loadStripe(environment.stripe);
  
    async pay(): Promise<void> {
      // here we create a payment object
      const payment = {
        name: this.currentUser['username'],
        currency: 'usd',
        // amount on cents *10 => to be on dollar
        amount: this.sum*100,
        quantity: '1',
        cancelUrl: 'https://library-bachelor-frontend.herokuapp.com/#/cart',
        successUrl: 'https://library-bachelor-frontend.herokuapp.com/#/success',
        dateCreated: Date.now(),
        books: this.books
    };
  
      const stripe = await this.stripePromise;

      // this is a normal http calls for a backend api
      this.stripeService
        .post(payment)
        .subscribe((data: any) => {
          // I use stripe to redirect To Checkout page of Stripe platform
          stripe?.redirectToCheckout({
            sessionId: data.id,
          });
    });
   
    

    this.load(3);
}

    load(index) {
        this.loading[index] = true;
        setTimeout(() => this.loading[index] = false, 1000);
    }

    onSortChange(event: any) {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        } else {
            this.sortOrder = 1;
            this.sortField = value;
        }
    }

    onFilter(dv: DataView, event: Event) {
        dv.filter((event.target as HTMLInputElement).value);
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
    
    changeSource(event) {      
        event.target.src = "assets/demo/images/product/noimage.jpg";
    }



    deleteBookFromCart(bookId: number)
    {

        this.cartService.delete(this.cart.id,bookId).subscribe(
            res=>{
                this.ngOnInit();
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Book Deleted', life: 3000 });
            },
            error =>{
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Book cannot be deleted', life: 3000 });
            }
          );

        
    }

    bookDetail(bookId:number){
        this.router.navigate(['/pages/book-detail',bookId]);
      }
      
    redirectToList(): void {
        this.router.navigateByUrl('/pages/list');
    }
}