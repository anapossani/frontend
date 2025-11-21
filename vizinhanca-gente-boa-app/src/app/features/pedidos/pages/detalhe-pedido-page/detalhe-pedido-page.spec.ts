import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhePedidoPage } from './detalhe-pedido-page';

describe('DetalhePedidoPage', () => {
  let component: DetalhePedidoPage;
  let fixture: ComponentFixture<DetalhePedidoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalhePedidoPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalhePedidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
