import { Client, RPCCall, RPCResult, APIType, ClientOptions } from './Client';
import { CheckParams } from '../Helpers/Utils';
import { WitnessProps } from '../Steem/Witness';
import { PriceQuote } from './Market';

export interface Witness {
  available_witness_account_subsidies: number;
  created: string;
  hardfork_time_vote: string;
  hardfork_version_vote: string;
  id: number;
  last_aslot: number;
  last_confirmed_block_num: number;
  last_sbd_exchange_update: string;
  last_work: string;
  owner: string;
  pow_worker: number;
  props: WitnessProps;
  running_version: string;
  sbd_exchange_rate: PriceQuote;
  signing_key: string;
  total_missed: number;
  url: string;
  virtual_last_update: string;
  virtual_position: string;
  virtual_scheduled_time: string;
  votes: string;
}

interface AccountSubsidyRound {
  budget_per_time_unit: number;
  decay_params: {
    decay_per_time_unit: number;
    decay_per_time_unit_denom_shift: number;
  };
  max_pool_size: number;
  min_decay: number;
  pool_eq: number;
  resource_unit: number;
}

export interface WitnessSchedule {
  account_subsidy_rd: AccountSubsidyRound;
  account_subsidy_witness_rd: AccountSubsidyRound;
  current_shuffled_witnesses: string[];
  current_virtual_time: string;
  elected_weight: number;
  hardfork_required_witnesses: number;
  id: number;
  majority_version: string;
  max_miner_witnesses: number;
  max_runner_witnesses: number;
  max_voted_witnesses: number;
  median_props: WitnessProps;
  min_witness_account_subsidy_decay: number;
  miner_weight: number;
  next_shuffle_block_num: number;
  num_scheduled_witnesses: number;
  timeshare_weight: number;
  witness_pay_normalization_factor: number;
}

export class WitnessAPI {
  private client: Client;
  constructor(client?: Client) {
    this.client = client ? client : new Client();
  }

  public getActiveWitnesses() {
    return this.client.callCondenserApi<string[]>('get_active_witnesses');
  }

  public getWitnessByAccount(account: string) {
    CheckParams({ account });

    return this.client.callCondenserApi<Witness>('get_witness_by_account', [
      account
    ]);
  }

  public getWitnessCount() {
    return this.client.callCondenserApi<number>('get_witness_count');
  }

  public getWitnessSchedule() {
    return this.client.callCondenserApi<WitnessSchedule>(
      'get_witness_schedule'
    );
  }

  public getWitnesses(index: number[]) {
    index.map(val => {
      if (val < 0) {
        throw new Error('Witness index must be positive.');
      }
    });

    return this.client.callCondenserApi<Witness[]>('get_witnesses', [index]);
  }

  public getWitnessesByVote(limit: number, startName?: string) {
    CheckParams({ limit }, 1000);

    return this.client.callCondenserApi<Witness[]>('get_witnesses_by_vote', [
      startName,
      limit
    ]);
  }

  public lookupWitnessAccounts(startName: string, limit: number) {
    CheckParams({ startName, limit }, 1000);

    return this.client.callCondenserApi<Witness[]>('lookup_witness_accounts', [
      startName,
      limit
    ]);
  }
}
