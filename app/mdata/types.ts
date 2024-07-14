// app/mdata/types.ts

export interface Candle {
  close?: number
  datetime?: number
  datetimeISO8601?: string
  high?: number
  low?: number
  open?: number
  volume?: number
}

export interface CandleList {
  candles?: Candle[]
  empty?: boolean
  previousClose?: number
  previousCloseDate?: number
  previousCloseDateISO8601?: string
  symbol?: string
}

export interface LevelOneEquityContent {
  ASK_ID?: string
  ASK_MIC_ID?: string
  ASK_PRICE?: number
  ASK_SIZE?: number
  ASK_TIME_MILLIS?: number
  BID_ID?: string
  BID_MIC_ID?: string
  BID_PRICE?: number
  BID_SIZE?: number
  BID_TIME_MILLIS?: number
  LAST_ID?: string
  LAST_MIC_ID?: string
  LAST_SIZE?: number
  MARK?: number
  MARK_CHANGE?: number
  MARK_CHANGE_PERCENT?: number
  QUOTE_TIME_MILLIS?: number
  REGULAR_MARKET_LAST_SIZE?: number
  REGULAR_MARKET_TRADE_MILLIS?: number
  TOTAL_VOLUME?: number
  TRADE_TIME_MILLIS?: number
  key?: string
}

export interface LevelOneEquity {
  command?: string
  content?: LevelOneEquityContent[]
  service?: string
  timestamp?: number
}

export interface Bond {
  cusip?: string | null
  symbol?: string | null
  description?: string | null
  exchange?: string | null
  assetType?: AssetType | null
  bondFactor?: string | null
  bondMultiplier?: string | null
  bondPrice?: number | null
  type?: Type | null
}

export enum AssetType {
  BOND = 'BOND',
  EQUITY = 'EQUITY',
  ETF = 'ETF',
  EXTENDED = 'EXTENDED',
  FOREX = 'FOREX',
  FUTURE = 'FUTURE',
  FUTURE_OPTION = 'FUTURE_OPTION',
  FUNDAMENTAL = 'FUNDAMENTAL',
  INDEX = 'INDEX',
  INDICATOR = 'INDICATOR',
  MUTUAL_FUND = 'MUTUAL_FUND',
  OPTION = 'OPTION',
  UNKNOWN = 'UNKNOWN',
}

export enum Type {
  BOND = 'BOND',
  EQUITY = 'EQUITY',
  ETF = 'ETF',
  EXTENDED = 'EXTENDED',
  FOREX = 'FOREX',
  FUTURE = 'FUTURE',
  FUTURE_OPTION = 'FUTURE_OPTION',
  FUNDAMENTAL = 'FUNDAMENTAL',
  INDEX = 'INDEX',
  INDICATOR = 'INDICATOR',
  MUTUAL_FUND = 'MUTUAL_FUND',
  OPTION = 'OPTION',
  UNKNOWN = 'UNKNOWN',
}

export class FundamentalInst {
  symbol?: string
  high52?: number
  low52?: number
  dividendAmount?: number
  dividendYield?: number
  dividendDate?: string
  peRatio?: number
  pegRatio?: number
  pbRatio?: number
  prRatio?: number
  pcfRatio?: number
  grossMarginTTM?: number
  grossMarginMRQ?: number
  netProfitMarginTTM?: number
  netProfitMarginMRQ?: number
  operatingMarginTTM?: number
  operatingMarginMRQ?: number
  returnOnEquity?: number
  returnOnAssets?: number
  returnOnInvestment?: number
  quickRatio?: number
  currentRatio?: number
  interestCoverage?: number
  totalDebtToCapital?: number
  ltDebtToEquity?: number
  totalDebtToEquity?: number
  epsTTM?: number
  epsChangePercentTTM?: number
  epsChangeYear?: number
  epsChange?: number
  revChangeYear?: number
  revChangeTTM?: number
  revChangeIn?: number
  sharesOutstanding?: number
  marketCapFloat?: number
  marketCap?: number
  bookValuePerShare?: number
  shortIntToFloat?: number
  shortIntDayToCover?: number
  divGrowthRate3Year?: number
  dividendPayAmount?: number
  dividendPayDate?: string
  beta?: number
  vol1DayAvg?: number
  vol10DayAvg?: number
  vol3MonthAvg?: number
  avg10DaysVolume?: number
  avg1DayVolume?: number
  avg3MonthVolume?: number
  declarationDate?: string
  dividendFreq?: number
  eps?: number
  corpactionDate?: string
  dtnVolume?: number
  nextDividendPayDate?: string
  nextDividendDate?: string
  fundLeverageFactor?: number
  fundStrategy?: string
}

export class Instrument {
  cusip?: string
  symbol?: string
  description?: string
  exchange?: string
  assetType?: AssetType
  type?: Type
}

export class InstrumentResponse {
  cusip?: string
  symbol?: string
  description?: string
  exchange?: string
  assetType?: AssetType
  bondFactor?: string
  bondMultiplier?: string
  bondPrice?: number
  fundamental?: FundamentalInst
  instrumentInfo?: Instrument
  bondInstrumentInfo?: Bond
  type?: Type
}
