import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineModeComponent } from './online-mode.component';

describe('OnlineModeComponent', () => {
  let component: OnlineModeComponent;
  let fixture: ComponentFixture<OnlineModeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OnlineModeComponent]
    });
    fixture = TestBed.createComponent(OnlineModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
