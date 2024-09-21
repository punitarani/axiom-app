// app/mdata/types.ts

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
