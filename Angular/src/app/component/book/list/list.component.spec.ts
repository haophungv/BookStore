import { Observable, of } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookService } from 'src/app/service/book.service';
import { DetailsComponent } from './../details/details.component';
import { Router } from '@angular/router';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ListComponent } from './list.component';
import { MaterialExampleModule } from 'src/material.module';
import { Book } from 'src/app/interface/book.interface';

import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatCardHarness } from '@angular/material/card/testing';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let bookServiceMock: any;
  let loader: HarnessLoader;

  beforeEach(async () => {
    bookServiceMock = jasmine.createSpyObj('BookService', ['getAll']);
    bookServiceMock.getAll.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'book-details/62bd5050cfe461177057ba07',
            component: DetailsComponent,
          },
        ]),
        HttpClientTestingModule,
        MaterialExampleModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        MatIconModule,
      ],
      providers: [
        HttpClient,
        HttpHandler,
        // BookService,
        // Router,
        {
          provide: BookService,
          useValue: bookServiceMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // bookService = TestBed.inject(BookService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('call NgOnInit', () => {
    let helper: Helper;
    beforeEach(() => {
      helper = new Helper();
    });

    it('should call getAll', () => {
      bookServiceMock.getAll.and.returnValue(helper.getAll(1));
      fixture.detectChanges();
      expect();
    });
  });

  it('should mat card work', async () => {});
});

class Helper {
  products: Book[] = [];
  getAll(amount: number): Observable<Book[]> {
    for (let i = 0; i < amount; i++) {
      this.products.push({
        _id: 'abc' + i,
        title: 'item' + i,
        image: 'abc' + i,
        category: '',
        quantity: 0,
        price: 0,
        description: '',
      });
    }
    return of(this.products);
  }
}
