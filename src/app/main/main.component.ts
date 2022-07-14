import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { CurrencyService } from '../services/currency.service';
import { Currency, CurrencyGeneric } from '../types/types';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private currencyService: CurrencyService, private titleService: Title) { }

  ngOnInit(): void {
    this.getCurrencyList()
  }

  genList!: CurrencyGeneric[];
  aSub!: Subscription;
  multIndex: number = 1;
  modelList: Currency[] = []
  currencyList: Currency[] = []
  selectedIndex = [0, 1]
  
  getCurrencyList(): void {
    this.aSub = this.currencyService.getCurrencyList().subscribe({
      next: (v: CurrencyGeneric[]) => {
        this.genList = v
        this.titleService.setTitle(this.currencyService.createTitle(v));
        this.currencyList = this.createModel(v)
        this.modelList = this.createModel(v)
      },
      error: (e) => {
        console.log(e)
      }
    })
  }

  createModel(v: CurrencyGeneric[]): Currency[] {
    let list: Currency[] = [{name: 'UAH', value: 100}];
    for (let i=0; i<v.length; i++) {
      let cur: Currency = {name: v[i].ccy, value: 100/(+v[i].sale)}
      if (v[i].base_ccy === 'UAH') {
        list.push(cur)
      }
    }
    return list;
  }

  findValueByIndex(indx: number) {
    return this.currencyList[indx]
  }

  onChangeValue(e: any, currency: Currency): void {
    let modelValue = this.foundCurrencyInModelList(currency.name)
    let value = e.target.value
    this.multIndex = value/modelValue
  }

  foundCurrencyInModelList (ccu: string): number {
    for(let i=0; i<this.modelList.length; i++) {
      if(this.modelList[i].name === ccu) {
        return this.modelList[i].value
      }
    }
    return 1;
  }

  onSelectChange(value: string, c: number, i: number): void {
    let newIndex = this.currencyList.findIndex(el => el.name === value)
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
      return false
    }
    if(this.selectedIndex.some(el => el === j)) {
      return true;
    }
    this.selectedIndex
    return false;
  }

}
