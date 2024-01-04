import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankhomeComponent } from './bankhome.component';

describe('BankhomeComponent', () => {
  let component: BankhomeComponent;
  let fixture: ComponentFixture<BankhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankhomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
