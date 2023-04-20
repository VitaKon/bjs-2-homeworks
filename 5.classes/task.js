class PrintEditionItem {
    name;
    releaseDate;
    pagesCount;
    _state = 100;
    type = null;

    constructor(name, releaseDate, pagesCount) {
        this.name = name;
        this.releaseDate = releaseDate;
        this.pagesCount = pagesCount;
    }

    get state() {
        return this._state;
    }

    set state(value) {
        value = +value;
        if (isNaN(value)) {
            return;
        }
        if (value <= 0) {
            this._state = 0;
        } else if (value >= 100) {
            this._state = 100;
        } else {
            this._state = value;
        }
    }

    fix() {
        this.state = this.state * 1.5;
    }
}

class Magazine extends PrintEditionItem {
    type = 'magazine';
}

class Book extends PrintEditionItem {
    author;
    constructor(author, name, releaseDate, pagesCount) {
        super(name, releaseDate, pagesCount);
        this.author = author;
        this.type = 'book';
    }
}

class NovelBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
        super(author, name, releaseDate, pagesCount);
        this.type = 'novel';
    }
}

class FantasticBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
        super(author, name, releaseDate, pagesCount);
        this.type = 'fantastic';
    }
}

class DetectiveBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
        super(author, name, releaseDate, pagesCount);
        this.type = 'detective';
    }
}

class Library {
    name;
    books = [];
    constructor(name, books) {
        this.name = name;
        if (isArray(books) && books.length > 0) {
            if (books.every((book) => book instanceof PrintEditionItem)) {
                this.books.push(...books);
            }
        }
    }

    addBook(book) {
        if (book instanceof PrintEditionItem) {
            if (book.state > 30) {
                this.books.push(book);
            }
        }
        return this;
    }

    findBookBy(type, value) {
        if (!isString(type) || type.length === 0) {
            return null;
        }
        const result = this.books.find((book) => book[type] === value);
        if (result === undefined) {
            return null;
        }
        return result;
    }

    giveBookByName(bookName) {
        const index = this.books.findIndex((book) => book.name === bookName);
        if (index === -1) {
            return null;
        }
        const book = this.books[index];
        this.books.splice(index, 1);
        return book;
    }
}

class Student {
    name;
    gender;
    age;
    marks = {};

    constructor(name, gender, age) {
        this.name = name;
        this.gender = gender;
        this.age = age;
    }

    setSubject = function (subjectName) {
        if (!isString(subjectName) || subjectName === '') {
            return;
        }
        if (!this.marks[subjectName]) {
            this.marks[subjectName] = [];
        }
    };

    addMark = function (mark, subjectName) {
        if (
            isString(subjectName) &&
            !!subjectName &&
            'marks' in this &&
            !isNaN(+mark) && mark >= 2 && mark <= 5
        ) {
            if (!this.marks[subjectName]) {
                this.setSubject(subjectName);
            }
            this.marks[subjectName].push(mark);
        }
    };

    getAverageBySubject(subjectName) {
        if (
            !isString(subjectName) ||
            !subjectName ||
            !'marks' in this ||
            !this.marks[subjectName] ||
            this.marks[subjectName].length === 0
        ) {
            return 0;
        }
        const arr = this.marks[subjectName];
        return arr.reduce(
            (previousValue, currentValue) => {
                return previousValue + currentValue;
            }
            , 0) / arr.length;
    }

    getAverage() {
        if (!'marks' in this) {
            return 0;
        }
        const keys = Object.keys(this.marks);
        if (keys.length === 0) {
            return 0;
        }
        return keys.reduce(
            (previousAverage, key) => {
                return previousAverage + this.getAverageBySubject(key);
            }
            , 0,
        ) / keys.length;
    }

    exclude = function (reason) {
        if (isString(reason) && reason.length > 0) {
            delete this.marks;
            this.excluded = reason;
        }
    };
}

function isString(obj) {
    return obj instanceof String || typeof obj === 'string';
}

function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
};
