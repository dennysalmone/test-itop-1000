import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ExchangeRateService } from '../services/exchange-rate.service';
import { ExchangeData } from '../types/types';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private exchangeService: ExchangeRateService) { }

  headerTitle: string[] = ['', '']
  aSub!: Subscription;

  ngOnInit(): void {
    this.getHeader();
  }

  getHeader(): void {
    this.aSub = this.exchangeService.header$.subscribe(
      (data: ExchangeData[]) => {
        this.makeHeader(data);
        this.exchangeService.header$.unsubscribe()
      }
    )
  }

  makeHeader (data: ExchangeData[]): void {
    const usd = data.find((el: { ccy: string; }) => el.ccy === 'USD');
    const eur = data.find((el: { ccy: string; }) => el.ccy === 'EUR');
    let usdHeader = `$${usd?.buy} / ${usd?.sale}`
    let uerHeader = `€${eur?.buy} / ${eur?.sale}`
    


    this.headerTitle = [usdHeader, uerHeader]
  }



}
