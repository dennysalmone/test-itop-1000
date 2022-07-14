import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ExchangeData } from '../types/types';

@Injectable({
  providedIn: 'root'
})

export class ExchangeRateService {

  header$ = new Subject<ExchangeData[]>();
  
  constructor() { }
}
