import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Borrow } from 'src/app/demo/api/borrow/Borrow';
import { Category } from 'src/app/demo/api/category/Category';
import { PaginationDto } from 'src/app/demo/api/pagination/pagination';
import { SearchBorrowedHistoryDto } from 'src/app/demo/api/searchDto/search_borrowed_history_dto';
import { BorrowService } from 'src/app/demo/service/borrow.service';
import { BorrowedHistoryService } from 'src/app/demo/service/borrowed-history.service';
import { CategoryService } from 'src/app/demo/service/category.service';

@Component({
    templateUrl: './review.component.html',
    providers: [MessageService]
})
export class ReviewComponent { 
    // search variable
    searchBorrowedHistoryDto = new SearchBorrowedHistoryDto({ fromDate: "", toDate: "", status: 0 });

    // phân trang
    pagination = new PaginationDto({ page: 0, size: 10});

    itemsMenu: MenuItem[];
    home: MenuItem;
    
    listReviews : Borrow[] = [];
    listReviewsSelected: Borrow[] = [];
    idSelected: 0;

    listStatus: Object[];

    checked: boolean = false;

    stateOptions: any[] = [
        { label: 'Đang mượn', value: '1' },
        { label: 'Đã trả', value: '2' }
    ];

    dialogConfirmReturn: boolean = false;
    dialogConfirmDeleteOne: boolean = false;
    dialogConfirmDeleteList: boolean = false;

    constructor(private messageService: MessageService, private borrowService: BorrowService) { }

    ngOnInit(): void {

        this.itemsMenu = [
            {label: 'Quản trị hệ thống'},
            {label: 'Quản lý đánh giá sách'}
        ];

        this.home = {icon: 'pi pi-home'};

        this.listStatus = [
            { code: '1', name: 'Đang mượn'},
            { code: '2', name: 'Đã trả'},
        ];

        this.fetchPaging();
    }

    search(){
        this.pagination.clear();
        this.fetchPaging()
    }

    refreshSearchFields(){
        this.searchBorrowedHistoryDto = this.searchBorrowedHistoryDto.clear();
        this.pagination.clear();

        this.fetchPaging();
    }
    
    fetchPaging(){
        this.borrowService.getReviewPage(this.pagination, this.searchBorrowedHistoryDto).subscribe(
            data => {
                this.listReviews = data["content"];
                this.pagination.totalElements = data["totalElements"]
                this.pagination.totalPages = data["totalPages"]
            }
        )
    }

    pageChange(event) {
        this.pagination.page = event.first/this.pagination.size;
        this.fetchPaging();
    }

    sizeChange(event){
        this.pagination = this.pagination.changePageSize(event);
        this.fetchPaging();
    }

    deleteOne(id){
        this.dialogConfirmDeleteOne = true;
        this.idSelected = id;
    }

    confirmDeleteOne(){
        this.borrowService.deleteReviewById(this.idSelected).subscribe(
            res=>{
                this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Xóa thành công', life: 3000 });
                this.ngOnInit();
            },
            error =>{
                this.messageService.add({ severity: 'error', summary: 'Thất bại', detail: 'Có lỗi xảy ra trong quá trình xử lý', life: 3000 });
            }
        );

        this.idSelected = 0;
        this.dialogConfirmDeleteOne = false;
    }

    deleteList(){
        this.dialogConfirmDeleteList = true;
    }

    confirmDeleteList(){
        var listIds: number[] = [];
        this.listReviewsSelected.forEach(item =>{
            listIds.push(item.id);
        })
        this.borrowService.deleteListReviews(listIds).subscribe(
            res=>{
                this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Xóa thành công', life: 3000 });
                this.ngOnInit();
            },
            error =>{
                this.messageService.add({ severity: 'error', summary: 'Thất bại', detail: 'Có lỗi xảy ra trong quá trình xử lý', life: 3000 });
            }
        );

        this.dialogConfirmDeleteList = false;
        this.listReviewsSelected = [];
    }

    changeStatus(id){
        this.dialogConfirmReturn = true;
        this.idSelected = id;
    }

    confirmReturn(){
        this.borrowService.updateBorrowStatus(this.idSelected).subscribe(
            res=>{
                this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Xác nhận trả sách thành công!', life: 3000 });
                this.ngOnInit();
                this.dialogConfirmReturn = false;
                this.idSelected = 0;
            },
            error =>{
                this.messageService.add({ severity: 'error', summary: 'Thất bại', detail: 'Có lỗi xảy ra trong quá trình xử lý!', life: 3000 });
            }
        )
    }

    exportExcel() {
        this.borrowService.exportReviewExcel(this.searchBorrowedHistoryDto).subscribe(
            () => {
                console.log('Excel file exported successfully');
            },
            (error) => {
                console.error('Error downloading Excel file:', error);
            }
        );
    }
}
