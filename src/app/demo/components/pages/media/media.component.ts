import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/demo/service/book.service';
import { Book } from 'src/app/demo/api/book/Book';
import { Router } from '@angular/router';
import { WishService } from 'src/app/demo/service/wish.service';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from '../../security/authentication.service';
import { Role } from 'src/app/demo/api/user-detail/User';

@Component({
    templateUrl: './media.component.html',
    providers: [MessageService]
})
export class MediaComponent implements OnInit {

    books!: Book[];
    admin: boolean=false;

    currentUser = {};
    

    carouselResponsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    constructor(private bookService: BookService,private router: Router,private wishService: WishService,private messageService: MessageService,private auth: AuthenticationService) { }

    ngOnInit() {

        this.currentUser = JSON.parse(localStorage.getItem('currentUser')|| '{}');
       
        this.bookService.getTopBooks().subscribe(res => {
            this.books = res;
          });
    }


    changeSource(event) {      
        event.target.src = "assets/demo/images/product/noimage.jpg";
    }
    addBookToWish(bookId: number){
        this.wishService.post(bookId).subscribe(
            res=>{
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Book is added to wish', life: 3000 });
            },
            error =>{
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Book cannot be added to wish', life: 3000 });
            }     
          )};

    bookDetail(bookId:number){
        this.router.navigate(['/pages/book-detail',bookId]);
      }
}
