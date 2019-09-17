import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwostepvarivicationPage } from './twostepvarivication.page';

describe('TwostepvarivicationPage', () => {
  let component: TwostepvarivicationPage;
  let fixture: ComponentFixture<TwostepvarivicationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwostepvarivicationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwostepvarivicationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
