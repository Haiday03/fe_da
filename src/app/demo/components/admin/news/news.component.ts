import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Author } from 'src/app/demo/api/author/Author';
import { New } from 'src/app/demo/api/new/New';
import { PaginationDto } from 'src/app/demo/api/pagination/pagination';
import { SearchNewDto } from 'src/app/demo/api/searchDto/search_new_dto';
import { AuthorService } from 'src/app/demo/service/author.service';
import { BookService } from 'src/app/demo/service/book.service';
import { NewService } from 'src/app/demo/service/new.service';

@Component({
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.css'],
    providers: [MessageService],
})
export class NewsComponent {
    // search variable
    searchNewsDto = new SearchNewDto({
        keyword: '',
        authorId: undefined,
        fromDate: '',
        toDate: '',
    });

    // phân trang
    pagination = new PaginationDto({ page: 0, size: 10 });

    fileSelected: File;
    pathImage: string = '';

    itemsMenu: MenuItem[];
    home: MenuItem;

    new: New = {
        id: 0,
        code: '',
        title: '',
        releaseDate: undefined,
        summary: '',
        content: '',
        keyword: '',
        thumnail: '',
        authorId: 0,
    };

    authors: Author[];

    listNews: New[] = [];
    listNewsSelected: New[] = [];

    // Begin dialog variables
    headerDialogAddOrUpdate = '';
    dialogAddOrUpdate: boolean = false;
    dialogConfirmDeleteOne: boolean = false;
    dialogConfirmDeleteList: boolean = false;
    submitted: boolean = false;
    // End dialog variables
    lg: string = 'vi';

    constructor(
        private newService: NewService,
        private authorService: AuthorService,
        private messageService: MessageService,
        private bookService: BookService
    ) {}

    ngOnInit(): void {
        if (!localStorage.getItem('lang')) {
            localStorage.setItem('lang', 'vi');
        } else {
            this.lg = localStorage.getItem('lang') || 'vi';
        }
        this.itemsMenu = [
            {
                label:
                    this.lg === 'vi'
                        ? 'Quản trị hệ thống'
                        : 'System Administration',
            },
            {
                label:
                    this.lg === 'vi' ? 'Quản lý bài viết' : 'Post Management',
            },
        ];

        this.home = { icon: 'pi pi-home' };

        this.getAllAuthor();

        this.fetchPaging();
    }

    getAllAuthor() {
        this.authorService.getAll().subscribe((data) => {
            this.authors = data;
        });
    }

    search() {
        this.pagination.clear();
        this.fetchPaging();
    }

    refreshSearchFields() {
        this.searchNewsDto = this.searchNewsDto.clear();
        this.pagination.clear();

        this.fetchPaging();
    }

    fetchPaging() {
        this.newService
            .getPage(this.pagination, this.searchNewsDto)
            .subscribe((data) => {
                this.listNews = data['content'];
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

    openNew() {
        this.headerDialogAddOrUpdate = 'Thêm mới';
        this.dialogAddOrUpdate = true;
        this.submitted = false;
        this.refreshObject();
    }

    save() {
        this.submitted = true;
        if (this._checkRequire()) {
            if (this.new.id) {
                this.newService.put(this.new.id, this.new).subscribe(
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
                this.new.code = this.createId();
                this.newService.post(this.new).subscribe(
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

            this.dialogAddOrUpdate = false;
        }
    }

    _checkRequire() {
        if (
            !this.new.title ||
            !this.new.author ||
            !this.new.releaseDate ||
            !this.new.keyword ||
            !this.new.summary ||
            !this.new.content
        ) {
            return false;
        }
        return true;
    }

    edit(id) {
        this.headerDialogAddOrUpdate = 'Cập nhật';
        this.dialogAddOrUpdate = true;
        this.refreshObject();
        this.newService.getOne(id).subscribe((res) => {
            this.new = res;
            let dateString = this.new.releaseDate;
            this.new.releaseDate = new Date(dateString!);
        });
    }

    deleteOne(id) {
        this.dialogConfirmDeleteOne = true;
        this.refreshObject();
        this.newService.getOne(id).subscribe((res) => (this.new = res));
    }

    deleteList() {
        this.dialogConfirmDeleteList = true;
    }

    confirmDeleteOne() {
        this.newService.deleteOne(this.new.id).subscribe(
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

        this.refreshObject();
        this.dialogConfirmDeleteOne = false;
    }

    confirmDeleteList() {
        this.newService.deleteList(this.listNewsSelected).subscribe(
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
        this.listNewsSelected = [];
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    refreshObject() {
        this.new = {
            id: 0,
            code: '',
            title: '',
            releaseDate: undefined,
            summary: '',
            content: '',
            keyword: '',
            thumnail: '',
            authorId: 0,
        };
    }

    chooseImage(imageInput: any) {
        this.fileSelected = imageInput.files[0];
        this.bookService.upload(this.fileSelected).subscribe(
            (response) => {
                console.log('Data sent successfully:', response.body);
                this.pathImage = response.body;
                // Handle the server response here
                this.new.thumnail = response.body;
            },
            (error) => {
                console.error('Error sending data:', error.status);
                console.log('Response body:', error.body);
            }
        );
    }
}
