import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { BookCreateInput, BookService, CartCreateInput } from './book.service';
import { defer } from 'rxjs';

describe('BookService', () => {
  let bookService: BookService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      // providers: [HttpClient, HttpHandler],
    });
    bookService = TestBed.inject(BookService);
  });

  it('should be created', () => {
    expect(bookService).toBeTruthy();
  });
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    bookService = new BookService(httpClientSpy);
  });

  it('should return expected list books', (done: DoneFn) => {
    const expected = {
      books: [
        {
          _id: '62cd399ae8d983a9b8ce7d66',
          title: 'Tôi thấy hoa vàng trên cỏ xanh',
          image:
            'https://www.nxbtre.com.vn/Images/Book/nxbtre_full_04152018_031555.jpg',
          category: 'novel',
          quantity: 240,
          price: 50000,
          description:
            'Những câu chuyện nhỏ xảy ra ở một ngôi làng nhỏ: chuyện người, chuyện cóc, chuyện ma, chuyện công chúa và hoàng tử , rồi chuyện đói ăn, cháy nhà, lụt lội,... Bối cảnh là trường học, nhà trong xóm, bãi tha ma. Dẫn chuyện là cậu bé 15 tuổi tên Thiều. Thiều có chú ruột là chú Đàn, có bạn thân là cô bé Mận. Nhưng nhân vật đáng yêu nhất lại là Tường, em trai Thiều, một cậu bé học không giỏi. Thiều, Tường và những đứa trẻ sống trong cùng một làng, học cùng một trường, có biết bao chuyện chung. Chúng nô đùa, cãi cọ rồi yêu thương nhau, cùng lớn lên theo năm tháng, trải qua bao sự kiện biến cố của cuộc đời.\nTác giả vẫn giữ cách kể chuyện bằng chính giọng trong sáng hồn nhiên của trẻ con. 81 chương ngắn là 81 câu chuyện hấp dẫn với nhiều chi tiết thú vị, cảm động, có những tình tiết bất ngờ, từ đó lộ rõ tính cách người. Cuốn sách, vì thế, có sức ám ảnh.',
          __v: 0,
        },
      ],
      count: 1,
    };

    httpClientSpy.get.and.returnValue(asyncData(expected));
    bookService.getAll().subscribe((next) => {
      expect(next).withContext('expected books').toEqual(expected);
      done();
    });
  });

  it('should return expected book detail', (done: DoneFn) => {
    const expected = {
      data: {
        _id: '62cd399ae8d983a9b8ce7d66',
        title: 'Tôi thấy hoa vàng trên cỏ xanh',
        image:
          'https://www.nxbtre.com.vn/Images/Book/nxbtre_full_04152018_031555.jpg',
        category: 'novel',
        quantity: 238,
        price: 50000,
        description:
          'Những câu chuyện nhỏ xảy ra ở một ngôi làng nhỏ: chuyện người, chuyện cóc, chuyện ma, chuyện công chúa và hoàng tử , rồi chuyện đói ăn, cháy nhà, lụt lội,... Bối cảnh là trường học, nhà trong xóm, bãi tha ma. Dẫn chuyện là cậu bé 15 tuổi tên Thiều. Thiều có chú ruột là chú Đàn, có bạn thân là cô bé Mận. Nhưng nhân vật đáng yêu nhất lại là Tường, em trai Thiều, một cậu bé học không giỏi. Thiều, Tường và những đứa trẻ sống trong cùng một làng, học cùng một trường, có biết bao chuyện chung. Chúng nô đùa, cãi cọ rồi yêu thương nhau, cùng lớn lên theo năm tháng, trải qua bao sự kiện biến cố của cuộc đời.\nTác giả vẫn giữ cách kể chuyện bằng chính giọng trong sáng hồn nhiên của trẻ con. 81 chương ngắn là 81 câu chuyện hấp dẫn với nhiều chi tiết thú vị, cảm động, có những tình tiết bất ngờ, từ đó lộ rõ tính cách người. Cuốn sách, vì thế, có sức ám ảnh.',
        __v: 0,
      },
    };
    httpClientSpy.get.and.returnValue(asyncData(expected));
    bookService.getById(expected.data._id).subscribe((next) => {
      expect(next).withContext('expected book detail').toEqual(expected);
      done();
    });
  });

  it('should create book', (done: DoneFn) => {
    const bookDto = {
      title: 'Uchu Kyodai 28',
      image:
        'https://www.nxbtre.com.vn/Images/Book/nxbtre_thumb_14102022_031025.jpg',
      category: 'novel',
      quantity: 300,
      price: 70000,
      description: 'decription',
    } as BookCreateInput;
    httpClientSpy.post.and.returnValue(
      asyncData({
        book: {
          ...bookDto,
          _id: '62cd3bd982f0bb9244e1b28f',
          __v: 0,
        },
      })
    );
    bookService.create(bookDto).subscribe((next) => {
      expect(next)
        .withContext('create book')
        .toEqual({
          book: {
            ...bookDto,
            _id: '62cd3bd982f0bb9244e1b28f',
            __v: 0,
          },
        });
      done();
    });
  });

  it('should upadte book', (done: DoneFn) => {
    const cartDto = [
      {
        amount: 6,
        category: 'novel',
        description:
          'Những câu chuyện nhỏ xảy ra ở một ngôi làng nhỏ: chuyện người, chuyện cóc, chuyện ma, chuyện công chúa và hoàng tử , rồi chuyện đói ăn, cháy nhà, lụt lội,... Bối cảnh là trường học, nhà trong xóm, bãi tha ma. Dẫn chuyện là cậu bé 15 tuổi tên Thiều. Thiều có chú ruột là chú Đàn, có bạn thân là cô bé Mận. Nhưng nhân vật đáng yêu nhất lại là Tường, em trai Thiều, một cậu bé học không giỏi. Thiều, Tường và những đứa trẻ sống trong cùng một làng, học cùng một trường, có biết bao chuyện chung. Chúng nô đùa, cãi cọ rồi yêu thương nhau, cùng lớn lên theo năm tháng, trải qua bao sự kiện biến cố của cuộc đời.\nTác giả vẫn giữ cách kể chuyện bằng chính giọng trong sáng hồn nhiên của trẻ con. 81 chương ngắn là 81 câu chuyện hấp dẫn với nhiều chi tiết thú vị, cảm động, có những tình tiết bất ngờ, từ đó lộ rõ tính cách người. Cuốn sách, vì thế, có sức ám ảnh.',
        image:
          'https://www.nxbtre.com.vn/Images/Book/nxbtre_full_04152018_031555.jpg',
        price: 50000,
        quantity: 30,
        title: 'Tôi thấy hoa vàng trên cỏ xanh',
        _id: '62bd5050cfe461177057ba07',
      },
      {
        amount: 5,
        category: 'novel',
        description:
          'Những câu chuyện nhỏ xảy ra ở một ngôi làng nhỏ: chuyện người, chuyện cóc, chuyện ma, chuyện công chúa và hoàng tử , rồi chuyện đói ăn, cháy nhà, lụt lội,... Bối cảnh là trường học, nhà trong xóm, bãi tha ma. Dẫn chuyện là cậu bé 15 tuổi tên Thiều. Thiều có chú ruột là chú Đàn, có bạn thân là cô bé Mận. Nhưng nhân vật đáng yêu nhất lại là Tường, em trai Thiều, một cậu bé học không giỏi. Thiều, Tường và những đứa trẻ sống trong cùng một làng, học cùng một trường, có biết bao chuyện chung. Chúng nô đùa, cãi cọ rồi yêu thương nhau, cùng lớn lên theo năm tháng, trải qua bao sự kiện biến cố của cuộc đời.\nTác giả vẫn giữ cách kể chuyện bằng chính giọng trong sáng hồn nhiên của trẻ con. 81 chương ngắn là 81 câu chuyện hấp dẫn với nhiều chi tiết thú vị, cảm động, có những tình tiết bất ngờ, từ đó lộ rõ tính cách người. Cuốn sách, vì thế, có sức ám ảnh.',
        image:
          'https://www.nxbtre.com.vn/Images/Book/nxbtre_full_04152018_031555.jpg',
        price: 50000,
        quantity: 30,
        title: 'Tôi thấy hoa vàng trên cỏ xanh',
        _id: '62bd5050cfe461177057ba08',
      },
    ] as CartCreateInput[];
    httpClientSpy.post.and.returnValue(asyncData(cartDto));
    bookService.update(cartDto).subscribe((next) => {
      expect(next).withContext('add cart').toEqual(cartDto);
      done();
    });
  });
});

export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}
