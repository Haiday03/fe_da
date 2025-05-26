import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { PublisherService } from 'src/app/demo/service/publisher.service';
import { Publisher } from 'src/app/demo/api/publisher/Publisher';
import { MenuItem } from 'primeng/api';
import { SearchAuthorDto } from 'src/app/demo/api/searchDto/search_author_dto';
import { PaginationDto } from 'src/app/demo/api/pagination/pagination';
@Component({
    templateUrl: './publisher.component.html',
    providers: [MessageService],
})
export class PublisherComponent implements OnInit {
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

    publisherDialog: boolean = false;
    headerDialog = '';

    deletePublisherDialog: boolean = false;
    dialogConfirmDeleteList: boolean = false;

    publishers: Publisher[] = [];

    publisher: Publisher = {
        id: 0,
        code: '',
        name: '',
        email: '',
        address: '',
        phoneNumber: '',
        linkWebsite: '',
    };

    selectedPublishers: Publisher[] = [];

    submitted: boolean = false;
    lg: string = 'vi';

    constructor(
        private publisherService: PublisherService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        if (!localStorage.getItem('lang')) {
            localStorage.setItem('lang', 'vi');
        } else {
            this.lg = localStorage.getItem('lang') || 'vi';
        }
        this.fetchPaging();

        this.itemsMenu = [
            {
                label:
                    this.lg === 'vi' ? 'Quản trị hệ thống' : 'System Administration',
            },
            {
                label:
                    this.lg === 'vi'
                        ? 'Quản lý nhà xuất bản'
                        : 'Publisher Management',
            },
        ];

        this.home = { icon: 'pi pi-home' };
    }

    openNew() {
        this.headerDialog = 'Thêm mới';
        this.publisher = {
            id: 0,
            code: '',
            name: '',
            email: '',
            address: '',
            phoneNumber: '',
            linkWebsite: '',
        };
        this.submitted = false;
        this.publisherDialog = true;
    }

    editPublisher(publisher: any) {
        this.headerDialog = 'Cập nhật';
        this.publisher = { ...publisher };
        this.publisherDialog = true;
    }

    deletePublisher(publisher: any) {
        this.deletePublisherDialog = true;
        this.publisher = { ...publisher };
    }

    confirmDelete() {
        this.deletePublisherDialog = false;
        this.publishers = this.publishers.filter(
            (val) => val.id !== this.publisher.id
        );
        this.publisherService.delete(this.publisher.id).subscribe(
            (res) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Publisher Deleted',
                    life: 3000,
                });
            },
            (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Publisher cannot be deleted',
                    life: 3000,
                });
            }
        );
        this.publisher = {
            id: 0,
            code: '',
            name: '',
            email: '',
            address: '',
            phoneNumber: '',
            linkWebsite: '',
        };
    }

    deleteList() {
        this.dialogConfirmDeleteList = true;
    }

    confirmDeleteList() {
        this.publisherService.deleteList(this.selectedPublishers).subscribe(
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
        this.selectedPublishers = [];
    }

    hideDialog() {
        this.publisherDialog = false;
        this.submitted = true;
    }

    savePublisher() {
        this.submitted = true;
        if (this.publisher.name?.trim()) {
            if (this.publisher.id) {
                // @ts-ignore
                this.publishers[this.findIndexById(this.publisher.id)] =
                    this.publisher;
                //updating the publisher
                this.publisherService
                    .put(this.publisher.id, this.publisher)
                    .subscribe(
                        (res) => {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Successful',
                                detail: 'Publisher Updated',
                                life: 3000,
                            });
                            this.ngOnInit();
                        },
                        (error) => {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error',
                                detail: 'Publisher cannot be deleted',
                                life: 3000,
                            });
                        }
                    );
            } else {
                this.publisher.code = this.createId();
                this.publishers.push(this.publisher);
                this.publisherService.post(this.publisher).subscribe(
                    (res) => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Publisher created',
                            life: 3000,
                        });
                        this.ngOnInit();
                    },
                    (error) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Publisher cannot be created',
                            life: 3000,
                        });
                    }
                );
            }

            this.publishers = [...this.publishers];
            this.publisherDialog = false;
            this.publisher = {
                id: 0,
                code: '',
                name: '',
                email: '',
                address: '',
                phoneNumber: '',
                linkWebsite: '',
            };
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.publishers.length; i++) {
            if (this.publishers[i]['code'] === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
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

    fetchPaging() {
        this.publisherService
            .getList(this.pagination, this.searchAuthorDto)
            .subscribe((data) => {
                this.publishers = data['content'];
                this.pagination.totalElements = data['totalElements'];
                this.pagination.totalPages = data['totalPages'];
            });
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

    pageChange(event) {
        this.pagination.page = event.first / this.pagination.size;
        this.fetchPaging();
    }

    sizeChange(event) {
        this.pagination = this.pagination.changePageSize(event);
        this.fetchPaging();
    }
}
