import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChekRiskPage } from './chek-risk.page';

describe('ChekRiskPage', () => {
  let component: ChekRiskPage;
  let fixture: ComponentFixture<ChekRiskPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChekRiskPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChekRiskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
