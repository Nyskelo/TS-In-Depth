import { timeOut } from '../decorators';

export default class ReferenceItem {
    //1 standart
    // title: string;
    // year: number;
    // constructor(newTitle: string, newYear: number) {
    //     console.log('Creating a new ReferenceItem...');
    //     this.title = newTitle;
    //     this.year = newYear;
    // }
    //2 short
    #id: number;
    private _publisher: string;
    static department: string = 'Research Deep';
    get publisher(): string {
        return this._publisher.toUpperCase();
    }
    set publisher(newPublisher: string) {
        this._publisher = newPublisher;
    }

    constructor(id: number, public title: string, protected year: number) {
        console.log('Creating a new ReferenceItem...');
        this.#id = id;
    }
    // @timeOut(2000)
    printItem(): void {
        console.log(`${this.title} was published in ${this.year}`);
        console.log(ReferenceItem.department);
        console.log(Object.getPrototypeOf(this).constructor.department);
    }
    getID(): number {
        return this.#id;
    }
    // abstract printCitation(): void;
} //del abstract

export { ReferenceItem };
