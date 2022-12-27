import { Book, BookConstructorInterface, TOptions, LibMgrCallback, Callback } from './interfaces';
import { Category } from './enums';
import { BookUdefined, BookProperties } from './types';
import RefBook from './classes/encyclopedia';

export function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = `Hello from ${name}`;
}
export function getAllBooks(): readonly Book[] {
    const books = <const>[
        {
            id: 1,
            title: 'Refactoring JavaScript',
            author: 'Evan Burchard',
            available: true,
            category: Category.Javascript,
        },
        { id: 2, title: 'JavaScript Testing', author: 'Liang Yuxian Eugene', available: false, category: Category.CSS },
        { id: 3, title: 'CSS Secrets', author: 'Lea Verou', available: true, category: Category.Javascript },
        {
            id: 4,
            title: 'Mastering JavaScript Object-Oriented Programming',
            author: 'Andrea Chiarelli',
            available: true,
            category: Category.Javascript,
        },
    ];
    return books;
}
export function logFirstAvailble(books: readonly Book[] = getAllBooks()): void {
    console.log(`Number of books ${books.length}`);
    // const title = books.find(book => book.available === true).title;
    const title = books.find(({ available }) => available)?.title;

    console.log(`First available book ${title}`);
}

export function getBookTitlesByCategory(inputCategory: Category = Category.Javascript): string[] {
    const books = getAllBooks();
    return books.filter(book => book.category === inputCategory).map(({ title }) => title);
}

export function logBookTitle(titles: Array<string>): void {
    titles.forEach(title => console.log(title));
}

export function getBookAuthorByIndex(index: number): [title: string, author: string] {
    const books = getAllBooks();
    const { title, author } = books[index];
    return [title, author];
}
export function calcTotalPages(): void {
    const data = <const>[
        { lib: 'libName1', books: 1_000_000_000, avgPagesPerBook: 250 },
        { lib: 'libName2', books: 5_000_000_000, avgPagesPerBook: 300 },
        { lib: 'libName3', books: 3_000_000_000, avgPagesPerBook: 280 },
    ];
    const r = data.reduce((acc: bigint, obj) => {
        return acc + BigInt(obj.books) * BigInt(obj.avgPagesPerBook);
    }, 0n);
    console.log(r);
}
export function createCustomerId(name: string, id: number): string {
    return `${id}/${name}`;
}
export function createCustomer(name: string, age?: number, city?: string): void {
    console.log(`Customer name: ${name}`);
    if (age) {
        console.log(`Customer age: ${age}`);
    }
    if (city) {
        console.log(`Customer city: ${city}`);
    }
}
export function getBookByID(id: Book['id']): BookUdefined {
    //  Book['id'] => return number type (interface binding); added return type ... | undefined
    const books = getAllBooks();
    return books.find(book => book.id === id);
}
export function checkoutBooks(customer: string, ...bookIDs: number[]): string[] {
    console.log(`Customer name: ${customer}`);
    return bookIDs
        .map(id => getBookByID(id))
        .filter(book => book.available)
        .map(book => book.title);
}
export function getTitles(author: string): string[];
export function getTitles(available: boolean): string[];
export function getTitles(id: number, available: boolean): string[];
export function getTitles(...args: [string | boolean] | [number, boolean]): string[] {
    const books = getAllBooks();
    if (args.length === 1) {
        const [arg] = args;
        if (typeof arg === 'string') {
            return books.filter(book => book.author === arg).map(book => book.title);
        } else if (typeof arg === 'boolean') {
            return books.filter(book => book.available === arg).map(book => book.title);
        }
    } else if (args.length === 2) {
        const [id, available] = args;
        if (typeof id === 'number' && typeof available === 'boolean')
            return books.filter(book => book.id === id && available).map(book => book.title);
    }
}
export function assertStringValue(data: any): asserts data is string {
    if (typeof data !== 'string') {
        throw new Error('Value should have been a string');
    }
}

export function assertRefBookInstance(condition: any): asserts condition {
    if (!condition) {
        throw new Error('Is not an instance of RefBook ');
    }
}

export function bookTitleTransform(title: any): string {
    assertStringValue(title);
    return [...title].reverse().join('');
}
export function printBook(book: Book): void {
    console.log(`${book.title} by ${book.author}`);
}

export function getProperty(book: Book, prop: BookProperties): any {
    const value = book[prop];
    return typeof value === 'function' ? value.name : value;
}
export function createBook(ctor: BookConstructorInterface, title: string, author: string, pages: number) {
    return new ctor(title, author, pages);
}
export function setDefaultConfig(option: TOptions) {
    option.duration ??= 100;
    option.speed ??= 60;
    return option;
}

export function printRefBook(data: any): void {
    assertRefBookInstance(data instanceof RefBook);
    data.printItem();
}

export function purge<T>(inventory: Array<T>): T[] {
    return inventory.slice(2);
}

export function getObjectProperty<TObject, TKey extends keyof TObject>(obj: TObject, prop: TKey): TObject[TKey] {
    return obj[prop];
    // return typeof value === 'function' ? value.name : value;
}

// export function getBooksByCategory(category: Category, callback: LibMgrCallback): void {
export function getBooksByCategory(category: Category, callback: Callback<string[]>): void {
    setTimeout(() => {
        try {
            const titles = getBookTitlesByCategory(category);
            if (titles.length > 0) {
                callback(null, titles);
            } else {
                throw new Error('No books found');
            }
        } catch (error) {
            callback(error, null);
        }
    }, 2000);
}

export function logCategorySearch(err: Error | null, title: string[] | null): void {
    if (err) {
        console.log(err.message);
    } else {
        console.log(title);
    }
}

export function getBooksByCategoryPromise(category: Category): Promise<string[]> {
    const p: Promise<string[]> = new Promise((resolve, reject) => {
        setTimeout(() => {
            const titles = getBookTitlesByCategory(category);
            if (titles.length > 0) {
                resolve(titles);
            } else {
                reject('No books found');
            }
        }, 2000);
    });
    return p;
}

export async function logSearchResults(category: Category) {
    const titles = await getBooksByCategoryPromise(category);
    console.log(titles.length);

    return titles;
}
