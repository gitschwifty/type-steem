/**
 * @file Wallet API Class.
 * @author Peter James Taggart <code@pjtaggart.com>
 */

import { Client } from './Client';
import { CheckParams } from '../Helpers/Utils';
import { Delegation, WithdrawRoute } from '../Steem/Wallet';
import { API } from './API';

/**
 * Wallet API Class takes a client or creates a default
 */
export class WalletAPI extends API {
  constructor(client?: Client) {
    super(client);
  }

  /**
   * Gets delegator account's delegations up to limit
   * @param delegator
   * @param limit 0 < limit <= 1,000
   * @param startAccount optional account to start from alphabetically
   */
  public getVestingDelegations(
    delegator: string,
    limit: number,
    startAccount?: string
  ) {
    CheckParams({ delegator, limit }, 1000);

    return this.client.callCondenserApi<Delegation[]>(
      'get_vesting_delegations',
      [delegator, startAccount, limit]
    );
  }

  /**
   * Gets withdraw routes for account
   * @param account
   * @param withdrawType 'outgoing' || 'incoming' || 'all'
   */
  public getWithdrawRoutes(account: string, withdrawType: string) {
    CheckParams({ account });

    if (
      !withdrawType ||
      !(
        withdrawType === 'outgoing' ||
        withdrawType === 'incoming' ||
        withdrawType === 'all'
      )
    ) {
      throw new Error('Type must be one of outgoing, incoming, or all.');
    }

    return this.client.callCondenserApi<WithdrawRoute[]>(
      'get_withdraw_routes',
      [account, withdrawType]
    );
  }
}
