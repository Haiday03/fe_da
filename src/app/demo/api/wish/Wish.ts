import { Book } from "../book/Book";

export class Wish {
    // id!: number;
    // dateCreated: string;
    // bookList: Book[];

    id!: number;
    dateCreated: string;
    bookId: number;
    userId: number;
    book: Book;
  }