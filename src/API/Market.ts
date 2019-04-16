import { Client, RPCCall, RPCResult, APIType, ClientOptions } from './Client';

export class MarketAPI extends Client {
  constructor(node?: string, options?: ClientOptions) {
    super(node, options);
  }

  public getCurrentMedianHistoryPrice() {
    return this.callCondenserApi('get_current_median_history_price');
  }

  public getFeedHistory() {
    return this.callCondenserApi('get_feed_history');
  }

  public getMarketHistory(bucketSeconds: number, start: string, end: string) {
    if (bucketSeconds < 1) {
      throw new Error('Bucket segments must be greater than 1 second.');
    }

    this.checkParams({ start, end });

    return this.callCondenserApi('get_market_history', [
      bucketSeconds,
      start,
      end
    ]);
  }

  public getOpenOrders(account: string) {
    this.checkParams({ account });

    return this.callCondenserApi('get_open_orders', [account]);
  }

  public getOrderBook(limit: number) {
    this.checkParams({ limit }, 500);

    return this.callCondenserApi('get_order_book', [limit]);
  }

  public getRecentTrades(limit: number) {
    this.checkParams({ limit }, 1000);

    return this.callCondenserApi('get_recent_trades', [limit]);
  }

  public getTicker() {
    return this.callCondenserApi('get_ticker');
  }

  public getTradeHistory(start: string, end: string, limit: number) {
    this.checkParams({ start, end, limit }, 1000);

    return this.callCondenserApi('get_trade_history', [start, end, limit]);
  }

  public getVolume() {
    return this.callCondenserApi('get_volume');
  }
}
