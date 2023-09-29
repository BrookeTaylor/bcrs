/**
 *  Title: Bob's Computer Repair Shop
 *  Arthur: Janis Gonzalez
 *  Date: 09/27/2023
 *  Description: invoice service
 */



import { TestBed } from '@angular/core/testing';

import { InvoiceService } from './invoice.service';

describe('InvoiceService', () => {
  let service: InvoiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
