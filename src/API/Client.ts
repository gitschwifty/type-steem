/**
 * @file Base Client Class.
 * @author Peter James Taggart <staggarts@gmail.com>
 */

/**
 * Interface for calling the API (internal)
 */
export interface RPCCall {
  id: number | string;
  method: 'call';
  jsonrpc: '2.0';
  params: unknown[];
}

/**
 * Interface for API result (internal).
 */
export interface RPCResult {
  id: number | string;
  jsonrpc: string;
  result: APIResult;
}

/**
 * Type for API Result (external).
 */
export type APIResult =
  | number
  | string
  | GenericObject
  | GenericObject[]
  | number[]
  | string[];

/**
 * Generic object interface (I don't need this).
 */
export interface GenericObject {
  [key: string]: string | number | GenericObject | GenericObject[];
}

/**
 * Possible APIs to call.
 */
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

/**
 * Options for the Client.
 */
export interface ClientOptions {
  retries: number;
}

const defaultOptions: ClientOptions = {
  retries: 3
};

/**
 * Client class provides all API call functionality, returning a Promise with RPCResult,
 * as well as retrying the API when calls fail.
 */
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

  public callCondenserApi(
    method: string,
    params: unknown[] = []
  ): Promise<APIResult> {
    return this.callAppbaseApi(APIType.cond, method, params);
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
