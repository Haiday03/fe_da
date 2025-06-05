import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService, SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { Book } from 'src/app/demo/api/book/Book';
import { BookService } from 'src/app/demo/service/book.service';
import { CartService } from 'src/app/demo/service/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WishService } from 'src/app/demo/service/wish.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Author } from 'src/app/demo/api/author/Author';
import { Category } from 'src/app/demo/api/category/Category';
import { Publisher } from 'src/app/demo/api/publisher/Publisher';
import { AuthorService } from 'src/app/demo/service/author.service';
import { PublisherService } from 'src/app/demo/service/publisher.service';
import { CategoryService } from 'src/app/demo/service/category.service';
import { SearchBookDto } from 'src/app/demo/api/searchDto/search_book_dto';
import { PaginationDto } from 'src/app/demo/api/pagination/pagination';
import { PaymentService } from 'src/app/demo/service/payment.service';
@Component({
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css'],
    providers: [MessageService],
})
export class ListComponent implements OnInit {
    // search variable
    searchBookDto = new SearchBookDto({
        code: '',
        name: '',
        categoryId: undefined,
        publisherId: undefined,
    });

    // phân trang
    pagination = new PaginationDto({ page: 0, size: 10 });

    currentUser = {};

    books: Book[];

    sortOptions: SelectItem[];

    sortOrder: number = 0;

    sortField: string = '';

    itemsMenu: MenuItem[];
    home: MenuItem;

    author: Author;

    categories: Category[];
    categorySelected: Category;

    authors: Author[];
    authorSelected: Author;

    publisher: Publisher;

    publishers: Publisher[];
    publisherSelected: Publisher;
    lg: string = 'vi';

    constructor(
        private wishService: WishService,
        private router: Router,
        private bookService: BookService,
        private cartService: CartService,
        private messageService: MessageService,
        private http: HttpClient,
        private authorService: AuthorService,
        private publisherService: PublisherService,
        private categoryService: CategoryService,
        private route: ActivatedRoute,
        private paymentService: PaymentService
    ) {}

    ngOnInit() {
        if (!localStorage.getItem('lang')) {
            localStorage.setItem('lang', 'vi');
        } else {
            this.lg = localStorage.getItem('lang') || 'vi';
        }
        // this.refreshSearchFields();
        this.getAllCategies();
        this.getAllAuthors();
        this.getAllPublishers();

        this.currentUser = JSON.parse(
            localStorage.getItem('currentUser') || '{}'
        );

        this.itemsMenu = [
            {
                label: this.lg === 'vi' ? 'Danh mục' : 'Categories',
            },
            {
                label: this.lg === 'vi' ? 'Tra cứu sách' : 'Book Lookup',
            },
        ];

        this.home = { icon: 'pi pi-home' };

        this.fetchPaging();

        this.sortOptions = [
            {
                label:
                    this.lg === 'vi'
                        ? 'Giá từ xuống thấp'
                        : 'Price High to Low',
                value: '!price',
            },
            {
                label:
                    this.lg === 'vi'
                        ? 'Giá từ thấp lên cao'
                        : 'Price Low to High',
                value: 'price',
            },
        ];


    }

    search() {
        this.pagination.clear();
        this.fetchPaging();
    }

    refreshSearchFields() {
        this.searchBookDto = this.searchBookDto.clear();
        this.pagination.clear();

        this.fetchPaging();
    }

    fetchPaging() {
        this.bookService
            .getList(this.pagination, this.searchBookDto)
            .subscribe((data) => {
                this.books = data['content'];
                this.pagination.totalElements = data['totalElements'];
                this.pagination.totalPages = data['totalPages'];
            });
    }

    pageChange(event) {
        this.pagination.page = event.first / this.pagination.size;
        this.fetchPaging();
    }

    sizeChange(event) {
        this.pagination = this.pagination.changePageSize(event);
        this.fetchPaging();
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

    changeSource(event) {
        event.target.src = 'assets/demo/images/product/noimage.jpg';
    }

    addBookToCart(bookId: number) {
        this.cartService.post(bookId).subscribe(
            (res) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Book is added to cart',
                    life: 3000,
                });
            },
            (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Book cannot be added to cart',
                    life: 3000,
                });
            }
        );
    }

    addBookToWish(bookId: number) {
        this.wishService.post(bookId).subscribe(
            (res) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Book is added to wish',
                    life: 3000,
                });
            },
            (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Book cannot be added to wish',
                    life: 3000,
                });
            }
        );
    }

    bookDetail(bookId: number) {
        this.router.navigate(['/pages/book-detail', bookId]);
    }

    getAllCategies() {
        this.categoryService.getAll().subscribe((data) => {
            this.categories = data;
        });
    }

    getAllAuthors() {
        this.authorService.getAll().subscribe((data) => {
            this.authors = data;
        });
    }

    getAllPublishers() {
        this.publisherService.getAll().subscribe((data) => {
            this.publishers = data;
        });
    }

    // refreshSearchFields(){
    //     this.searchName = "";
    //     this.searchCategory = "";
    //     this.searchPublisher = "";
    //     this.searchYearOfPublication = "";

    //     const params = new HttpParams()
    //         .set("code", "")
    //         .set("name", this.searchName ? this.searchName : "");

    //     this.http.get<any>("http://localhost:9091/api/book", {params: params}).subscribe(data => this.books = data);
    // }
}
