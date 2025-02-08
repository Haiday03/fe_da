export class PaginationDto {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;

    constructor(data: Partial<PaginationDto>) {
        Object.assign(this, data);
    }

    clear(){
        return new PaginationDto({ page: 0, size: 10 });
    }

    changePageSize(size){
        return new PaginationDto({ page: 0, size: size });
    }

}