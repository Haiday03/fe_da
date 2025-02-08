import { Book } from "../book/Book";
import { User } from "../user/User";

export class Borrow {
    id!: number;
    createdUser: number;
    borrower?: User;
    createdDate: Date | undefined;
    modifiedDate: Date | undefined;
    bookId?: number;
    book?: Book;
    quantity: number;
    status: number;
    returnDate: Date | undefined;
    userName: string;
    rating: number;
    comment: string;

    constructor(bookId: number, quantity: number, status: number, userName: string){
        this.bookId = (typeof bookId!='undefined' && bookId) ? bookId : undefined;
        this.quantity = (typeof quantity!='undefined' && quantity) ? quantity : 1;
        this.status = (typeof status!='undefined' && status) ? status : 1;
        this.userName = (typeof userName!='undefined' && userName) ? userName : "";
    } 
 }