import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabularViewComponent } from './tabular-view.component';

describe('TabularViewComponent', () => {
  let component: TabularViewComponent;
  let fixture: ComponentFixture<TabularViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabularViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabularViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
