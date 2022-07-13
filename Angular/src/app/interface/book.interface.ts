export interface Book {
  _id: string;
  title: string;
  image: string;
  category: string;
  quantity: number;
  price: number;
  description: string;
}

export interface BookLists {
  books: Book[];
}
