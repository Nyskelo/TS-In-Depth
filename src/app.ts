import { Category } from './enums';
import Logger, { Magazine, A, Book, Author, Librarian, TOptions } from './interfaces';
import { Shelf2, Shelf, UL, RefBook, ReferenceItem, BookNew } from './classes';
import { CreateCustomerFunctionType, UpdatedBook, BookRequiredFields, PersonBook } from './types';
import * as func from './functions';
import { Library } from './classes';

// 02. Types Basics
// Task 02.01. Basic Types
console.log(func.getAllBooks());
func.logFirstAvailble(func.getAllBooks());
func.logBookTitle(func.getBookTitlesByCategory(Category.Javascript));
console.log(func.getBookAuthorByIndex(0));

//Task 03.01. Function Type
// let idGenerator: (name: string, id: number) => string;
const myID: string = func.createCustomerId('Ann', 10);
let idGenerator: typeof func.createCustomerId; //`:typeof` is a 'func type'
idGenerator = (name: string, id: number) => `${id}/${name}`;
idGenerator = func.createCustomerId;
console.log(idGenerator('Boris', 20));
console.log(myID);

//Task 03.02. Optional, Default and Rest Parameters
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
func.createCustomer('Alla');
func.createCustomer('Alla', 35);
func.createCustomer('Alla', 35, 'Uzhgorod');
console.log(func.getBookTitlesByCategory());
console.log(func.logFirstAvailble());
console.log(func.getBookByID(1));
console.log(func.checkoutBooks('Customer', ...[1, 2, 3, 4]));

//Task 03.03. Function Overloading
console.log(func.getTitles(1, true));
console.log(func.getTitles(true));
console.log(func.getTitles(false));
console.log(func.getTitles('Lea Verou'));

//Task 03.04. Assertion Functions
console.log(func.bookTitleTransform('Learn TypeString'));

//04. Interfaces
// Task 04.01. Defining an Interface
func.printBook(myBook);
myBook.markDamaged('missing back cover');

//Task 04.02. Defining an Interface for Function Types
const logDamage: Logger = (reason: string) => console.log(`Damaged: ${reason}`);
logDamage('missing back cover');

//Task 04.03. Extending Interface
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

//Task 04.04. Optional Chaining
const offer: any = {
    book: {
        title: 'Essential TypeScript',
    },
};
console.log(offer.magazine);
console.log(offer.magazine?.getTitle());
console.log(offer.book.getTitle?.());
console.log(offer.book.authors?.[10]);
console.log(offer.book.authors?.[10]?.name);

// Task 04.05. Keyof Operator
console.log(func.getProperty(myBook, 'title'));
console.log(func.getProperty(myBook, 'markDamaged'));
console.log(func.getProperty(myBook, 'i')); //or
// console.log(func.getProperty(myBook, 'ii'));//error

//05. Classes
// Task 05.01. Creating and Using Classes
const ref = new ReferenceItem(1, 'Learn TypeScript', 2022); //del abstract in classes.ts
console.log(ref);
ref.printItem();
ref.publisher = 'abc';
console.log(ref.publisher);
console.log(ref.getID());

//Task 05.02. Extending Classes
const refbook: RefBook = new RefBook(1, 'Learn TypeScript', 2022, 2);
refbook.printItem();
console.log(refbook);

//Task 05.05. Intersection and Union Types
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
console.log(options);
console.log(options2);
console.log(Object.is(options, options2));

// Task 05.03. Creating Abstract Classes
refbook.printCitation();
const b1 = func.createBook(BookNew, 'Title', 'Author', 200);
console.log(b1); //return type BookInterface

// Task 05.04. Interfaces for Class Types
const favoriteLibrarianNew: Librarian = new UL.UniversityLibrarian();
const favoriteLibrarianNew1: Librarian & A = new UL.UniversityLibrarian();
favoriteLibrarianNew1.a = 2;
favoriteLibrarianNew.name = 'Alla';
favoriteLibrarianNew.assistCustomer('Boris', 'Learn Typescript');

