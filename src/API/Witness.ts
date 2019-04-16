import { Client, RPCCall, RPCResult, APIType, ClientOptions } from './Client';

export class WitnessAPI extends Client {
  constructor(node?: string, options?: ClientOptions) {
    super(node, options);
  }

  public getActiveWitnesses() {
    return this.callCondenserApi('get_active_witnesses');
  }

  public getWitnessByAccount(account: string) {
    this.checkParams({ account });

    return this.callCondenserApi('get_witness_by_account', [account]);
  }

  public getWitnessCount() {
    return this.callCondenserApi('get_witness_count');
  }

  public getWitnessSchedule() {
    return this.callCondenserApi('get_witness_schedule');
  }

  public getWitnesses(index: number[]) {
    index.map(val => {
      if (val < 0) {
        throw new Error('Witness index must be positive.');
      }
    });

    return this.callCondenserApi('get_witnesses', [index]);
  }

  public getWitnessesByVote(limit: number, startName?: string) {
    this.checkParams({ limit }, 1000);

    return this.callCondenserApi('get_witnesses_by_vote', [startName, limit]);
  }

  public lookupWitnessAccounts(startName: string, limit: number) {
    this.checkParams({ startName, limit }, 1000);

    return this.callCondenserApi('lookup_witness_accounts', [startName, limit]);
  }
}
