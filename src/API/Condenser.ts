import { Client, RPCCall, RPCResult, APIType, ClientOptions } from './Client';
import { CheckParams } from '../Helpers/Utils';

export class CondenserAPI {
  private client: Client;
  constructor(client?: Client) {
    this.client = client ? client : new Client();
  }

  public getAccountCount() {
    return this.client.callCondenserApi('get_account_count');
  }

  public getAccountHistory(account: string, start: number, limit: number) {
    CheckParams({ account, limit }, 10000);

    if (start < -1 || start === 0) {
      throw new Error('Start must be -1 or positive.');
    }

    if (start !== -1 && start < limit) {
      throw new Error('Start must be greater than limit.');
    }

    return this.client.callCondenserApi('get_account_history', [
      account,
      start,
      limit
    ]);
  }

  public getAccountReputations(limit: number, account?: string) {
    CheckParams({ limit }, 10000);

    return this.client.callCondenserApi('get_account_reputations', [
      account,
      limit
    ]);
  }

  public getAccounts(accounts: string[]) {
    CheckParams({ accounts });

    return this.client.callCondenserApi('get_accounts', [accounts]);
  }

  public getContent(author: string, permlink: string) {
    CheckParams({ author, permlink });

    return this.client.callCondenserApi('get_content', [author, permlink]);
  }

  public getContentReplies(author: string, permlink: string) {
    CheckParams({ author, permlink });

    return this.client.callCondenserApi('get_content_replies', [
      author,
      permlink
    ]);
  }

  public lookupAccountNames(accounts: string[]) {
    CheckParams({ accounts });

    return this.client.callCondenserApi('lookup_account_names', [accounts]);
  }

  public lookupAccounts(startName: string, limit: number) {
    CheckParams({ startName, limit }, 1000);

    return this.client.callCondenserApi('lookup_accounts', [startName, limit]);
  }
}
