import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root'
  })
export class ShowMessage{
    constructor(private messageService: MessageService) { }

    addSuccess(){
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Cập nhật thành công!', life: 3000 })
    }

    addError(){
        this.messageService.add({ severity: 'error', summary: 'Thất bại', detail: 'Có lỗi xảy ra trong quá trình xử lý', life: 3000 });
    }

    editSuccess(){
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Cập nhật thành công!', life: 3000 });
    }

    editError(){
        this.messageService.add({ severity: 'error', summary: 'Thất bại', detail: 'Có lỗi xảy ra trong quá trình xử lý!', life: 3000 });
    }

    deleteSuccess(){
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Xóa thành công', life: 3000 });
    }

    deleteError(){
        this.messageService.add({ severity: 'error', summary: 'Thất bại', detail: 'Có lỗi xảy ra trong quá trình xử lý', life: 3000 });
    }
}
