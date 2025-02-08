import { Book } from "../book/Book";
import { User } from "../user-detail/User";

export class ReviewDto {
    id!: number;
    content!: string;
    userId!: string;
    user!: User;
    username!: string;
    reviewedDate!: Date;
    point!: number;
    bookId!:number;
    book!: Book;

    constructor(){}
 }