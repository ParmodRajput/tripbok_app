import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeridePage } from './freeride.page';

describe('FreeridePage', () => {
  let component: FreeridePage;
  let fixture: ComponentFixture<FreeridePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreeridePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeridePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
