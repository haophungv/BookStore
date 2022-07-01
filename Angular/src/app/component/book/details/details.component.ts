import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/service/book.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  bookDetail = {
    _id: '',
    title: '',
    image: '',
    category: '',
    quantity: 0,
    price: 0,
    description: '',
  };
  bookId: string | null = null;
  amount = 0;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('id');
    // console.log('book id' + this.bookId);

    this.bookService.getById(this.bookId).subscribe({
      next: (data) => {
        this.bookDetail = data.data;
        // console.log(this.bookDetail);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  onIncrease(): void {
    this.amount++;
  }
  onDecrease(): void {
    if (this.amount > 0) this.amount--;
  }

  OnAddToCart(): void {
    let books: BookDetailsInterface[];
    let dataOnStorage: string | null = null;
    let isBookExist = false;
    if (localStorage.getItem('books')) {
      dataOnStorage = localStorage.getItem('books');
      books = JSON.parse(dataOnStorage ? dataOnStorage : '');
      books.map((item) => {
        if (item._id === this.bookDetail._id) {
          item.amount = item.amount + this.amount;
        }
        return item;
      });
      isBookExist = books.some((item) => {
        if (item._id === this.bookDetail._id) {
          return true;
        }
        return false;
      });
      if (!isBookExist) {
        books = [
          {
            ...this.bookDetail,
            amount: this.amount,
          },
          ...books,
        ];
      }
    } else {
      books = [
        {
          ...this.bookDetail,
          amount: this.amount,
        },
      ];
    }
    localStorage.setItem('books', JSON.stringify(books));
    console.log(books);
  }
}

interface BookDetailsInterface {
  _id: string;
  title: string;
  image: string;
  category: string;
  quantity: number;
  price: number;
  description: string;
  amount: number;
}
