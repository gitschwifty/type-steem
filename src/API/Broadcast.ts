/**
 * @file Broadcast API Class.
 * @author Peter James Taggart <code@pjtaggart.com>
 */

import { Client } from './Client';
import { SignedTrx, ConfirmedTrx } from '../Steem/Transaction';
import { API } from './API';

/**
 * Broadcast API class, takes a client or creates its own default.
 */
export class BroadcastAPI extends API {
  constructor(client?: Client) {
    super(client);
  }

  /**
   * Broadcasts transaction: untested, takes sync = true if synchronous
   * @param trx signed transaction to broadcast
   * @param sync
   */
  public broadcastTransaction(trx: SignedTrx, sync: boolean = false) {
    const method = sync
      ? 'broadcast_transaction_synchronous'
      : 'broadcast_transaction';
    return this.client.callCondenserApi<ConfirmedTrx>(method, [trx]);
  }
}
