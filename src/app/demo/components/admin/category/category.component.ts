import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Category } from 'src/app/demo/api/category/Category';
import { PaginationDto } from 'src/app/demo/api/pagination/pagination';
import { SearchCategoryDto } from 'src/app/demo/api/searchDto/search_category_dto';
import { CategoryService } from 'src/app/demo/service/category.service';

@Component({
    templateUrl: './category.component.html',
    providers: [MessageService],
})
export class CategoryComponent implements OnInit {
    // search variable
    searchCategoryDto = new SearchCategoryDto({ code: '', name: '' });

    // phân trang
    pagination = new PaginationDto({ page: 0, size: 10 });

    itemsMenu: MenuItem[];
    home: MenuItem;

    category: Category = {
        id: 0,
        code: '',
        name: '',
        description: '',
        numberOfLoans: 0,
    };
    listCategory: Category[] = [];
    listCategorySelected: Category[] = [];

    // Begin dialog variables
    headerDialogAddOrUpdate = '';
    dialogAddOrUpdate: boolean = false;
    dialogConfirmDeleteOne: boolean = false;
    dialogConfirmDeleteList: boolean = false;
    submitted: boolean = false;
    // End dialog variables
    lg: string = 'vi';

    constructor(
        private categoryService: CategoryService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        if (!localStorage.getItem('lang')) {
            localStorage.setItem('lang', 'vi');
        } else {
            this.lg = localStorage.getItem('lang') || 'vi';
        }
        // Giả sử lg là biến lưu ngôn ngữ hiện tại: 'vi' hoặc 'en'
        this.itemsMenu = [
            {
                label:
                    this.lg === 'vi'
                        ? 'Quản trị hệ thống'
                        : 'System Administration',
            },
            {
                label:
                    this.lg === 'vi'
                        ? 'Quản lý thể loại'
                        : 'Category Management',
            },
        ];

        this.home = { icon: 'pi pi-home' };

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
        if (this.category.id) {
            this.categoryService.put(this.category.id, this.category).subscribe(
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
            this.category.code = this.createId();
            this.categoryService.post(this.category).subscribe(
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

    edit(id) {
        this.headerDialogAddOrUpdate = 'Cập nhật';
        this.dialogAddOrUpdate = true;
        this.refreshObject();
        this.categoryService
            .getOne(id)
            .subscribe((res) => (this.category = res));
    }

    deleteOne(id) {
        this.dialogConfirmDeleteOne = true;
        this.refreshObject();
        this.categoryService
            .getOne(id)
            .subscribe((res) => (this.category = res));
    }

    deleteList() {
        this.dialogConfirmDeleteList = true;
    }

    confirmDeleteOne() {
        this.categoryService.deleteOne(this.category.id).subscribe(
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
        this.categoryService.deleteList(this.listCategorySelected).subscribe(
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
        this.listCategorySelected = [];
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
        this.category = {
            id: 0,
            code: '',
            name: '',
            description: '',
            numberOfLoans: 0,
        };
    }

    search() {
        this.pagination.clear();
        this.fetchPaging();
    }

    refreshSearchFields() {
        this.searchCategoryDto = this.searchCategoryDto.clear();
        this.pagination.clear();

        this.fetchPaging();
    }

    fetchPaging() {
        this.categoryService
            .getPage(this.pagination, this.searchCategoryDto)
            .subscribe((data) => {
                this.listCategory = data['content'];
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
