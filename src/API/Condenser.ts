import { Client, RPCCall, RPCResult, APIType, ClientOptions } from './Client';

export class CondenserAPI extends Client {
  constructor(node?: string, options?: ClientOptions) {
    super(node, options);
  }

  public getAccountCount() {
    return this.callApi(APIType.cond, 'get_account_count');
  }

  public getAccountHistory(account: string, start: number, limit: number) {
    if (account.length === 0) {
      throw new Error('Account name must be passed.');
    }

    if (start < -1) {
      throw new Error('Start index must be >= -1.');
    }

    if (limit < 1 || limit > 10000) {
      throw new Error('Limit must be positive and less than 10,000.');
    }

    if (start < limit) {
      throw new Error('Start must be greater than limit.');
    }

    return this.callApi(APIType.cond, 'get_account_history', [
      account,
      start,
      limit
    ]);
  }

  public getAccountReputations(account: string, limit: number) {
    if (limit < 1 || limit > 1000) {
      throw new Error('Limit must be positive and less than 1,000.');
    }

    return this.callApi(APIType.cond, 'get_account_reputations', [
      account,
      limit
    ]);
  }

  public getAccounts(accounts: string[]) {
    if (accounts.length === 0 || accounts[0].length === 0) {
      throw new Error('Must pass at least one account name.');
    }

    return this.callApi(APIType.cond, 'get_accounts', [accounts]);
  }

  public getContent(author: string, permlink: string) {
    if (author.length === 0 || permlink.length === 0) {
      throw new Error('Author and permlink must be strings.');
    }

    return this.callApi(APIType.cond, 'get_content', [author, permlink]);
  }

  public getContentReplies(author: string, permlink: string) {
    if (author.length === 0 || permlink.length === 0) {
      throw new Error('Author and permlink must be strings.');
    }

    return this.callApi(APIType.cond, 'get_content_replies', [
      author,
      permlink
    ]);
  }

  public lookupAccountNames(accounts: string[]) {
    if (accounts.length === 0 || accounts[0].length === 0) {
      throw new Error('Must pass at least one account name.');
    }

    return this.callApi(APIType.cond, 'lookup_account_names', [accounts]);
  }

  public lookupAccounts(startName: string, limit: number) {
    if (!startName) {
      throw new Error('Start name must be non-empty.');
    }

    if (limit < 1 || limit > 1000) {
      throw new Error('Limit must be positive and less than 1000.');
    }

    return this.callApi(APIType.cond, 'lookup_accounts', [startName, limit]);
  }
}
