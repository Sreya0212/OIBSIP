import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TributeComponent } from './tribute.component';

describe('TributeComponent', () => {
  let component: TributeComponent;
  let fixture: ComponentFixture<TributeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TributeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
