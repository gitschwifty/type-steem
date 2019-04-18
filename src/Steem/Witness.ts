import { PriceQuote } from './Market';

export interface WitnessProps {
  account_creation_fee: string;
  account_subsidy_budget: number;
  account_subsidy_decay: number;
  maximum_block_size: number;
  sbd_interest_rate: string;
}

export interface WitnessAccountProperties extends WitnessProps {
  url: string;
  new_signing_key: string;
}

export interface WitnessProperties extends WitnessAccountProperties {
  sbd_exchange_rate: {
    base: string;
    quote: string;
  };
}

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
