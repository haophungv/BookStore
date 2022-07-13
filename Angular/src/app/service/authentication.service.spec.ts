import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { asyncData } from './book.service.spec';

describe('AuthenticationService', () => {
  let authenticationService: AuthenticationService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      // providers: [HttpClient, HttpHandler],
    });
    authenticationService = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    expect(authenticationService).toBeTruthy();
  });

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    authenticationService = new AuthenticationService(httpClientSpy);
  });

  it('should login', (done: DoneFn) => {
    const expected = {
      data: [
        {
          _id: '62bb36f94c2b975399c2f01d',
          username: 'haophungv2',
          password: '123123',
          __v: 0,
        },
      ],
      token: 'this is token',
    };

    httpClientSpy.post.and.returnValue(asyncData(expected));
    authenticationService.login('', '').subscribe((next) => {
      expect(next).withContext('login').toEqual(expected);
      done();
    });
  });

  it('should register', (done: DoneFn) => {
    const expected = {
      user: 'haophung',
    };
    httpClientSpy.post.and.returnValue(asyncData(expected));
    authenticationService.register('', '').subscribe((next) => {
      expect(next).withContext('register').toEqual(expected);
      done();
    });
  });
});
