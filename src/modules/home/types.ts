export namespace IEntity {
  export interface User {
    id: number,
    name: string,
    email: string,
    key: string,
    secret: string
  }

  export interface Isbn {
    isbn: string
  }

  export interface Book {
    author: string,
    cover: string,
    id: number,
    isbn: string,
    pages: number,
    published: number,
    title: string
  }

  export interface UserKey {
    key: string;
  }
}

export namespace IContext {
  export interface BooksContextType {
    bookData: IEntity.Book[],
    setBookData: (books: IEntity.Book[] ) => void;
  }
}