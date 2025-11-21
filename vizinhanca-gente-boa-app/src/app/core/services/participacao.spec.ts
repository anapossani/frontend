import { TestBed } from '@angular/core/testing';

import { Participacao } from './participacao';

describe('Participacao', () => {
  let service: Participacao;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Participacao);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
