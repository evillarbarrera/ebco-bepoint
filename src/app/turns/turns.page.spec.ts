import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnsPage } from './turns.page';

describe('TurnsPage', () => {
  let component: TurnsPage;
  let fixture: ComponentFixture<TurnsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
