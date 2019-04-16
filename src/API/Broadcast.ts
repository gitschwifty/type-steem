import { Client, APIResult, APIType, ClientOptions } from './Client';
import { SignedBlock } from '../Steem/Block';
import { Transaction, SignedTransaction } from '../Steem/Transaction';

export class BroadcastAPI {
  private client: Client;
  constructor(client?: Client) {
    this.client = client ? client : new Client();
  }

  public broadcastTransaction(trx: SignedTransaction, sync: boolean = false) {
    const method = sync
      ? 'broadcast_transaction_synchronous'
      : 'broadcast_transaction';
    return this.client.callCondenserApi(method, [trx]);
  }
}
