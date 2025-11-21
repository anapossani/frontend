import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AceitarAjudaDialog } from './aceitar-ajuda-dialog';

describe('AceitarAjudaDialog', () => {
  let component: AceitarAjudaDialog;
  let fixture: ComponentFixture<AceitarAjudaDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AceitarAjudaDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AceitarAjudaDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
