import { Category } from './enums';

interface Book {
    id: number;
    title: string;
    author: string;
    available: boolean;
    category: Category;
    pages?: number;
    // markDamaged?:(reason:string)=>void//property
    // markDamaged?(reason: string): void; //method
    markDamaged?: DamageLogger; //TASK04.02
}

export default interface DamageLogger {
    (reason: string): void;
}
interface Person {
    name: string;
    email: string;
}
interface Author extends Person {
    numBookPublished: number;
}

interface Librarian extends Person {
    department: string;
    assistCustomer: (custName: string, bookTitle: string) => void;
}
interface BookInterface {
    title: string;
    author: string;
    pages: number;
}
interface BookConstructorInterface {
    new (title: string, author: string, pages: number): BookInterface;
} //type constructor extention for class type interface

interface TOptions {
    duration?: number;
    speed?: number;
}
interface A {
    a: number; //exist
}

interface Magazine {
    title: string;
    publisher: string;
}

interface ShelfItem {
    title: string;
}

interface LibMgrCallback{
    (err: Error | null, titles: string[] | null): void;

}
interface Callback<T>{
    (err: Error | null, dat: T | null): void;

}

export {
    LibMgrCallback,
    Callback,
    Magazine,
    ShelfItem,
    A,
    Book,
    DamageLogger,
    Person,
    Author,
    Librarian,
    BookInterface,
    BookConstructorInterface,
    TOptions,
};
