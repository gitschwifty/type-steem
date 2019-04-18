/**
 * @file RC API Class.
 * @author Peter James Taggart <code@pjtaggart.com>
 */

import { Client, APIType } from './Client';
import { CheckParams } from '../Helpers/Utils';
import { RCAccount, RCParams, RCPool } from '../Steem/RC';
import { API } from './API';

/**
 * Resource Credits API Class takes a client or creates a default
 */
export class RCAPI extends API {
  constructor(client?: Client) {
    super(client);
  }

  /**
   * Gets the RCs of accounts
   * @param accounts
   */
  public findRCAccounts(accounts: string[]) {
    CheckParams({ accounts });

    return this.client.callAppbaseApi<{ rc_accounts: RCAccount[] }>(
      APIType.rc,
      'find_rc_accounts',
      {
        accounts
      }
    );
  }

  /**
   * Gets the current resource parameters (type subject to change with API)
   */
  public getResourceParams() {
    return this.client.callAppbaseApi<RCParams>(
      APIType.rc,
      'get_resource_params'
    );
  }

  /**
   * Gets the current resource pool (type subject to change with API)
   */
  public getResourcePool() {
    return this.client.callAppbaseApi<RCPool>(APIType.rc, 'get_resource_pool');
  }
}
