import { Client, RPCCall, RPCResult, APIType, ClientOptions } from './Client';
import { CheckParams } from '../Helpers/Utils';

export class WitnessAPI {
  private client: Client;
  constructor(client?: Client) {
    this.client = client ? client : new Client();
  }

  public getActiveWitnesses() {
    return this.client.callCondenserApi('get_active_witnesses');
  }

  public getWitnessByAccount(account: string) {
    CheckParams({ account });

    return this.client.callCondenserApi('get_witness_by_account', [account]);
  }

  public getWitnessCount() {
    return this.client.callCondenserApi('get_witness_count');
  }

  public getWitnessSchedule() {
    return this.client.callCondenserApi('get_witness_schedule');
  }

  public getWitnesses(index: number[]) {
    index.map(val => {
      if (val < 0) {
        throw new Error('Witness index must be positive.');
      }
    });

    return this.client.callCondenserApi('get_witnesses', [index]);
  }

  public getWitnessesByVote(limit: number, startName?: string) {
    CheckParams({ limit }, 1000);

    return this.client.callCondenserApi('get_witnesses_by_vote', [
      startName,
      limit
    ]);
  }

  public lookupWitnessAccounts(startName: string, limit: number) {
    CheckParams({ startName, limit }, 1000);

    return this.client.callCondenserApi('lookup_witness_accounts', [
      startName,
      limit
    ]);
  }
}
