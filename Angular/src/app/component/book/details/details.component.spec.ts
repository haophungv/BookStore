import {
  ActivatedRoute,
  convertToParamMap,
  Data,
  ParamMap,
  Params,
} from '@angular/router';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsComponent } from './details.component';
import { BehaviorSubject } from 'rxjs';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;

  class ActivatedRouteStub {
    private readonly paramMap$$ = new BehaviorSubject<ParamMap>(
      convertToParamMap({})
    );
    private readonly queryParamMap$$ = new BehaviorSubject<ParamMap>(
      convertToParamMap({})
    );
    private readonly data$$ = new BehaviorSubject<Data>({});

    public readonly paramMap = this.paramMap$$.asObservable();
    public readonly queryParamMap = this.queryParamMap$$.asObservable();
    public readonly data = this.data$$.asObservable();

    public readonly snapshot = {
      paramMap: this.paramMap$$.value,
      queryParamMap: this.queryParamMap$$.value,
      data: this.data$$.value,
    };

    public setParamMap(params: Params = {}): void {
      this.paramMap$$.next(convertToParamMap(params));
    }

    public setQueryParamMap(params: Params = {}): void {
      this.queryParamMap$$.next(convertToParamMap(params));
    }

    public setData(data: Data = {}): void {
      this.data$$.next(data);
    }
  }

  const mockActivatedRoute = new ActivatedRouteStub();
  beforeEach(async () => {
    // const activatedRouteSpy = jasmine.createSpyObj('ActivateRoute', [
    //   'snapshot',
    // ]);

    await TestBed.configureTestingModule({
      declarations: [DetailsComponent],
      providers: [
        HttpClient,
        HttpHandler,
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // mockActivatedRoute.setParamMap({ id: '123456789' });
    // fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
