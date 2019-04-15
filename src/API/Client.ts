export interface RPCCall {
  id: number | string;
  method: 'call';
  jsonrpc: '2.0';
  params: unknown[];
}

export interface RPCResult {
  id: number | string;
  jsonrpc: string;
  result: APIResult;
}

export type APIResult =
  | number
  | string
  | GenericObject
  | GenericObject[]
  | number[]
  | string[];

export interface GenericObject {
  [key: string]: string | number | GenericObject | GenericObject[];
}

export enum APIType {
  cond = 'condenser_api',
  db = 'database_api',
  follow = 'follow_api',
  market = 'market_history_api',
  rc = 'rc_api',
  rep = 'reputation_api',
  tags = 'tags_api',
  block = 'block_api',
  witness = 'witness_api'
}

export interface ClientOptions {
  retries: number;
}

const defaultOptions: ClientOptions = {
  retries: 3
};

export class Client {
  private steemNode: string;
  private options: ClientOptions;
  constructor(node?: string, options?: ClientOptions) {
    if (node) {
      this.steemNode = node;
    } else {
      this.steemNode = 'https://api.steem.house';
      // this.steemNode = 'https://appbasetest.timcliff.com';
    }

    if (options) {
      this.options = options;
      this.options = {
        ...this.options,
        ...defaultOptions
      };
    } else {
      this.options = defaultOptions;
    }
  }

  public callApi(
    api: APIType,
    method: string,
    params: unknown[] = []
  ): Promise<APIResult> {
    const request: RPCCall = {
      id: '0',
      method: 'call',
      jsonrpc: '2.0',
      params: [api, method, params]
    };

    const opts: RequestInit = {
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
          /* istanbul ignore else */
          if (json.result) {
            resolve(json.result);
          } else {
            resolve(this.APIRetry(opts, 1));
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  /* istanbul ignore next */
  private APIRetry(opts: RequestInit, retry: number): Promise<APIResult> {
    console.log('Retry #' + retry + ': ' + this.steemNode);
    return new Promise((resolve, reject) => {
      fetch(this.steemNode, opts)
        .then(response => {
          return response.json();
        })
        .then(json => {
          if (json.result) {
            resolve(json.result);
          } else if (retry < this.options.retries) {
            resolve(this.APIRetry(opts, retry + 1));
          } else {
            reject(json.error);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
