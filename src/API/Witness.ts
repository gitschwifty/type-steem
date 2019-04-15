import { Client, RPCCall, RPCResult, APIType, ClientOptions } from './Client';

export class WitnessAPI extends Client {
  constructor(node?: string, options?: ClientOptions) {
    super(node, options);
  }

  public getActiveWitnesses() {
    return this.callApi(APIType.cond, 'get_active_witnesses');
  }

  public getWitnessByAccount(account: string) {
    if (!account) {
      throw new Error('Must pass in an account.');
    }

    return this.callApi(APIType.cond, 'get_witness_by_account', [account]);
  }

  public getWitnessCount() {
    return this.callApi(APIType.cond, 'get_witness_count');
  }

  public getWitnessSchedule() {
    return this.callApi(APIType.cond, 'get_witness_schedule');
  }

  public getWitnesses(index: number[]) {
    index.map(val => {
      if (val < 0) {
        throw new Error('Index must be positive.');
      }
    });

    return this.callApi(APIType.cond, 'get_witnesses', [index]);
  }

  public getWitnessesByVote(startName: string | null, limit: number) {
    if (limit < 1 || limit > 1000) {
      throw new Error('Limit must be positive and less than 1000.');
    }

    return this.callApi(APIType.cond, 'get_witnesses_by_vote', [
      startName,
      limit
    ]);
  }

  public lookupWitnessAccounts(startName: string, limit: number) {
    if (!startName) {
      throw new Error('Start name must be non-empty.');
    }

    if (limit < 1 || limit > 1000) {
      throw new Error('Limit must be positive and less than 1000.');
    }

    return this.callApi(APIType.cond, 'lookup_witness_accounts', [
      startName,
      limit
    ]);
  }
}
