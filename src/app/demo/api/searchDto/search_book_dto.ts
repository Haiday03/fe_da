export class SearchBookDto {
    code: string;
    name: string;
    categoryId?: number;
    publisherId?: number;
    publishingYear?: number;
    currentBookId?: number;

    constructor(data: Partial<SearchBookDto>) {
        Object.assign(this, data);
    }

    clear(){
        return new SearchBookDto({ code: "", name: "", categoryId: undefined, publisherId: undefined, publishingYear: undefined, currentBookId: undefined });
    }

}