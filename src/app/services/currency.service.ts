import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ExchangeData } from "../types/types";

@Injectable({
  providedIn: 'root'
})

export class CurrencyService {

  constructor(private http: HttpClient) {}

  getCurrencyList(): Observable<ExchangeData[]> {
    return this.http.get<ExchangeData[]>(`https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11`)
  }

}
