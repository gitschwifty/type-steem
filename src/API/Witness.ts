/**
 * @file Witness API Class.
 * @author Peter James Taggart <code@pjtaggart.com>
 */

import { Client } from './Client';
import { CheckParams } from '../Helpers/Utils';
import { Witness, WitnessSchedule } from '../Steem/Witness';
import { API } from './API';

/**
 * Witness API takes a client or creates a default
 */
export class WitnessAPI extends API {
  constructor(client?: Client) {
    super(client);
  }

  /**
   * Gets the current round of witness (21)
   */
  public getActiveWitnesses() {
    return this.client.callCondenserApi<string[]>('get_active_witnesses');
  }

  /**
   * Gets account's witness if it exists
   * @param account
   */
  public getWitnessByAccount(account: string) {
    CheckParams({ account });

    return this.client.callCondenserApi<Witness>('get_witness_by_account', [
      account
    ]);
  }

  /**
   * Gets the current count of witnesses
   */
  public getWitnessCount() {
    return this.client.callCondenserApi<number>('get_witness_count');
  }

  /**
   * Gets the current witness schedule
   */
  public getWitnessSchedule() {
    return this.client.callCondenserApi<WitnessSchedule>(
      'get_witness_schedule'
    );
  }

  /**
   * Gets a list of witnesses by their ids
   * @param index
   */
  public getWitnesses(index: number[]) {
    index.map(val => {
      if (val < 0) {
        throw new Error('Witness index must be positive.');
      }
    });

    return this.client.callCondenserApi<Witness[]>('get_witnesses', [index]);
  }

  /**
   * Returns a list of witnesses sorted by vote up to limit
   * @param limit 0 < limit <= 1,000
   * @param startName optional name to start from
   */
  public getWitnessesByVote(limit: number, startName?: string) {
    CheckParams({ limit }, 1000);

    return this.client.callCondenserApi<Witness[]>('get_witnesses_by_vote', [
      startName,
      limit
    ]);
  }

  /**
   * Looks up witnesses alphabetically up to limit
   * @param startName witness name to start from
   * @param limit 0 < limit <= 1,000
   */
  public lookupWitnessAccounts(startName: string, limit: number) {
    CheckParams({ startName, limit }, 1000);

    return this.client.callCondenserApi<Witness[]>('lookup_witness_accounts', [
      startName,
      limit
    ]);
  }
}
