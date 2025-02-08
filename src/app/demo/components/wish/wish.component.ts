import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService, SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { Book } from 'src/app/demo/api/book/Book';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { Wish } from '../../api/wish/Wish';
import { WishService } from '../../service/wish.service';
@Component({
    templateUrl: './wish.component.html',
    providers: [MessageService]
})

export class WishComponent implements OnInit {

    currentUser = {};

    books: Book[] = [];

    wishes: Wish[];

    sum: any = 0    ;

    sortOptions: SelectItem[] = [];

    sortOrder: number = 0;

    sortField: string = '';

    userId: string;

    cols: any[] = [];

    selectedBooks: Book[] = [];

    itemsMenu: MenuItem[];
    home: MenuItem;

    constructor(private router: Router, private messageService: MessageService, private wishService: WishService) { }

    ngOnInit() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser')|| '{}');

        this.itemsMenu = [
            {label: 'Danh mục'},
            {label: 'Sách yêu thích'}
        ];

        this.home = {icon: 'pi pi-home'};

        this.wishService.getWish().subscribe(
            res=>{
                this.wishes=res;
                // this.books=this.wish.bookList;
                this.wishes.forEach(element => {
                    this.books.push(element.book);
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



    deleteBookFromWish(wishId: number)
    {
        this.wishService.delete(wishId).subscribe(
            res=>{
                this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Xóa thành công', life: 3000 });
                this.ngOnInit();
            },
            error =>{
                this.messageService.add({ severity: 'error', summary: 'Thất bại', detail: 'Có lỗi xảy ra trong quá trình xử lý', life: 3000 });
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