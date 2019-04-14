interface RPCCall {
  id: number | string;
  method: 'call';
  jsonrpc: '2.0';
  params: unknown[];
}

interface RPCResult {
  id: number | string;
  jsonrpc: string;
  result:
    | number
    | string
    | Array<{ [key: string]: number | string }>
    | number[]
    | string[];
}

export class Client {
  private steemNode: string;
  private options: unknown;
  constructor(node?: string, options?: unknown) {
    if (node) {
      this.steemNode = node;
    } else {
      this.steemNode = 'https://api.steem.house';
    }

    /* if (options) {
      this.options = options;
    } */
  }

  public callApi(
    api: string,
    method: string,
    params: unknown[] = []
  ): Promise<RPCResult> {
    const request: RPCCall = {
      id: '0',
      method: 'call',
      jsonrpc: '2.0',
      params: [api, method, params]
    };

    const opts: any = {
      body: JSON.stringify(request),
      cache: 'no-cache',
      headers: { 'User-Agent': 'type-steem' },
      method: 'POST',
      mode: 'cors'
    };

    return new Promise((resolve, reject) => {
      fetch(this.steemNode, opts)
        .then(response => {
          return response.json();
        })
        .then(json => {
          resolve(json.result);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public getAccountCount() {
    return this.callApi('condenser_api', 'get_account_count');
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

    return this.callApi('condenser_api', 'get_account_history', [
      account,
      start,
      limit
    ]);
  }

  public getAccountReputations(account: string, limit: number) {
    if (limit < 1 || limit > 1000) {
      throw new Error('Limit must be positive and less than 1,000.');
    }

    return this.callApi('condenser_api', 'get_account_reputations', [
      account,
      limit
    ]);
  }

  public getAccounts(accounts: string[]) {
    return this.callApi('condenser_api', 'get_accounts', [accounts]);
  }
}
