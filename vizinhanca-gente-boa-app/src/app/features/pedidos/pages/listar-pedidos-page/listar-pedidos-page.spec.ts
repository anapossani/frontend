import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPedidosPage } from './listar-pedidos-page';

describe('ListarPedidosPage', () => {
  let component: ListarPedidosPage;
  let fixture: ComponentFixture<ListarPedidosPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarPedidosPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarPedidosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
