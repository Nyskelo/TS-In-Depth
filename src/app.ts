import { Category } from './enums';
import Logger, { Magazine, A, Book, Author, Librarian, TOptions } from './interfaces';
import { Shelf2, Shelf, UL, RefBook, ReferenceItem, BookNew } from './classes';
import { CreateCustomerFunctionType, UpdatedBook, BookRequiredFields, PersonBook } from './types';
import * as func from './functions';
import { Library } from './classes';

const myID: string = func.createCustomerId('Ann', 10);
// let idGenerator: (name: string, id: number) => string;
let idGenerator: typeof func.createCustomerId; //`:typeof` is a 'func type'
idGenerator = (name: string, id: number) => `${id}/${name}`;
idGenerator = func.createCustomerId;
console.log(idGenerator('Boris', 20));

const myBook: Book = {
    id: 5,
    title: 'Colors, Backgrounds, and Gradients',
    author: 'Eric A. Meyer',
    available: true,
    category: Category.CSS,
    // year: 2015,
    // copies: 3
    pages: 200,
    // markDamaged:(reason:string)=>console.log(`Damaged: ${reason}`)//valid
    markDamaged(reason: string) {
        console.log(`Damaged: ${reason}`);
    }, //valid - ES2015
};
const logDamage: Logger = (reason: string) => console.log(`Damaged: ${reason}`);
logDamage('missing back cover');
const favoriteAuthor: Author = {
    email: 'alla@gmail.com',
    name: 'Alla',
    numBookPublished: 2,
};
const favoriteLibrarian: Librarian = {
    name: 'Boris',
    email: 'boris@gmail.com',
    department: 'Classical Literature',
    assistCustomer: null,
};
const offer: any = {
    book: {
        title: 'Essential TypeScript',
    },
};
const refbook: RefBook = new RefBook(1, 'Learn TypeScript', 2022, 2);
const personBook: PersonBook = {
    name: 'Boris',
    author: 'Boris',
    available: false,
    category: Category.Angular,
    email: 'boris@gmail.com',
    id: 2,
    title: 'Hello',
};
const options: TOptions = { duration: 20 };
const options2 = func.setDefaultConfig(options);
func.showHello('greeting', 'TypeScript');
console.log(func.getAllBooks());
func.logFirstAvailble(func.getAllBooks());
func.logBookTitle(func.getBookTitlesByCategory(Category.Javascript));
console.log(func.getBookAuthorByIndex(0));
console.log(myID);
func.createCustomer('Alla');
func.createCustomer('Alla', 35);
func.createCustomer('Alla', 35, 'Uzhgorod');
console.log(func.getBookTitlesByCategory());
console.log(func.logFirstAvailble());
console.log(func.getBookByID(1));
console.log(func.checkoutBooks('Customer', ...[1, 2, 3, 4]));
console.log(func.getTitles(1, true));
console.log(func.getTitles(true));
console.log(func.getTitles(false));
console.log(func.getTitles('Lea Verou'));
console.log(func.bookTitleTransform('Learn TypeString'));
func.printBook(myBook);
myBook.markDamaged('missing back cover');
console.log(offer.magazine);
console.log(offer.magazine?.getTitle());
console.log(offer.book.getTitle?.());
console.log(offer.book.authors?.[10]);
console.log(offer.book.authors?.[10]?.name);
console.log(func.getProperty(myBook, 'title'));
console.log(func.getProperty(myBook, 'markDamaged'));
console.log(func.getProperty(myBook, 'i')); //or
// console.log(func.getProperty(myBook, 'ii'));//error
const ref = new ReferenceItem(1, 'Learn TypeScript', 2022); //del abstract in classes.ts
console.log(ref);
ref.printItem();
ref.publisher = 'abc';
console.log(ref.publisher);
console.log(ref.getID());
refbook.printItem();
console.log(refbook);
refbook.printCitation();
const b1 = func.createBook(BookNew, 'Title', 'Author', 200);
console.log(b1); //return type BookInterface
const favoriteLibrarianNew: Librarian = new UL.UniversityLibrarian();

const favoriteLibrarianNew1: Librarian & A = new UL.UniversityLibrarian();
favoriteLibrarianNew1.a = 2;

favoriteLibrarianNew.name = 'Alla';
favoriteLibrarianNew.assistCustomer('Boris', 'Learn Typescript');
console.log(options);
console.log(options2);
console.log(Object.is(options, options2));

