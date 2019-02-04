import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorComponenetComponent } from './error-componenet.component';

describe('ErrorComponenetComponent', () => {
  let component: ErrorComponenetComponent;
  let fixture: ComponentFixture<ErrorComponenetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorComponenetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorComponenetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
