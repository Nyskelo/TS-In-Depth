import { BookInterface } from '../interfaces';

class BookNew implements BookInterface {
    constructor(public title: string, public author: string, public pages: number) {}
}

export { BookNew};
