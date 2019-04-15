import { Client, RPCCall, RPCResult, APIType, ClientOptions } from './Client';

export class MarketAPI extends Client {
  constructor(node?: string, options?: ClientOptions) {
    super(node, options);
  }

  public getCurrentMedianHistoryPrice() {
    return this.callApi(APIType.cond, 'get_current_median_history_price');
  }

  public getFeedHistory() {
    return this.callApi(APIType.cond, 'get_feed_history');
  }

  public getMarketHistory(bucketSeconds: number, start: string, end: string) {
    if (bucketSeconds < 1) {
      throw new Error('Bucket segments must be greater than 1 second.');
    }

    if (!start || !end) {
      throw new Error('Start and end times must be non-empty.');
    }

    return this.callApi(APIType.cond, 'get_market_history', [
      bucketSeconds,
      start,
      end
    ]);
  }

  public getOpenOrders(account: string) {
    if (!account) {
      throw new Error('Account must be non-empty string.');
    }

    return this.callApi(APIType.cond, 'get_open_orders', [account]);
  }

  public getOrderBook(limit: number) {
    if (limit < 1 || limit > 500) {
      throw new Error('Limit must be positive and less than 500.');
    }

    return this.callApi(APIType.cond, 'get_order_book', [limit]);
  }

  public getRecentTrades(limit: number) {
    if (limit < 1 || limit > 1000) {
      throw new Error('Limit must be positive and less than 1000.');
    }

    return this.callApi(APIType.cond, 'get_recent_trades', [limit]);
  }

  public getTicker() {
    return this.callApi(APIType.cond, 'get_ticker');
  }

  public getTradeHistory(start: string, end: string, limit: number) {
    if (limit < 1 || limit > 1000) {
      throw new Error('Limit must be positive and less than 1000.');
    }

    if (!start || !end) {
      throw new Error('Start and end times must be non-empty.');
    }

    return this.callApi(APIType.cond, 'get_trade_history', [start, end, limit]);
  }

  public getVolume() {
    return this.callApi(APIType.cond, 'get_volume');
  }
}
