export interface PriceQuote {
  base: string;
  quote: string;
}

export interface MarketHistory {
  id: number;
  non_steem: MarketTimeSlice;
  open: string;
  seconds: number;
  steem: MarketTimeSlice;
}

export interface MarketTimeSlice {
  close: number;
  high: number;
  low: number;
  open: number;
  volume: number;
}

export interface MarketOrder {
  created: string;
  order_price: PriceQuote;
  real_price: string;
  sbd: number;
  steem: number;
}

export interface OrderBook {
  asks: MarketOrder[];
  bids: MarketOrder[];
}

export interface MarketTrade {
  current_pays: string;
  date: string;
  open_pays: string;
}

export interface MarketTicker {
  highest_bid: string;
  latest: string;
  lowest_ask: string;
  percent_change: string;
  sbd_volume: string;
  steem_volume: string;
}
