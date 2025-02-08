export class SearchCategoryDto {
    code: string;
    name: string;

    constructor(data: Partial<SearchCategoryDto>) {
        Object.assign(this, data);
    }

    clear(){
        return new SearchCategoryDto({ code: "", name: "" });
    }

}