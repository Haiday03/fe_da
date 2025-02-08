import { Cart } from "../cart/Cart";

export class User {
    public id!: number;
    public username!: string;
    public email!: string;
    public firstname!: string;
    public lastname!: string;
    public address!: string;
    public city!: string;
    public state!: string;
    public zip!: string;
    public university!: string;
    public about!: string;
    public facebook!: string;
    public instagram!: string;
    public twitter!: string;
    public cart!: Cart;
    public role!: Role;
    public phoneNumber!: string;
    public roleCode!: string;
    
    constructor() { }
  }

  export enum Role {
    user = 'ROLE_USER',
    admin = 'ROLE_ADMIN'
}