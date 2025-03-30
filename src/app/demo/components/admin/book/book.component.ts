import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Book } from 'src/app/demo/api/book/Book';
import { BookService } from 'src/app/demo/service/book.service';
import { AuthorService } from 'src/app/demo/service/author.service';
import { PublisherService } from 'src/app/demo/service/publisher.service';
import { Author } from 'src/app/demo/api/author/Author';
import { Publisher } from 'src/app/demo/api/publisher/Publisher';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CategoryService } from 'src/app/demo/service/category.service';
import { Category } from 'src/app/demo/api/category/Category';
import { SearchBookDto } from 'src/app/demo/api/searchDto/search_book_dto';
import { PaginationDto } from 'src/app/demo/api/pagination/pagination';

@Component({
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.css'],
    providers: [MessageService],
})
export class BookComponent implements OnInit {
    // search variable
    searchBookDto = new SearchBookDto({
        code: '',
        name: '',
        categoryId: undefined,
        publisherId: undefined,
    });

    // phân trang
    pagination = new PaginationDto({ page: 0, size: 10 });

    inputImage: any;
    fileSelected: File;
    inforSelectedFile = '';
    pathImage: string = '';

    bookDialog: boolean = false;
    headerDialog = '';

    deleteBookDialog: boolean = false;

    dialogConfirmDeleteList: boolean = false;

    books: Book[] = [];

    author: Author;

    categories: Category[];
    categorySelected: Category;

    authors: Author[];
    authorSelected: Author;

    publisher: Publisher;

    publishers: Publisher[];
    publisherSelected: Publisher;

    items: MenuItem[];
    lg: string = 'vi';

    home: MenuItem;

    book: Book = {
        id: 0,
        code: '',
        name: '',
        description: '',
        price: 0,
        quantity: 0,
        image: '',
        rating: 0,
        categoryId: 0,
        publisherId: 0,
        authorId: 0,
        selectedQuantity: 1,
        loaned: 0,
        publishingYear: undefined,
    };

    selectedBooks: Book[] = [];

    submitted: boolean = false;

    constructor(
        private router: Router,
        private bookService: BookService,
        private authorService: AuthorService,
        private publisherService: PublisherService,
        private categoryService: CategoryService,
        private messageService: MessageService,
        private http: HttpClient
    ) {}

    ngOnInit() {
        if (!localStorage.getItem('lang')) {
            localStorage.setItem('lang', 'vi');
        } else {
            this.lg = localStorage.getItem('lang') || 'vi';
        }
        this.fetchPaging();
        this.getAllCategies();
        this.getAllAuthors();
        this.getAllPublishers();

        this.items = [
            {
                label:
                    this.lg === 'vi'
                        ? 'Quản trị hệ thống'
                        : 'System Administration',
            },
            { label: this.lg === 'vi' ? 'Quản lý sách' : 'Book Management' },
        ];

        this.home = { icon: 'pi pi-home' };
    }

    openNew() {
        this.headerDialog = 'Thêm mới';

        this.book = {
            id: 0,
            code: '',
            name: '',
            description: '',
            price: 0,
            quantity: 0,
            image: '',
            rating: 0,
            categoryId: 0,
            publisherId: 0,
            authorId: 0,
            selectedQuantity: 1,
            loaned: 0,
            publishingYear: undefined,
        };
        this.fileSelected = new File([], '');
        this.submitted = false;
        this.bookDialog = true;
    }

    deleteSelectedBooks() {
        this.dialogConfirmDeleteList = true;
    }

    editBook(book: any) {
        this.headerDialog = 'Cập nhật';
        console.log(book);
        this.book = { ...book };
        this.bookDialog = true;
    }

    deleteBook(book: any) {
        this.deleteBookDialog = true;
        this.book = { ...book };
    }

    confirmDeleteSelected() {
        this.dialogConfirmDeleteList = false;
        this.books = this.books.filter(
            (val) => !this.selectedBooks.includes(val)
        );
        this.messageService.add({
            severity: 'success',
            summary: 'Thành công',
            detail: 'Xóa thành công',
            life: 3000,
        });
        this.selectedBooks = [];
    }

