/**
 * @file Condenser API Class.
 * @author Peter James Taggart <code@pjtaggart.com>
 */

import { Client } from './Client';
import { CheckParams } from '../Helpers/Utils';
import { FinishedTrx } from '../Steem/Transaction';
import { Content } from '../Steem/Comment';
import { Account } from '../Steem/Account';
import { API } from './API';

/**
 * Condenser API class takes client or creates default
 */
export class CondenserAPI extends API {
  constructor(client?: Client) {
    super(client);
  }

  /**
   * gets number of steem accounts
   */
  public getAccountCount() {
    return this.client.callCondenserApi<number>('get_account_count');
  }

  /**
   * Gets all account history for account from start for limit items
   * @param account
   * @param start positive integer
   * @param limit 0 < integer <= 10,000
   */
  public getAccountHistory(account: string, start: number, limit: number) {
    CheckParams({ account, limit }, 10000);

    if (start < -1 || start === 0) {
      throw new Error('Start must be -1 or positive.');
    }

    if (start !== -1 && start < limit) {
      throw new Error('Start must be greater than limit.');
    }

    return this.client.callCondenserApi<[number, FinishedTrx]>(
      'get_account_history',
      [account, start, limit]
    );
  }

  /**
   * Gets account and reputation up to limit
   * @param limit 0 < integer <= 10,000
   * @param account optional account to start from (alphabetical)
   */
  public getAccountReputations(limit: number, account?: string) {
    CheckParams({ limit }, 10000);

    return this.client.callCondenserApi<{
      account: string;
      reputation: string;
    }>('get_account_reputations', [account, limit]);
  }

  /**
   * Returns array of accounts requested
   * @param accounts accounts to look up
   */
  public getAccounts(accounts: string[]) {
    CheckParams({ accounts });

    return this.client.callCondenserApi<Account[]>('get_accounts', [accounts]);
  }

  /**
   * Returns content posted by author at permlink
   * @param author
   * @param permlink
   */
  public getContent(author: string, permlink: string) {
    CheckParams({ author, permlink });

    return this.client.callCondenserApi<Content>('get_content', [
      author,
      permlink
    ]);
  }

  /**
   * Returns replies to post by author at permlink
   * @param author
   * @param permlink
   */
  public getContentReplies(author: string, permlink: string) {
    CheckParams({ author, permlink });

    return this.client.callCondenserApi<Content[]>('get_content_replies', [
      author,
      permlink
    ]);
  }

  /**
   * Looks up accounts by name
   * @param accounts
   */
  public lookupAccountNames(accounts: string[]) {
    CheckParams({ accounts });

    return this.client.callCondenserApi<Account[]>('lookup_account_names', [
      accounts
    ]);
  }

  /**
   * Looks up accounts starting at startName alphabetically and up to limit
   * @param startName
   * @param limit 0 < limit < 1,000
   */
  public lookupAccounts(startName: string, limit: number) {
    CheckParams({ startName, limit }, 1000);

    return this.client.callCondenserApi<Account[]>('lookup_accounts', [
      startName,
      limit
    ]);
  }
}
