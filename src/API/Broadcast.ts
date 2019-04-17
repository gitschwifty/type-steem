import { Client, APIResult, APIType, ClientOptions } from './Client';
import { SignedBlock } from '../Steem/Block';
import { Trx, SignedTrx, ConfirmedTrx } from '../Steem/Transaction';

export class BroadcastAPI {
  private client: Client;
  constructor(client?: Client) {
    this.client = client ? client : new Client();
  }

  public broadcastTransaction(trx: SignedTrx, sync: boolean = false) {
    const method = sync
      ? 'broadcast_transaction_synchronous'
      : 'broadcast_transaction';
    return this.client.callCondenserApi<ConfirmedTrx>(method, [trx]);
  }
}
