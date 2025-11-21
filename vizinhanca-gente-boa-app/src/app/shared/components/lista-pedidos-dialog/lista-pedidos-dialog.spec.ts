import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPedidosDialog } from './lista-pedidos-dialog';

describe('ListaPedidosDialog', () => {
  let component: ListaPedidosDialog;
  let fixture: ComponentFixture<ListaPedidosDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaPedidosDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaPedidosDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
