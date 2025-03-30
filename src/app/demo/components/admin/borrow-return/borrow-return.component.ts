import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Borrow } from 'src/app/demo/api/borrow/Borrow';
import { PaginationDto } from 'src/app/demo/api/pagination/pagination';
import { SearchBorrowedHistoryDto } from 'src/app/demo/api/searchDto/search_borrowed_history_dto';
import { BorrowedHistoryService } from 'src/app/demo/service/borrowed-history.service';
import { ExcelApiService } from 'src/app/demo/service/excel-api.service';
import { saveAs } from 'file-saver';
import { BorrowService } from 'src/app/demo/service/borrow.service';

@Component({
    templateUrl: './borrow-return.component.html',
    providers: [MessageService],
})
export class BorrowReturnComponent {
    // search variable
    searchBorrowedHistoryDto = new SearchBorrowedHistoryDto({
        fromDate: '',
        toDate: '',
        status: 0,
    });

    // phân trang
    pagination = new PaginationDto({ page: 0, size: 10 });

    itemsMenu: MenuItem[];
    home: MenuItem;

    listBorrow: Borrow[] = [];
    listBorrowSelected: Borrow[] = [];
    idSelected: 0;

    listStatus: Object[];
    lg: string = 'vi';

    checked: boolean = false;

    stateOptions: any[] = [
        { label: 'Đang mượn', value: '1' },
        { label: 'Đã trả', value: '2' },
    ];

    dialogConfirmReturn: boolean = false;
    dialogConfirmDeleteOne: boolean = false;
    dialogConfirmDeleteList: boolean = false;

    constructor(
        private messageService: MessageService,
        private borrowService: BorrowService,
        private excelApiService: ExcelApiService
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
                    this.lg === 'vi' ? 'Quản trị hệ thống' : 'System Administration',
            },
            {
                label:
                    this.lg === 'vi'
                        ? 'Quản lý mượn/trả sách'
                        : 'Borrow/Return Management',
            },
        ];

        this.listStatus = [
            { code: '1', name: this.lg === 'vi' ? 'Đang mượn' : 'Borrowing' },
            { code: '2', name: this.lg === 'vi' ? 'Đã trả' : 'Returned' },
        ];

        this.home = { icon: 'pi pi-home' };

        this.fetchPaging();
    }

    search() {
        this.pagination.clear();
        this.fetchPaging();
    }

    refreshSearchFields() {
        this.searchBorrowedHistoryDto = this.searchBorrowedHistoryDto.clear();
        this.pagination.clear();

        this.fetchPaging();
    }

    fetchPaging() {
        this.borrowService
            .getBorrowPage(this.pagination, this.searchBorrowedHistoryDto)
            .subscribe((data) => {
                this.listBorrow = data['content'];
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

    deleteOne(id) {
        this.dialogConfirmDeleteOne = true;
        this.idSelected = id;
    }

    confirmDeleteOne() {
        this.borrowService.deleteOne(this.idSelected).subscribe(
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

        this.idSelected = 0;
        this.dialogConfirmDeleteOne = false;
    }

    deleteList() {
        this.dialogConfirmDeleteList = true;
    }

    confirmDeleteList() {
        var listIds: number[] = [];
        this.listBorrowSelected.forEach((item) => {
            listIds.push(item.id);
        });
        this.borrowService.deleteList(listIds).subscribe(
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
                    detail: error,
                    life: 3000,
                });
            }
        );

        this.dialogConfirmDeleteList = false;
        this.listBorrowSelected = [];
    }

    changeStatus(id) {
        this.dialogConfirmReturn = true;
        this.idSelected = id;
    }

    confirmReturn() {
        this.borrowService.updateBorrowStatus(this.idSelected).subscribe(
            (res) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Thành công',
                    detail: 'Xác nhận trả sách thành công!',
                    life: 3000,
                });
                this.ngOnInit();
                this.dialogConfirmReturn = false;
                this.idSelected = 0;
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

    exportExcel() {
        this.borrowService
            .exportToExcel(this.searchBorrowedHistoryDto)
            .subscribe(
                () => {
                    console.log('Excel file exported successfully');
                },
                (error) => {
                    console.error('Error downloading Excel file:', error);
                }
            );
    }
}
