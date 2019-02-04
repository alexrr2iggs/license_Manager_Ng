import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenceSearchFilterComponent } from './licence-search-filter.component';

describe('LicenceSearchFilterComponent', () => {
  let component: LicenceSearchFilterComponent;
  let fixture: ComponentFixture<LicenceSearchFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicenceSearchFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenceSearchFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
