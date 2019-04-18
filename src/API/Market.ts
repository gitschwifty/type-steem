/**
 * @file Market API Class.
 * @author Peter James Taggart <code@pjtaggart.com>
 */

import { Client } from './Client';
import { CheckParams } from '../Helpers/Utils';
import {
  PriceQuote,
  MarketHistory,
  MarketOrder,
  OrderBook,
  MarketTrade,
  MarketTicker
} from '../Steem/Market';
import { API } from './API';

/**
 * Market API class takes client or creates default
 */
export class MarketAPI extends API {
  constructor(client?: Client) {
    super(client);
  }

  /**
   * Returns current price quote
   */
  public getCurrentMedianHistoryPrice() {
    return this.client.callCondenserApi<PriceQuote>(
      'get_current_median_history_price'
    );
  }

  /**
   * Returns price feed history, including current price and last x prices
   */
  public getFeedHistory() {
    return this.client.callCondenserApi<{
      id: number;
      current_median_history: PriceQuote;
      price_history: PriceQuote[];
    }>('get_feed_history');
  }

  /**
   * Returns market history from start to end split into array by bucketSeconds
   * @param bucketSeconds 0 < integer <= 86400
   * @param start start date
   * @param end end date
   */
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

  /**
   * Gets account's current market orders
   * @param account
   */
  public getOpenOrders(account: string) {
    CheckParams({ account });

    return this.client.callCondenserApi<MarketOrder[]>('get_open_orders', [
      account
    ]);
  }

  /**
   * Gets the current orderbook, up to limit
   * @param limit 1 < limit < 500
   */
  public getOrderBook(limit: number) {
    CheckParams({ limit }, 500);

    return this.client.callCondenserApi<OrderBook>('get_order_book', [limit]);
  }

  /**
   * Gets recent trades up to limit
   * @param limit 1 < limit < 1,000
   */
  public getRecentTrades(limit: number) {
    CheckParams({ limit }, 1000);

    return this.client.callCondenserApi<MarketTrade[]>('get_recent_trades', [
      limit
    ]);
  }

  /**
   * Returns current market ticker
   */
  public getTicker() {
    return this.client.callCondenserApi<MarketTicker>('get_ticker');
  }

  /**
   * Gets trade history from start to end, up to limit items
   * @param start date
   * @param end date
   * @param limit 1 < limit < 1,000
   */
  public getTradeHistory(start: string, end: string, limit: number) {
    CheckParams({ start, end, limit }, 1000);

    return this.client.callCondenserApi<MarketTrade[]>('get_trade_history', [
      start,
      end,
      limit
    ]);
  }

  /**
   * Gets current market volume for steem & sbd
   */
  public getVolume() {
    return this.client.callCondenserApi<{
      steem_volume: string;
      sbd_volume: string;
    }>('get_volume');
  }
}
