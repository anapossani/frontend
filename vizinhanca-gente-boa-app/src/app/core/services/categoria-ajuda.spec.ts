import { TestBed } from '@angular/core/testing';

import { CategoriaAjuda } from './categoria-ajuda';

describe('CategoriaAjuda', () => {
  let service: CategoriaAjuda;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriaAjuda);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
