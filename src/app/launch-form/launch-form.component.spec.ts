import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaunchFormComponent } from './launch-form.component';

describe('LaunchFormComponent', () => {
  let component: LaunchFormComponent;
  let fixture: ComponentFixture<LaunchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaunchFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaunchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
