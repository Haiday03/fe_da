import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthorDto } from 'src/app/demo/api/author/Author';
import { BookRec } from 'src/app/demo/api/book/BookRec';
import { Borrow } from 'src/app/demo/api/borrow/Borrow';
import { CommentBook } from 'src/app/demo/api/comment/CommentBook';
import { BorrowService } from 'src/app/demo/service/borrow.service';
import { CartService } from 'src/app/demo/service/cart.service';
import { WishService } from 'src/app/demo/service/wish.service';
import { Book } from '../../../api/book/Book';
import { BookService } from '../../../service/book.service';
import { PaginationDto } from 'src/app/demo/api/pagination/pagination';
import { SearchBookDto } from 'src/app/demo/api/searchDto/search_book_dto';
import { PaymentService } from 'src/app/demo/service/payment.service';
import { HttpParams } from '@angular/common/http';
@Component({
    templateUrl: './book-detail.component.html',
    styleUrls: ['./book-detail.component.css'],
    providers: [MessageService],
})
export class BookDetailComponent implements OnInit {
    selectedQuantity = 1;

    dialogConfirmBorrow = false;

    book: Book;
    author: AuthorDto;
    publisher: any;
    submitted = false;

    comments: CommentBook[];

    recommended: BookRec[];

    listReviews: Borrow[] = [];

    books: Book[];

    pagination = new PaginationDto({ page: 0, size: 10 });

    searchBookDto = new SearchBookDto({
        categoryId: undefined,
    });

    responsiveOptions;

    bookId: string = '';
    title: string = '';
    content: string = '';

    currentUser: {};
    userId: string = '';
    username: string = '';
    lg: string = 'vi';

    constructor(
        private cartService: CartService,
        private route: ActivatedRoute,
        private messageService: MessageService,
        private bookService: BookService,
        private router: Router,
        private wishService: WishService,
        private borrowService: BorrowService,
        private paymentService: PaymentService
    ) {}

    ngOnInit(): void {
        if (!localStorage.getItem('lang')) {
            localStorage.setItem('lang', 'vi');
        } else {
            this.lg = localStorage.getItem('lang') || 'vi';
        }
        this.responsiveOptions = [
            {
                breakpoint: '1024px',
                numVisible: 3,
                numScroll: 3,
            },
            {
                breakpoint: '768px',
                numVisible: 2,
                numScroll: 2,
            },
            {
                breakpoint: '560px',
                numVisible: 1,
                numScroll: 1,
            },
        ];

        this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);
        this.username = this.currentUser['username'];

        this.bookId = this.route.snapshot.paramMap.get('id')!;

        this.bookService.getById(this.bookId).subscribe(
            (res) => {
                this.book = res;

                this.searchBookDto = new SearchBookDto({
                    categoryId: this.book?.category?.id,
                    currentBookId: this.book?.id,
                });

                this.fetchPaging();
            },
            (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Thất bại',
                    detail: 'Có lỗi xảy ra trong quá trình xử lý!',
                    life: 3000,
                });
            }
        );

        this.borrowService.getReviewsByBookId(this.bookId).subscribe(
            (res) => {
                this.listReviews = res;
            },
            (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Thất bại',
                    detail: 'Có lỗi xảy ra trong quá trình xử lý!',
                    life: 3000,
                });
            }
        );
        this.route.queryParams.subscribe((params) => {
            const httpParams = new HttpParams({ fromObject: params });
            const vnp_SecureHash = httpParams.get('vnp_ResponseCode') || '';
            const quantity = Number(httpParams.get('vnp_TxnRef')) || 1;
            let borrow = new Borrow(
                Number.parseInt(this.bookId),
                quantity,
                1,
                this.username
            );
            this.paymentService
                .verifyPayment(vnp_SecureHash, httpParams)
                .subscribe((res) => {
                    if (res?.paymentStatus) {
                        this.borrowService.post(borrow).subscribe(
                            (res) => {
                                this.messageService.add({
                                    severity: 'success',
                                    summary: 'Thành công',
                                    detail: 'Đặt mượn sách thành công!',
                                    life: 3000,
                                });
                                this.dialogConfirmBorrow = false;
                            },
                            (error) => {
                                this.messageService.add({
                                    severity: 'error',
                                    summary: 'Thất bại',
                                    detail: error,
                                    life: 3000,
                                });
                                this.dialogConfirmBorrow = false;
                            }
                        );
                    }
                });
        });
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

    changeSource(event) {
        event.target.src = 'assets/demo/images/product/noimage.jpg';
    }

    bookDetail(bookId: number) {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/pages/book-detail', bookId]);
    }

    addBookToWish(bookId: number) {
        this.wishService.post(bookId).subscribe(
            (res) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Thành công',
                    detail: 'Sách đã được thêm vào yêu thích!',
                    life: 3000,
                });
            },
            (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Thất bại',
                    detail: error,
                    life: 3000,
                });
            }
        );
    }

    openConfirmBorrowDialog() {
        this.dialogConfirmBorrow = true;
    }

    confirmBorrow(bookId: number) {
        let borrow = new Borrow(
            bookId,
            this.selectedQuantity,
            1,
            this.username
        );

        if (this.selectedQuantity > this.book.quantity - this.book.loaned) {
            this.messageService.add({
                severity: 'error',
                summary: 'Thất bại',
                detail: 'Số lượng sách bạn đặt mượn vượt quá số lượng hiện có!',
                life: 3000,
            });
        } else {
            let url = window.location.toString().split('?')[0];
            this.paymentService
                .payment(
                    this.selectedQuantity * this.book.price,
                    url,
                    this.selectedQuantity
                )
                .subscribe((res) => {
                    window.location.href = res?.url;
                });
        }
    }

    fetchPaging() {
        this.bookService
            .getList(this.pagination, this.searchBookDto)
            .subscribe((data) => {
                this.books = data['content'];
            });
    }
}
