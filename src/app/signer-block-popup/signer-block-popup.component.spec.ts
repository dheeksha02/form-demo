import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignerBlockPopupComponent } from './signer-block-popup.component';

describe('SignerBlockPopupComponent', () => {
  let component: SignerBlockPopupComponent;
  let fixture: ComponentFixture<SignerBlockPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignerBlockPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignerBlockPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
