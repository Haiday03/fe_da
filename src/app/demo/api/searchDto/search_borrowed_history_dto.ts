export class SearchBorrowedHistoryDto {
    fromDate: string;
    toDate: string;
    status: number;

    constructor(data: Partial<SearchBorrowedHistoryDto>) {
        Object.assign(this, data);
    }

    clear(){
        return new SearchBorrowedHistoryDto({ fromDate: "", toDate: "", status: 0 });
    }

}