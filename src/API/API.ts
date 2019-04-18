/**
 * @file API Base Class, provides generic methods for all APIs.
 * @author Peter James Taggart <code@pjtaggart.com>
 */

import { Client } from './Client';

/**
 * Base API Class implements constructor, and client access functions
 */
export class API {
  protected client: Client;
  constructor(client?: Client) {
    this.client = client ? client : new Client();
  }

  /**
   * returns the current steem node
   */
  public getNode() {
    return this.client.steemNode;
  }

  /**
   * returns the current client options
   */
  public getOptions() {
    return this.client.options;
  }

  /**
   * changes the number of retries for each call
   */
  public changeRetries(retries: number) {
    if (retries < 0) {
      throw new Error('Retries cannot be negative.');
    }
    this.client.options = { ...this.client.options, retries };
  }
}
