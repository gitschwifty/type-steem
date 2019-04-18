/**
 * @file Base Client Class.
 * @author Peter James Taggart <code@pjtaggart.com>
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
 * as well as retrying the API when calls fail. Constructor has optional node to use
 * and options object
 */
export class Client {
  public readonly steemNode: string;
  public options: ClientOptions;
  constructor(node?: string, options?: Partial<ClientOptions>) {
    if (node) {
      this.steemNode = node;
    } else {
      this.steemNode = 'https://api.steem.house';
      // this.steemNode = 'https://appbasetest.timcliff.com';
    }

    if (options) {
      this.options = {
        ...defaultOptions,
        ...options
      };
    } else {
      this.options = defaultOptions;
    }
  }

  /**
   * Calls the condenser api, with method and params, returning Promise<T>
   * @param method api method to call
   * @param params parameters, set by api classes
   */
  public callCondenserApi<T>(method: string, params: unknown[] = []) {
    return this.callAppbaseApi<T>(APIType.cond, method, params);
  }

  /**
   * Calls the api, with method and params, returning Promise<T>
   * @param api the api to call (e.g. rc_api, broadcast_api, etc.)
   * @param method api method to call
   * @param params parameters, set by api classes
   */
  public callAppbaseApi<T>(api: APIType, method: string, params: unknown = {}) {
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

    return this.APIRetry<T>(opts, 0);
  }

  /**
   * Retries a fetch using this.steemNode and opts a total of this.options.retries times
   * @param opts the fetch options to use
   * @param retry the current retry
   */
  private APIRetry<T>(opts: RequestInit, retry: number): Promise<T> {
    return new Promise((resolve, reject) => {
      fetch(this.steemNode, opts)
        .then(response => {
          return response.json();
        })
        .then(json => {
          if (json.result) {
            resolve(json.result as T);
          } /* istanbul ignore next */ else if (retry < this.options.retries) {
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
