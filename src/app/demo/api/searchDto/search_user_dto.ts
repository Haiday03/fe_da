export class SearchUserDto {
    username: string;
    email: string;
    phoneNumber: string;
    roleCode: string;

    constructor(data: Partial<SearchUserDto>) {
        Object.assign(this, data);
    }

    clear(){
        return new SearchUserDto({ username: "", email: "", phoneNumber: "", roleCode: "" });
    }

}