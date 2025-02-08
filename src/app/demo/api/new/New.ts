import { Author } from "../author/Author";

export class New {
    id!: number;
    code: string;
    title: string;
    authorId: number;
    author?: Author;
    releaseDate: Date | undefined;
    summary: string;
    content: string;
    keyword: string;
    thumnail?: string;

    constructor(){}
 }