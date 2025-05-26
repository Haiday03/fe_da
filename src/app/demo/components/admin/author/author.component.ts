import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { AuthorService } from 'src/app/demo/service/author.service';
import { Author } from 'src/app/demo/api/author/Author';
import { MenuItem } from 'primeng/api';
import { SearchAuthorDto } from 'src/app/demo/api/searchDto/search_author_dto';
import { PaginationDto } from 'src/app/demo/api/pagination/pagination';
@Component({
    templateUrl: './author.component.html',
    providers: [MessageService],
})
export class AuthorComponent implements OnInit {
    // search variable
    searchAuthorDto = new SearchAuthorDto({
        searchCode: '',
        searchName: '',
        searchEmail: '',
        searchPhoneNumber: '',
    });

    // phân trang
    pagination = new PaginationDto({ page: 0, size: 10 });

    itemsMenu: MenuItem[];
    home: MenuItem;

    authorDialog: boolean = false;
    headerDialog = '';

    deleteAuthorDialog: boolean = false;
    dialogConfirmDeleteList: boolean = false;

    deleteAuthorsDialog: boolean = false;

    authors: Author[] = [];

    author: Author = {
        id: 0,
        code: '',
        name: '',
        email: '',
        description: '',
        dateOfBirth: undefined,
        nationality: '',
        address: '',
        phoneNumber: '',
    };

    selectedAuthors: Author[] = [];

    submitted: boolean = false;

    rowsPerPageOptions = [5, 10, 20];
    lg: string = 'vi';

    constructor(
        private authorService: AuthorService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        if (!localStorage.getItem('lang')) {
            localStorage.setItem('lang', 'vi');
        } else {
            this.lg = localStorage.getItem('lang') || 'vi';
        }
        this.refreshSearchFields();
        this.fetchPaging();

        this.itemsMenu = [
            {
                label:
                    this.lg === 'vi'
                        ? 'Quản trị hệ thống'
                        : 'System Administration',
            },
            {
                label:
                    this.lg === 'vi' ? 'Quản lý tác giả' : 'Author Management',
            },
        ];

        this.home = { icon: 'pi pi-home' };
    }

    openNew() {
        this.headerDialog = 'Thêm mới';
        this.author = {
            id: 0,
            code: '',
            name: '',
            email: '',
            description: '',
            dateOfBirth: undefined,
            nationality: '',
            address: '',
            phoneNumber: '',
        };
        this.submitted = false;
        this.authorDialog = true;
    }

    editAuthor(author: any) {
        this.headerDialog = 'Cập nhật';
        this.author = { ...author };
        let dateString = this.author.dateOfBirth;
        this.author.dateOfBirth = new Date(dateString!);
        this.authorDialog = true;
    }

    deleteAuthor(author: any) {
        this.deleteAuthorDialog = true;
        this.author = { ...author };
    }

    confirmDelete() {
        this.deleteAuthorDialog = false;
        this.authors = this.authors.filter((val) => val.id !== this.author.id);
        this.authorService.delete(this.author.id).subscribe(
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
        this.author = {
            id: 0,
            code: '',
            name: '',
            email: '',
            description: '',
            dateOfBirth: undefined,
            nationality: '',
            address: '',
            phoneNumber: '',
        };
    }

    deleteList() {
        this.dialogConfirmDeleteList = true;
    }

    confirmDeleteList() {
        this.authorService.deleteList(this.selectedAuthors).subscribe(
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
        this.selectedAuthors = [];
    }

    hideDialog() {
        this.authorDialog = false;
        this.submitted = true;
    }

    saveAuthor() {
        this.submitted = true;
        if (this.author.name?.trim()) {
            if (this.author.id) {
                // @ts-ignore
                this.authors[this.findIndexById(this.author.id)] = this.author;
                //updating the author
                this.authorService.put(this.author.id, this.author).subscribe(
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
                this.author.code = this.createId();
                this.authors.push(this.author);
                this.authorService.post(this.author).subscribe(
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

            this.authors = [...this.authors];
            this.authorDialog = false;
            this.author = {
                id: 0,
                code: '',
                name: '',
                email: '',
                description: '',
                dateOfBirth: undefined,
                nationality: '',
                address: '',
                phoneNumber: '',
            };
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.authors.length; i++) {
            if (this.authors[i]['code'] === id) {
                index = i;
                break;
            }
        }

        return index;
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

    search() {
        this.pagination.clear();
        this.fetchPaging();
    }

    refreshSearchFields() {
        this.searchAuthorDto = this.searchAuthorDto.clear();
        this.pagination.clear();

        this.fetchPaging();
    }

    fetchPaging() {
        this.authorService
            .getList(this.pagination, this.searchAuthorDto)
            .subscribe((data) => {
                this.authors = data['content'];
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
}
