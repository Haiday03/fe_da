import { Book } from "../book/Book";

export class Author {
    public id!: number;
    public code!: string;
    public name!: string;
    public dateOfBirth!: Date | undefined;
    public nationality!: string;
    public address!: string;
    public email!: string;
    public phoneNumber!: string;
    public description!: string;
    public books?: Book[];
  }

  export class AuthorDto {
    public id?: number;
    public code?: string;
    public name?: string;
    public dateOfBirth?: Date | undefined;
    public nationality?: string;
    public address?: string;
    public surname?: string;
    public email?: string;
    public phoneNumber?: string;
    public description?: string;
  }
