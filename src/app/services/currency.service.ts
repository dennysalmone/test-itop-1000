import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CurrencyGeneric } from "../types/types";

@Injectable({
  providedIn: 'root'
})

export class CurrencyService {

  constructor(private http: HttpClient) {}

  getCurrencyList(): Observable<CurrencyGeneric[]> {
    return this.http.get<CurrencyGeneric[]>(`https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11`)
  }

  createTitle(array: CurrencyGeneric[]): string {
    let newArray = JSON.parse(JSON.stringify(array));
    let usd = newArray.filter((el: { ccy: string; }) => el.ccy === 'USD')[0];
    let eur = newArray.filter((el: { ccy: string; }) => el.ccy === 'EUR')[0];
    usd.sale = (+usd.sale).toFixed(2);
    eur.sale = (+eur.sale).toFixed(2);
    if(usd && eur) {
      return `${usd.ccy}: ${usd.sale}, ${eur.ccy}: ${eur.sale}`;
    }
    return 'Currency exchange';
  }

}
