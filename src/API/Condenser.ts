import { Client, RPCCall, RPCResult, APIType, ClientOptions } from './Client';

export class CondenserAPI extends Client {
  constructor(node?: string, options?: ClientOptions) {
    super(node, options);
  }

  public getAccountCount() {
    return this.callCondenserApi('get_account_count');
  }

  public getAccountHistory(account: string, start: number, limit: number) {
    this.checkParams({ account, start, limit }, 10000);

    if (start < limit) {
      throw new Error('Start must be greater than limit.');
    }

    return this.callCondenserApi('get_account_history', [
      account,
      start,
      limit
    ]);
  }

  public getAccountReputations(limit: number, account?: string) {
    this.checkParams({ limit }, 10000);

    return this.callCondenserApi('get_account_reputations', [account, limit]);
  }

  public getAccounts(accounts: string[]) {
    this.checkStringArrParam({ accounts });

    return this.callCondenserApi('get_accounts', [accounts]);
  }

  public getContent(author: string, permlink: string) {
    this.checkParams({ author, permlink });

    return this.callCondenserApi('get_content', [author, permlink]);
  }

  public getContentReplies(author: string, permlink: string) {
    this.checkParams({ author, permlink });

    return this.callCondenserApi('get_content_replies', [author, permlink]);
  }

  public lookupAccountNames(accounts: string[]) {
    this.checkStringArrParam({ accounts });

    return this.callCondenserApi('lookup_account_names', [accounts]);
  }

  public lookupAccounts(startName: string, limit: number) {
    this.checkParams({ startName, limit }, 1000);

    return this.callCondenserApi('lookup_accounts', [startName, limit]);
  }
}
