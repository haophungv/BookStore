import { BookService } from 'src/app/service/book.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  bookLists = [
    {
      _id: null,
      title: null,
      image: null,
      category: null,
      quantity: null,
      price: null,
      description: null,
    },
  ];
  dataToShow = {
    id: null,
    title: null,
    image: null,
    category: null,
    quantity: null,
    price: null,
    description: null,
  };
  isShowDetails = false;

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.isShowDetails = false;
    this.bookService.getAll().subscribe({
      next: (data) => {
        this.bookLists = data.books;
        console.log(this.bookLists);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  OnClick(itemId: string | null): void {
    this.router.navigateByUrl('/book-details/' + itemId);
  }
}
