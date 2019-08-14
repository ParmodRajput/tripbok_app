import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverDetailPage } from './driver-detail.page';

describe('DriverDetailPage', () => {
  let component: DriverDetailPage;
  let fixture: ComponentFixture<DriverDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
