import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudFunctionComponent } from './crud-function.component';
import { output } from '@angular/core';

describe('CrudFunctionComponent', () => {
  let component: CrudFunctionComponent;
  let fixture: ComponentFixture<CrudFunctionComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudFunctionComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CrudFunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
