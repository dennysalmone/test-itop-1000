// [
//     {"ccy":"USD","base_ccy":"UAH","buy":"37.20000","sale":"37.80000"},
//     {"ccy":"EUR","base_ccy":"UAH","buy":"37.00000","sale":"38.00000"},
//     {"ccy":"BTC","base_ccy":"USD","buy":"18943.4600","sale":"20937.5084"}
// ]

export type CurrencyGeneric = {
    'ccy' : string,
    'base_ccy': string,
    'buy': string,
    'sale': string
}

export type Currency = {
    name: string,
    value: number
}