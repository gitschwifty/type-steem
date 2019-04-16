import { isArray } from 'util';

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

  protected checkParams(
    params: { [key: string]: string | number },
    max: number = 500
  ) {
    for (const key in params) {
      if (typeof params[key] === 'string') {
        if (!params[key]) {
          throw new Error('String parameter ' + key + ' cannot be empty.');
        }
      } else {
        if (key === 'limit' || key === 'blockNum') {
          if (params[key] < 1) {
            throw new Error('Parameter ' + key + ' must be >= 1.');
          }

          if (params[key] > max) {
            throw new Error('Parameter ' + key + ' must be <= ' + max + '.');
          }
        } else {
          if (params[key] < 0) {
            throw new Error('Parameter ' + key + ' must be >= 0.');
          }
        }
      }
    }
  }

  protected checkStringArrParam(params: { [key: string]: string[] }) {
    for (const key in params) {
      if (!params[key][0]) {
        throw new Error(
          'Must pass at least one non-empty string in array ' + key + '.'
        );
      }
    }
  }

  public callCondenserApi(
    method: string,
    params: unknown[] = []
  ): Promise<APIResult> {
    const request: RPCCall = {
      id: '0',
      method: 'call',
      jsonrpc: '2.0',
      params: [APIType.cond, method, params]
    };

    const opts: RequestInit = {
      body: JSON.stringify(request),
      cache: 'no-cache',
      headers: { 'User-Agent': 'type-steem' },
      method: 'POST',
      mode: 'cors'
    };

    return this.APIRetry(opts, 0);
  }

  public callAppbaseApi(
    api: APIType,
    method: string,
    params: unknown = {}
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

    return this.APIRetry(opts, 0);
  }

  /* istanbul ignore next */
  private APIRetry(opts: RequestInit, retry: number): Promise<APIResult> {
    // console.log('Retry #' + retry + ': ' + this.steemNode);
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
