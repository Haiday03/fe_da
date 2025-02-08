import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Book } from 'src/app/demo/api/book/Book';
import { Borrow } from 'src/app/demo/api/borrow/Borrow';
import { PaginationDto } from 'src/app/demo/api/pagination/pagination';
import { SearchBorrowedHistoryDto } from 'src/app/demo/api/searchDto/search_borrowed_history_dto';
import { User } from 'src/app/demo/api/user-detail/User';
import { BorrowedHistoryService } from 'src/app/demo/service/borrowed-history.service';

@Component({
    templateUrl: './borrowed-history.component.html',
    providers: [MessageService]
})
export class BorrowedHistoryComponent {
    // search variable
    searchBorrowedHistoryDto = new SearchBorrowedHistoryDto({ fromDate: "", toDate: "", status: 0 });

    // phân trang
    pagination = new PaginationDto({ page: 0, size: 10});

    itemsMenu: MenuItem[];
    home: MenuItem;

    listBorrow : Borrow[] = [];
    borrow: Borrow = {
        id: 0,
        createdUser: 0,
        borrower: new User,
        createdDate: undefined,
        modifiedDate: undefined,
        book: new Book,
        quantity: 0,
        status: 0,
        returnDate: undefined,
        userName: '',
        rating: 0,
        comment: ''
    };

    listStatus: Object[];

    dialogReview: boolean = false;

    submitted: boolean = false;

    constructor(private borrowedHistoryService: BorrowedHistoryService, private messageService: MessageService) { }

    ngOnInit(): void {

        this.itemsMenu = [
            {label: 'Danh mục'},
            {label: 'Lịch sử mượn trả'},
        ];

        this.home = {icon: 'pi pi-home'};

        this.listStatus = [
            { code: '1', name: 'Đang mượn'},
            { code: '2', name: 'Đã trả'},
        ];

        this.fetchPaging();

        this.borrow.rating = 0;
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
        this.borrowedHistoryService.getPage(this.pagination, this.searchBorrowedHistoryDto).subscribe(
            data => {
                this.listBorrow = data["content"];
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

    review(borrowSelected: Borrow){
        this.dialogReview = true;
        this.borrow = {...borrowSelected};
        this.borrow.borrower = undefined;
        console.log(this.borrow.id);
    }

    saveReview(){
        this.submitted = true;
        // alert("Đánh giá thành công!")
        // this.dialogReview = false;

        if(this._checkRequire()){
            this.borrowedHistoryService.put(this.borrow.id, this.borrow).subscribe(
                res=>{
                    this.messageService.add({ severity: 'success', summary: 'Thành công!', detail: 'Đánh giá thành công', life: 3000 });
                    this.ngOnInit();
                },
                error=>{
                    this.messageService.add({ severity: 'error', summary: 'Thất bại', detail: 'Có lỗi xảy ra trong quá trình xử lý!', life: 3000 });
                }
            )
    
            this.dialogReview = false;
            this.borrow = {
                id: 0,
                createdUser: 0,
                borrower: new User,
                createdDate: undefined,
                modifiedDate: undefined,
                book: new Book,
                quantity: 0,
                status: 0,
                returnDate: undefined,
                userName: '',
                rating: 0,
                comment: ''
            };
        }
    }

    _checkRequire(){
        if(this.borrow.rating == 0)
            return false;

        return true;
    }
}
