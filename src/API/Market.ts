import { Client, RPCCall, RPCResult, APIType, ClientOptions } from './Client';
import { CheckParams } from '../Helpers/Utils';

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

export class MarketAPI {
  private client: Client;
  constructor(client?: Client) {
    this.client = client ? client : new Client();
  }

  public getCurrentMedianHistoryPrice() {
    return this.client.callCondenserApi<PriceQuote>(
      'get_current_median_history_price'
    );
  }

  public getFeedHistory() {
    return this.client.callCondenserApi<{
      id: number;
      current_median_history: PriceQuote;
      price_history: PriceQuote[];
    }>('get_feed_history');
  }

  public getMarketHistory(bucketSeconds: number, start: string, end: string) {
    if (bucketSeconds < 1) {
      throw new Error('Bucket segments must be greater than 1 second.');
    }

    CheckParams({ start, end });

    return this.client.callCondenserApi<MarketHistory[]>('get_market_history', [
      bucketSeconds,
      start,
      end
    ]);
  }

  public getOpenOrders(account: string) {
    CheckParams({ account });

    return this.client.callCondenserApi<MarketOrder[]>('get_open_orders', [
      account
    ]);
  }

  public getOrderBook(limit: number) {
    CheckParams({ limit }, 500);

    return this.client.callCondenserApi<OrderBook>('get_order_book', [limit]);
  }

  public getRecentTrades(limit: number) {
    CheckParams({ limit }, 1000);

    return this.client.callCondenserApi<MarketTrade[]>('get_recent_trades', [
      limit
    ]);
  }

  public getTicker() {
    return this.client.callCondenserApi<MarketTicker>('get_ticker');
  }

  public getTradeHistory(start: string, end: string, limit: number) {
    CheckParams({ start, end, limit }, 1000);

    return this.client.callCondenserApi<MarketTrade[]>('get_trade_history', [
      start,
      end,
      limit
    ]);
  }

  public getVolume() {
    return this.client.callCondenserApi<{
      steem_volume: string;
      sbd_volume: string;
    }>('get_volume');
  }
}
