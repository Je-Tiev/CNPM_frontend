import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageShopComponent } from './manage-shop.component';

describe('ManageShopComponent', () => {
  let component: ManageShopComponent;
  let fixture: ComponentFixture<ManageShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageShopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
