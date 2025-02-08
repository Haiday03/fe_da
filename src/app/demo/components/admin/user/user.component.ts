import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { User } from 'src/app/demo/api/user/User';
import { UserService } from 'src/app/demo/service/user.service';
import { Role } from 'src/app/demo/api/role/Role';
import { SearchUserDto } from 'src/app/demo/api/searchDto/search_user_dto';
import { PaginationDto } from 'src/app/demo/api/pagination/pagination';

@Component({
    templateUrl: './user.component.html',
    providers: [MessageService]
})
export class UserComponent { 
    // search variable
    searchUserDto = new SearchUserDto({ username: "", email: "", phoneNumber: "", roleCode: "" });

    // phân trang
    pagination = new PaginationDto({ page: 0, size: 10});

    roleCodes: Role[];

    itemsMenu: MenuItem[];
    home: MenuItem;

    user: User = {
        id: 0,
        username: '',
        email: '',
        firstname: '',
        lastname: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        university: '',
        about: '',
        facebook: '',
        instagram: '',
        twitter: '',
        phoneNumber: '',
        roleCode: ''
    };
    listUser : User[] = [];
    listUserSelected : User[] = [];

    // Begin dialog variables
    headerDialogAddOrUpdate = "";
    dialogAddOrUpdate: boolean = false;
    dialogConfirmDeleteOne: boolean = false;
    dialogConfirmDeleteList: boolean = false;
    submitted: boolean = false;
    // End dialog variables

    constructor(private userService: UserService, private messageService: MessageService) { }

    ngOnInit(): void {

        this.itemsMenu = [
            {label: 'Quản trị hệ thống'},
            {label: 'Quản lý người dùng'}
        ];

        this.home = {icon: 'pi pi-home'};

        this.roleCodes = [
            { code: 'ADMIN', name: 'Quản trị viên'},
            { code: 'LIBRARIAN', name: 'Thủ thư'},
            { code: 'USER', name: 'Người dùng'},
        ];

        this.fetchPaging();
    }

    openNew(){
        this.headerDialogAddOrUpdate = "Thêm mới";
        this.dialogAddOrUpdate = true;
        this.submitted = false;
        this.refreshObject();
    }

    save(){
        this.submitted = true;
        if(this._checkRequire()){
            if(this.user.id){
                this.userService.update(this.user.id, this.user).subscribe(
                    res=>{
                    this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Cập nhật thành công!', life: 3000 });
                    this.ngOnInit();
                    },
                    error =>{
                        this.messageService.add({ severity: 'error', summary: 'Thất bại', detail: 'Có lỗi xảy ra trong quá trình xử lý!', life: 3000 });
                    }
                )
            } else {
                this.userService.post(this.user).subscribe(
                    res => {
                    this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Thêm mới thành công!', life: 3000 });
                    this.ngOnInit();
                    },
                    error => {
                    this.messageService.add({ severity: 'error', summary: 'Thất bại', detail: 'Có lỗi xảy ra trong quá trình xử lý!', life: 3000 });
                    }
                )
            }
    
            this.dialogAddOrUpdate = false;
        }
    }

    _checkRequire(){
        if(!this.user.username || !this.user.lastname || !this.user.email || !this.user.phoneNumber || !this.user.roleCode){
            return false;
        }
        return true;
    }

    edit(username){
        this.headerDialogAddOrUpdate = "Cập nhật";
        this.dialogAddOrUpdate = true;
        this.refreshObject();
        this.userService.getOne(username).subscribe(
            res => this.user = res
        )
    }

    deleteOne(username){
        this.dialogConfirmDeleteOne = true;
        this.refreshObject();
        this.userService.getOne(username).subscribe(
            res => this.user = res
        )
    }

    deleteList(){
        this.dialogConfirmDeleteList = true;
    }

    confirmDeleteOne(){
        this.userService.deleteOne(this.user.username).subscribe(
            res=>{
                this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Xóa thành công', life: 3000 });
                this.ngOnInit();
            },
            error =>{
                this.messageService.add({ severity: 'error', summary: 'Thất bại', detail: 'Có lỗi xảy ra trong quá trình xử lý', life: 3000 });
            }
        );

        this.refreshObject();
        this.dialogConfirmDeleteOne = false;
    }

    confirmDeleteList(){
        this.userService.deleteList(this.listUserSelected).subscribe(
            res=>{
                this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Xóa thành công', life: 3000 });
                this.ngOnInit();
            },
            error =>{
                this.messageService.add({ severity: 'error', summary: 'Thất bại', detail: 'Có lỗi xảy ra trong quá trình xử lý', life: 3000 });
            }
        );

        this.dialogConfirmDeleteList = false;
        this.listUserSelected = [];
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    refreshObject(){
        this.user = {
            id: 0,
            username: '',
            email: '',
            firstname: '',
            lastname: '',
            address: '',
            city: '',
            state: '',
            zip: '',
            university: '',
            about: '',
            facebook: '',
            instagram: '',
            twitter: '',
            phoneNumber: '',
            roleCode: ''
        }
    }

    _getLabelRole(roleCode){
        var label = "";
        if(roleCode == "ADMIN") 
            label = "Quản trị viên";
        if(roleCode == "LIBRARIAN")
            label = "Thủ thư";
        if(roleCode == "USER")
            label = "Người dùng";

        return label;
    }

    search(){
        this.pagination.clear();
        this.fetchPaging()
    }

    refreshSearchFields(){
        this.searchUserDto = this.searchUserDto.clear();
        this.pagination.clear();

        this.fetchPaging();
    }

    fetchPaging(){
        this.userService.getPage(this.pagination, this.searchUserDto).subscribe(
            data => {
                this.listUser = data["content"];
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
}
