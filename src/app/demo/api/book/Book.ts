import { Author } from "../author/Author";
import { Category } from "../category/Category";
import { CommentBook } from "../comment/CommentBook";
import { Publisher } from "../publisher/Publisher";

  export class Book {
    id!: number;
    code: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    inventoryStatus?: string;
    image: string;
    rating: number;
    categoryId: number;
    publisherId: number;
    authorId: number;
    category?: Category;
    publisher?: Publisher;
    author?: Author;
    selectedQuantity: number;
    comments?: CommentBook[];
    loaned: number;
    publishingYear?: number;

    constructor(){} 
 }




  
