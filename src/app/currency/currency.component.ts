import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { CurrencyService } from '../services/currency.service';
import { ExchangeRateService } from '../services/exchange-rate.service';
import { Currency, ExchangeData } from '../types/types';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {

  constructor(private currencyService: CurrencyService, private titleService: Title, private exchangeService: ExchangeRateService ) { }

  ngOnInit(): void {
    this.getCurrencyList()
  }

  defaultTitle = 'Currency exchange';
  aSub!: Subscription;
  multIndex: number = 1;
  sampleList: Currency[] = [];
  currencyList: Currency[] = [];
  selectedIndex = [0, 1];
  
  getCurrencyList(): void {
    this.aSub = this.currencyService.getCurrencyList().subscribe({
      next: (data: ExchangeData[]) => {
        this.exchangeService.header$.next(data)
        this.titleService.setTitle(this.createTitle(data));
        this.currencyList = this.createList(data);
        this.sampleList = this.createList(data);
      },
      error: (e) => {
        console.log(e)
      }
    })
  }

  createTitle(array: ExchangeData[]): string {
    const newArray = JSON.parse(JSON.stringify(array));
    const usd = newArray.find((el: { ccy: string; }) => el.ccy === 'USD');
    const eur = newArray.find((el: { ccy: string; }) => el.ccy === 'EUR');

    usd.sale = (+usd.sale).toFixed(2);
    eur.sale = (+eur.sale).toFixed(2);

    if(usd && eur) {
      return `${usd.ccy}: ${usd.sale}, ${eur.ccy}: ${eur.sale}`;
    }

    return this.defaultTitle;
  }

  createList(data: ExchangeData[]): Currency[] {
    const baseCurrency = {name: 'UAH', value: 100};
    const list: Currency[] = [baseCurrency];

    data.forEach(el => {
      let cur: Currency = {name: el.ccy, value: 100/(+el.sale)}
      if (el.base_ccy === 'UAH') {
        list.push(cur);
      }
    })

    return list;
  }

  findValueByIndex(i: number) {
    return this.currencyList[i];
  }

  onChangeValue(value: number, currency: Currency): void {
    const sampleValue = this.foundCurrencyInSampleList(currency.name)
    let newMultIndex = value/sampleValue
    if(newMultIndex >= 0) {
      this.multIndex = newMultIndex;
    } else {
      this.multIndex = -newMultIndex;
    }
  }

  foundCurrencyInSampleList (ccu: string): number {    
    return (this.sampleList.find(el => el.name === ccu)?.value as number)
  }

  onSelectChange(value: string, c: number, i: number): void {
    const newIndex = this.currencyList.findIndex(el => el.name === value)

    this.selectedIndex[i] = newIndex
  }

  checkIndex(i: number, c: number) {
    if(i === c) {
      return true;
    }
    return false;
  }

  checkForDisable(c: number, j: number) {
    if (c === j) {
      return false;
    }
    if(this.selectedIndex.some(el => el === j)) {
      return true;
    }
    this.selectedIndex
    return false;
  }

}