//Task06.03
func.printRefBook(refbook);
// func.printRefBook(favoriteLibrarian);//error

const flag = true;
if (flag) {
    import('./classes')
        .then(o => {
            const reader = new o.Reader();
            reader.take(func.getAllBooks()[0]);
            console.log(reader);
        })
        .catch(err => console.log(err))
        .finally(() => console.log('Complete!'));
}

let library: Library = {
    id: 2,
    name: 'Alla',
    address: 'str',
};
console.log(library);

//Task 07.01 Generic Functions
const inventory: Book[] = [
    { id: 10, title: 'The C Programming Language', author: '???', available: true, category: Category.Software },
    { id: 11, title: 'Code Complete', author: 'Steve McConnell', available: true, category: Category.Software },
    { id: 12, title: '8-Bit Graphics with Cobol', author: 'A. B.', available: true, category: Category.Software },
    { id: 13, title: 'Cool autoexec.bat Scripts!', author: 'C. D.', available: true, category: Category.Software },
];

// const result = func.purge(inventory);
// console.log(result);
// const result1 = func.purge([1, 2, 3, 4]);
// console.log(result1);

//Task 07.02 Generic Interfaces and Classes
const bookShelf: Shelf<Book> = new Shelf<Book>();
inventory.forEach(book => bookShelf.add(book));
console.log(bookShelf.getFirst().title);

const magazines: Magazine[] = [
    { title: 'Programming Language Monthly', publisher: 'Code Mags' },
    { title: 'Literary Fiction Quarterly', publisher: 'College Press' },
    { title: 'Five Points', publisher: 'GSU' },
];

const magazineSfelf: Shelf<Magazine> = new Shelf<Magazine>();
magazines.forEach(mag => magazineSfelf.add(mag));
console.log(magazineSfelf.getFirst().title);

//Shelf2 type Book
//Shelf2 type Magazine
//Shelf2 type at least Book or Magazine or both
// const somedata = [{id: 13, title: 'Cool autoexec.bat Scripts!', author: 'C. D.', available: true, category: Category.Software }];
// const somedata = [{ title: 'Programming Language Monthly', publisher: 'Code Mags' },];
const somedata = [
    {
        publisher: 'Code Mags',
        id: 13,
        title: 'Cool autoexec.bat Scripts!',
        available: true,
        category: Category.Software,
    },
];
const somedataShelf = new Shelf2();
somedata.forEach(book => somedataShelf.add(book));
console.log(somedataShelf.getFirst().title);

//Task 07.03. Generic Constraints
magazineSfelf.printTitles();
console.log(magazineSfelf.find('Five Points'));
console.log(func.getObjectProperty(magazines[0], 'title'));
console.log(func.getObjectProperty(inventory[0], 'id'));

//Task 07.04. Utility Types
const bookRequiredFields: BookRequiredFields = {
    author: 'Alla',
    available: false,
    category: Category.Angular,
    id: 1,
    markDamaged: null,
    pages: 200,
    title: 'Learn Angular',
};
const updatedBook: UpdatedBook = {
    id: 1,
    pages: 300,
};

let params: Parameters<CreateCustomerFunctionType>;
params = ['Alla', 30, 'Uzhgorod'];
func.createCustomer(...params);

//Task 07.05. Mapped Types, Utility Types, Conditional Types

// Task 08.01. Class Decorators (sealed)
// Task 08.02. Class Decorators that replace constructor functions (logger)
const favoriteLibrarian1 = new UL.UniversityLibrarian();
// favoriteLibrarian1['a'] = 1;
// UL.UniversityLibrarian['a'] = 2;//error
// UL.UniversityLibrarian.prototype['a'] = 3;//error

// console.log(favoriteLibrarian1);
// favoriteLibrarian1.name = 'Alla';
// favoriteLibrarian1['printLibrarian']();

// Task 08.03. Method Decorator (writable)
// favoriteLibrarian1.assistFaculty = null;
// favoriteLibrarian1.teachCommunity = null;

// Task 08.04. Method Decorator (timeout)
refbook.printItem()

// Task 08.05. Parameter Decorator (logParameter)
console.log(favoriteLibrarian1);
favoriteLibrarian1.name = 'Anna';
favoriteLibrarian1.assistCustomer('Alla', 'LearnTypeScript')