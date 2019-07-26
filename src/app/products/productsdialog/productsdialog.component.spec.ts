import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsdialogComponent } from './productsdialog.component';

describe('ProductsdialogComponent', () => {
  let component: ProductsdialogComponent;
  let fixture: ComponentFixture<ProductsdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