// Task 06.03
func.printRefBook(refbook);
// func.printRefBook(favoriteLibrarian);//Error: Is not an instance of RefBook
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

// Task 07.01 Generic Functions
const inventory: Book[] = [
    { id: 10, title: 'The C Programming Language', author: '???', available: true, category: Category.Software },
    { id: 11, title: 'Code Complete', author: 'Steve McConnell', available: true, category: Category.Software },
    { id: 12, title: '8-Bit Graphics with Cobol', author: 'A. B.', available: true, category: Category.Software },
    { id: 13, title: 'Cool autoexec.bat Scripts!', author: 'C. D.', available: true, category: Category.Software },
];
const result = func.purge(inventory);
console.log(result);
const result1 = func.purge([1, 2, 3, 4]);
console.log(result1);

// Task 07.02 Generic Interfaces and Classes
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

// // Shelf2 type Book
const somedata = [
    { id: 13, title: 'Cool autoexec.bat Scripts!', author: 'C. D.', available: true, category: Category.Software },
];
// // Shelf2 type Magazine
const somedata1 = [{ title: 'Programming Language Monthly', publisher: 'Code Mags' }];
// // Shelf2 type at least Book or Magazine or both
const somedata2 = [
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

// Task 07.03. Generic Constraints
magazineSfelf.printTitles();
console.log(magazineSfelf.find('Five Points'));
console.log(func.getObjectProperty(magazines[0], 'title'));
console.log(func.getObjectProperty(inventory[0], 'id'));

// Task 07.04. Utility Types
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

// Task 07.05. Mapped Types, Utility Types, Conditional Types

// Task 08.01. Class Decorators (sealed)
// Task 08.02. Class Decorators that replace constructor functions (logger)
const favoriteLibrarian1 = new UL.UniversityLibrarian();
favoriteLibrarian1['a'] = 1;
UL.UniversityLibrarian['a'] = 2; //error
UL.UniversityLibrarian.prototype['a'] = 3; //error
console.log(favoriteLibrarian1);
favoriteLibrarian1.name = 'Alla';
favoriteLibrarian1['printLibrarian']();

// Task 08.03. Method Decorator (writable)
favoriteLibrarian1.assistFaculty = null;
// favoriteLibrarian1.teachCommunity = null;//TypeError: Cannot assign to read only property

// Task 08.04. Method Decorator (timeout)
refbook.printItem();

// Task 08.05. Parameter Decorator (logParameter)
// Task 08.06. Property Decorator
const favoriteLibrarian2 = new UL.UniversityLibrarian();
console.log(favoriteLibrarian2);
favoriteLibrarian2.name = 'Anna';
favoriteLibrarian2.assistCustomer('Alla', 'LearnTypeScript');

// Task 08.07. Accessor Decorator
const refbook1: RefBook = new RefBook(1, 'Learn TypeScript', 2022, 2);
refbook1.copies = 10;
// refbook1.copies = -10//Error: Invalid value
console.log(refbook1.copies);

// Task 09 Asynchronous Patterns
// Task 09.01 Callback Functions
console.log('Begin');
func.getBooksByCategory(Category.Javascript, func.logCategorySearch);
func.getBooksByCategory(Category.Software, func.logCategorySearch);
console.log('End');

// Task 09.02. Promises
console.log('Begin');
func.getBooksByCategoryPromise(Category.Javascript)
    .then(titles => {
        console.log(titles);
        // return Promise.resolve(titles.length);//or
        return titles.length;
    })
    .then(n => console.log(n))
    .catch(reason => console.log(reason));
func.getBooksByCategoryPromise(Category.Software)
    .then(titles => console.log(titles))
    .catch(reason => console.log(reason));
console.log('End');

// Task 09.03. Async Functions
console.log('Begin');
func.logSearchResults(Category.Javascript);
func.logSearchResults(Category.Software).catch(err => console.log(err));
console.log('End');
