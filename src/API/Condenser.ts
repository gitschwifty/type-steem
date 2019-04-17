import { Client, RPCCall, RPCResult, APIType, ClientOptions } from './Client';
import { CheckParams } from '../Helpers/Utils';
import { FinishedTrx } from '../Steem/Transaction';
import { Key } from '../Steem/Key';
import { ActiveVote } from './Blog';

export interface Account {
  active: Key;
  balance: string;
  can_vote: boolean;
  comment_count: number;
  created: string;
  curation_rewards: number;
  delegated_vesting_shares: string;
  guest_bloggers: any[];
  id: number;
  json_metadata: string;
  last_account_recovery: string;
  last_account_update: string;
  last_owner_update: string;
  last_post: string;
  last_root_post: string;
  last_vote_time: string;
  lifetime_vote_count: number;
  market_history: any[];
  memo_key: string;
  mined: boolean;
  name: string;
  next_vesting_withdrawal: string;
  other_history: any[];
  owner: Key;
  post_count: number;
  post_history: any[];
  posting: Key;
  posting_rewards: number;
  proxied_vsf_votes: number[];
  proxy: string;
  received_vesting_shares: string;
  recovery_account: string;
  reputation: string;
  reset_account: string;
  reward_sbd_balance: string;
  reward_steem_balance: string;
  reward_vesting_balance: string;
  reward_vesting_steem: string;
  savings_balance: string;
  savings_sbd_balance: string;
  savings_sbd_last_interest_payment: string;
  savings_sbd_seconds: string;
  savings_sbd_seconds_last_update: string;
  savings_withdraw_requests: number;
  sbd_balance: string;
  sbd_last_interest_payment: string;
  sbd_seconds: string;
  sbd_seconds_last_update: string;
  tags_usage: any[];
  to_withdraw: number;
  transfer_history: any[];
  vesting_balance: string;
  vesting_shares: string;
  vesting_withdraw_rate: string;
  vote_history: any[];
  voting_power: number;
  withdraw_routes: number;
  withdrawn: number;
  witness_votes: any[];
  witnesses_voted_for: number;
}

export interface Content {
  abs_rshares: number;
  active: string;
  active_votes: ActiveVote[];
  allow_curation_rewards: boolean;
  allow_replies: boolean;
  allow_votes: boolean;
  author: string;
  author_reputation: number;
  author_rewards: number;
  beneficiaries: any[];
  body: string;
  body_length: number;
  cashout_time: string;
  category: string;
  children: number;
  children_abs_rshares: number;
  created: string;
  curator_payout_value: string;
  depth: number;
  id: number;
  json_metadata: string;
  last_payout: string;
  last_update: string;
  max_accepted_payout: string;
  max_cashout_time: string;
  net_rshares: number;
  net_votes: number;
  parent_author: string;
  parent_permlink: string;
  pending_payout_value: string;
  percent_steem_dollars: number;
  permlink: string;
  promoted: string;
  reblogged_by: any[];
  replies: any[];
  reward_weight: number;
  root_author: string;
  root_permlink: string;
  root_title: string;
  title: string;
  total_payout_value: string;
  total_pending_payout_value: string;
  total_vote_weight: number;
  url: string;
  vote_rshares: number;
}

export class CondenserAPI {
  private client: Client;
  constructor(client?: Client) {
    this.client = client ? client : new Client();
  }

  public getAccountCount() {
    return this.client.callCondenserApi<number>('get_account_count');
  }

  public getAccountHistory(account: string, start: number, limit: number) {
    CheckParams({ account, limit }, 10000);

    if (start < -1 || start === 0) {
      throw new Error('Start must be -1 or positive.');
    }

    if (start !== -1 && start < limit) {
      throw new Error('Start must be greater than limit.');
    }

    return this.client.callCondenserApi<[number, FinishedTrx]>(
      'get_account_history',
      [account, start, limit]
    );
  }

  public getAccountReputations(limit: number, account?: string) {
    CheckParams({ limit }, 10000);

    return this.client.callCondenserApi<{
      account: string;
      reputation: string;
    }>('get_account_reputations', [account, limit]);
  }

  public getAccounts(accounts: string[]) {
    CheckParams({ accounts });

    return this.client.callCondenserApi<Account[]>('get_accounts', [accounts]);
  }

  public getContent(author: string, permlink: string) {
    CheckParams({ author, permlink });

    return this.client.callCondenserApi<Content>('get_content', [
      author,
      permlink
    ]);
  }

  public getContentReplies(author: string, permlink: string) {
    CheckParams({ author, permlink });

    return this.client.callCondenserApi<Content[]>('get_content_replies', [
      author,
      permlink
    ]);
  }

  public lookupAccountNames(accounts: string[]) {
    CheckParams({ accounts });

    return this.client.callCondenserApi<Account[]>('lookup_account_names', [
      accounts
    ]);
  }

  public lookupAccounts(startName: string, limit: number) {
    CheckParams({ startName, limit }, 1000);

    return this.client.callCondenserApi<Account[]>('lookup_accounts', [
      startName,
      limit
    ]);
  }
}
