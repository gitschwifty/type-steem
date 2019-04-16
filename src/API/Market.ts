import { Client, RPCCall, RPCResult, APIType, ClientOptions } from './Client';
import { CheckParams } from '../Helpers/Utils';

export class MarketAPI {
  private client: Client;
  constructor(client?: Client) {
    this.client = client ? client : new Client();
  }

  public getCurrentMedianHistoryPrice() {
    return this.client.callCondenserApi('get_current_median_history_price');
  }

  public getFeedHistory() {
    return this.client.callCondenserApi('get_feed_history');
  }

  public getMarketHistory(bucketSeconds: number, start: string, end: string) {
    if (bucketSeconds < 1) {
      throw new Error('Bucket segments must be greater than 1 second.');
    }

    CheckParams({ start, end });

    return this.client.callCondenserApi('get_market_history', [
      bucketSeconds,
      start,
      end
    ]);
  }

  public getOpenOrders(account: string) {
    CheckParams({ account });

    return this.client.callCondenserApi('get_open_orders', [account]);
  }

  public getOrderBook(limit: number) {
    CheckParams({ limit }, 500);

    return this.client.callCondenserApi('get_order_book', [limit]);
  }

  public getRecentTrades(limit: number) {
    CheckParams({ limit }, 1000);

    return this.client.callCondenserApi('get_recent_trades', [limit]);
  }

  public getTicker() {
    return this.client.callCondenserApi('get_ticker');
  }

  public getTradeHistory(start: string, end: string, limit: number) {
    CheckParams({ start, end, limit }, 1000);

    return this.client.callCondenserApi('get_trade_history', [
      start,
      end,
      limit
    ]);
  }

  public getVolume() {
    return this.client.callCondenserApi('get_volume');
  }
}
