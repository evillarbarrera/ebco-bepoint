import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SosPage } from './sos.page';

describe('SosPage', () => {
  let component: SosPage;
  let fixture: ComponentFixture<SosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
