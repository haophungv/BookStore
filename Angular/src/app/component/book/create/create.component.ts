import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/service/book.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  form: any = {
    title: null,
    image: null,
    category: null,
    quantity: null,
    price: null,
    description: null,
  };
  isCreateSuccess = false;
  constructor(private bookService: BookService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.bookService.create(this.form).subscribe({
      next: (data) => {
        console.log(data);
        this.isCreateSuccess = true;
      },
      error: (err) => {
        console.log(err);
      },
    });

    // setTimeout(() => {
    //   window.location.reload();
    // }, 1000);
    this.reloadPage();
  }
  reloadPage(): void {
    window.location.reload();
  }
}