    confirmDelete() {
        this.deleteBookDialog = false;
        this.books = this.books.filter((val) => val.id !== this.book.id);
        this.bookService.delete(this.book.id).subscribe(
            (res) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Thành công',
                    detail: 'Xóa thành công',
                    life: 3000,
                });
            },
            (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Thất bại',
                    detail: 'Có lỗi xảy ra trong quá trình xử lý',
                    life: 3000,
                });
            }
        );
        this.book = {
            id: 0,
            code: '',
            name: '',
            description: '',
            price: 0,
            quantity: 0,
            image: '',
            rating: 0,
            categoryId: 0,
            publisherId: 0,
            authorId: 0,
            selectedQuantity: 1,
            loaned: 0,
            publishingYear: undefined,
        };
    }

    hideDialog() {
        this.bookDialog = false;
        this.submitted = false;
    }

    deleteList() {
        this.dialogConfirmDeleteList = true;
    }

    confirmDeleteList() {
        this.bookService.deleteList(this.selectedBooks).subscribe(
            (res) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Thành công',
                    detail: 'Xóa thành công',
                    life: 3000,
                });
                this.ngOnInit();
            },
            (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Thất bại',
                    detail: 'Có lỗi xảy ra trong quá trình xử lý',
                    life: 3000,
                });
            }
        );

        this.dialogConfirmDeleteList = false;
        this.selectedBooks = [];
    }

    async saveBook(): Promise<void> {
        this.submitted = true;

        if (this.book.name?.trim()) {
            this.insertInventory(this.book.quantity);
            if (this.book.id) {
                // @ts-ignore
                this.books[this.findIndexById(this.book.id)] = this.book;
                this.bookService.put(this.book.id, this.book).subscribe(
                    (res) => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Thành công',
                            detail: 'Cập nhật thành công!',
                            life: 3000,
                        });
                        this.ngOnInit();
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
            } else {
                this.book.code = this.createId();
                // await this.uploadImage();
                console.log('Đường dẫn ảnh: ' + this.pathImage);
                this.books.push(this.book);
                this.bookService.post(this.book).subscribe(
                    (res) => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Thành công',
                            detail: 'Thêm mới thành công!',
                            life: 3000,
                        });
                        this.ngOnInit();
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
            }

            this.books = [...this.books];
            this.bookDialog = false;
            this.author = new Author();
            this.publisher = new Publisher();
            this.book = {
                id: 0,
                code: '',
                name: '',
                description: '',
                price: 0,
                quantity: 0,
                image: '',
                rating: 0,
                categoryId: 0,
                publisherId: 0,
                authorId: 0,
                selectedQuantity: 1,
                loaned: 0,
                publishingYear: undefined,
            };
            this.ngOnInit();
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.books.length; i++) {
            if (this.books[i]['code'] === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    changeSource(event) {
        event.target.src = 'assets/demo/images/product/noimage.jpg';
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
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

    listAuthors(event) {
        this.authorService.findAllByName(event.query).subscribe((data) => {
            this.authors = data;
        });
    }

    getAllPublishers() {
        this.publisherService.getAll().subscribe((data) => {
            this.publishers = data;
        });
    }
    listPublishers(event) {
        this.publisherService.findAllByName(event.query).subscribe((data) => {
            this.publishers = data;
        });
    }
    bookDetail(bookId: number) {
        this.router.navigate(['/pages/book-detail', bookId]);
    }

    insertInventory(quantity: number) {
        if (quantity > 25) this.book.inventoryStatus = 'Còn sách';
        else if (quantity > 1) {
            this.book.inventoryStatus = 'Còn ít';
        } else this.book.inventoryStatus = 'Hết sách';
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
            .getPage(this.pagination, this.searchBookDto)
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

    chooseImage(imageInput: any) {
        this.fileSelected = imageInput.files[0];
        this.bookService.upload(this.fileSelected).subscribe(
            (response) => {
                console.log('Data sent successfully:', response.body);
                this.pathImage = response.body;
                // Handle the server response here
                this.book.image = response.body;
            },
            (error) => {
                console.error('Error sending data:', error.status);
                console.log('Response body:', error.body);
            }
        );
    }
    // uploadImage() {
    //     this.bookService.upload(this.fileSelected).subscribe(
    //         response => {
    //             console.log('Data sent successfully:', response.body);
    //             this.pathImage = response.body;
    //             // Handle the server response here
    //             this.book.image = response.body;
    //         },
    //         error => {
    //             console.error('Error sending data:', error.status);
    //             console.log('Response body:', error.body);
    //         }
    //     )
    // }
}
