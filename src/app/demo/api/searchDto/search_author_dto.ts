export class SearchAuthorDto {
    searchCode: string;
    searchName: string;
    searchEmail: string;
    searchPhoneNumber: string;

    constructor(data: Partial<SearchAuthorDto>) {
        Object.assign(this, data);
    }

    clear(){
        return new SearchAuthorDto({ searchCode: "", searchName: "", searchEmail: "", searchPhoneNumber: "" });
    }

}