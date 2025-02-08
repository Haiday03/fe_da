export class SearchNewDto {
    keyword: string;
    authorId?: number;
    fromDate: string;
    toDate: string;

    constructor(data: Partial<SearchNewDto>) {
        Object.assign(this, data);
    }

    clear(){
        return new SearchNewDto({ keyword: "", authorId: undefined, fromDate: "", toDate: "" });
    }

}