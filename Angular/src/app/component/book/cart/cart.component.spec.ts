import { BookService } from 'src/app/service/book.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart.component';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  class BookServiceStub {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartComponent],
      providers: [
        HttpClient,
        HttpHandler,
        { provide: BookService, useValue: BookServiceStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should call onClickCheckout', async () => {
    spyOn(component, 'onClickCheckout');
    component.onClickCheckout();
    expect(component.onClickCheckout).toHaveBeenCalled();
  });
});
