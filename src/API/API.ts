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

  public getNode() {
    return this.client.steemNode;
  }

  public getOptions() {
    return this.client.options;
  }

  public changeRetries(retries: number) {
    if (retries < 0) {
      throw new Error('Retries cannot be negative.');
    }
    this.client.options = { ...this.client.options, retries };
  }
}
