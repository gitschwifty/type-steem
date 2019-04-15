import { Asset } from './Asset';
import { Key } from './Key';
import { WitnessProperties } from './Witness';

type OperationType =
  | 'vote'
  | 'comment'
  | 'transfer'
  | 'transfer_to_vesting'
  | 'withdraw_vesting'
  | 'limit_order_create'
  | 'limit_order_cancel'
  | 'price'
  | 'feed_publish'
  | 'convert'
  | 'account_create'
  | 'create_claimed_account'
  | 'claim_account'
  | 'witness_set_properties'
  | 'account_update'
  | 'report_over_production'
  | 'witness_update'
  | 'account_witness_vote'
  | 'account_witness_proxy'
  | 'pow'
  | 'custom'
  | 'delete_comment'
  | 'custom_json'
  | 'comment_options'
  | 'set_withdraw_vesting_route'
  | 'limit_order_create2'
  | 'challenge_authority'
  | 'prove_authority'
  | 'request_account_recovery'
  | 'recover_account'
  | 'change_recovery_account'
  | 'escrow_transfer'
  | 'escrow_dispute'
  | 'escrow_release'
  | 'pow2'
  | 'escrow_approve'
  | 'transfer_to_savings'
  | 'transfer_from_savings'
  | 'cancel_transfer_from_savings'
  | 'custom_binary'
  | 'decline_voting_rights'
  | 'reset_account'
  | 'set_reset_account'
  | 'claim_reward_balance'
  | 'delegate_vesting_shares'
  | 'account_create_with_delegation';

type VirtualOperationType =
  | 'fill_convert_request'
  | 'author_reward'
  | 'curation_reward'
  | 'comment_reward'
  | 'liquidity_reward'
  | 'interest'
  | 'fill_vesting_withdraw'
  | 'fill_order'
  | 'shutdown_witness'
  | 'fill_transfer_from_savings'
  | 'hardfork'
  | 'comment_payout_update'
  | 'return_vesting_delegation'
  | 'comment_benefactor_reward'
  | 'producer_reward';

export interface RealOperation {
  0: OperationType;
  1: { [key: string]: unknown };
}

export interface VirtualOperation {
  0: VirtualOperationType;
  1: { [key: string]: unknown };
}

export interface VoteOperation extends RealOperation {
  0: 'vote';
  1: {
    voter: string;
    author: string;
    permlink: string;
    weight: number;
  };
}

export interface CommentOperation extends RealOperation {
  0: 'comment';
  1: {
    parent_author: string;
    parent_permlink: string;
    author: string;
    permlink: string;
    title: string;
    body: string;
    json_metadata: string;
  };
}

export interface TransferOperation extends RealOperation {
  0: 'transfer';
  1: {
    from: string;
    to: string;
    amount: Asset;
    memo: string;
  };
}

export interface TransferToVestingOperation extends RealOperation {
  0: 'transfer_to_vesting';
  1: {
    from: string;
    to: string;
    amount: Asset;
  };
}

export interface WithdrawVestingOperation extends RealOperation {
  0: 'withdraw_vesting';
  1: {
    account: string;
    vesting_shares: Asset;
  };
}

export interface CreateLimitOrderOperation extends RealOperation {
  0: 'limit_order_create';
  1: {
    owner: string;
    orderid: number;
    amount_to_sell: Asset;
    min_to_receive: Asset;
    fill_or_kill: boolean;
    expiration: Date;
  };
}

export interface CancelLimitOrderOperation extends RealOperation {
  0: 'limit_order_cancel';
  1: {
    owner: string;
    orderid: number;
  };
}

export interface PriceOperation extends RealOperation {
  0: 'price';
  1: {
    base: Asset;
    quote: Asset;
  };
}

export interface PublishFeedOperation extends RealOperation {
  0: 'feed_publish';
  1: {
    publisher: string;
    exchange_rate: {
      base: Asset;
      quote: Asset;
    };
  };
}

export interface ConvertOperation extends RealOperation {
  0: 'convert';
  1: {
    owner: string;
    requestid: number;
    amount: Asset;
  };
}

export interface CreateAccountOperation extends RealOperation {
  0: 'account_create';
  1: {
    fee: Asset;
    creator: string;
    new_account_name: string;
    owner: Key;
    active: Key;
    posting: Key;
    memo_key: string;
    json_metadata: string;
  };
}

export interface CreateClaimedAccountOperation extends RealOperation {
  0: 'create_claimed_account';
  1: {
    creator: string;
    new_account_name: string;
    owner: Key;
    active: Key;
    posting: Key;
    memo_key: string;
    json_metadata: string;
  };
}

export interface ClaimAccountOperation extends RealOperation {
  0: 'claim_account';
  1: {
    fee: Asset;
    creator: string;
    extensions: unknown[];
  };
}

export interface SetWitnessPropertiesOperation extends RealOperation {
  0: 'witness_set_properties';
  1: {
    owner: string;
    props: WitnessProperties;
    extensions: unknown[];
  };
}

export interface UpdateAccountOperation extends RealOperation {
  0: 'account_update';
  1: {
    account: string;
    posting: Key;
    owner: Key;
    active: Key;
    memo_key: string;
    json_metadata: string;
  };
}

export interface ReportOverproductionOperation extends RealOperation {
  0: 'report_over_production';
  1: {
    reporter: string;
    first_block: number;
    second_block: number;
  };
}

export interface UpdateWitnessOperation extends RealOperation {
  0: 'witness_update';
  1: {
    owner: string;
    url: string;
    block_signing_key: string;
    props: {
      account_creation_fee: Asset;
      maximum_block_size: number;
      sbd_interest_rate: number;
    };
    fee: Asset;
  };
}

export interface WitnessVoteOperation extends RealOperation {
  0: 'account_witness_vote';
  1: {
    account: string;
    witness: string;
    approve: boolean;
  };
}

export interface WitnessProxyOperation extends RealOperation {
  0: 'account_witness_proxy';
  1: {
    account: string;
    proxy: string;
  };
}

export interface PowOperation extends RealOperation {
  0: 'pow';
  1: {
    worker_account: string;
    block_id: string;
    nonce: number;
    work: {
      worker: string;
      input: string;
      signature: string;
      work: string;
    };
    props: {
      account_creation_fee: Asset;
      maximum_block_size: number;
      sbd_interest_rate: number;
    };
  };
}

export interface CustomOperation extends RealOperation {
  0: 'custom';
  1: {
    required_auths: string[];
    id: number;
    data: string;
  };
}

export interface DeleteCommentOperation extends RealOperation {
  0: 'delete_comment';
  1: {
    author: string;
    permlink: string;
  };
}

export interface CustomJsonOperation extends RealOperation {
  0: 'custom';
  1: {
    required_auths: string[];
    required_posting_auths: string[];
    id: 'follow' | 'reblog' | 'witness';
    json: string;
  };
}

export interface CommentOptionsOperation extends RealOperation {
  0: 'comment_options';
  1: {
    author: string;
    permlink: string;
    max_accepted_payout: Asset;
    percent_steem_dollars: number;
    allow_votes: boolean;
    allow_curation_rewards: boolean;
    extensions: unknown[];
  };
}

export interface SetWithdrawVestingRouteOperation extends RealOperation {
  0: 'set_withdraw_vesting_route';
  1: {
    from_account: string;
    to_account: string;
    percent: number;
    auto_vest: boolean;
  };
}

export interface CreateLimitOrderTwoOperation extends RealOperation {
  0: 'limit_order_create2';
  1: {
    owner: string;
    orderid: number;
    amount_to_sell: Asset;
    exchange_rate: {
      base: Asset;
      quote: Asset;
    };
    fill_or_kill: boolean;
    expiration: Date;
  };
}

export interface ChallengeAuthorityOperation extends RealOperation {
  0: 'challenge_authority';
  1: {
    challenger: string;
    challenged: string;
    require_owner: string[];
  };
}

export interface ProveAuthorityOperation extends RealOperation {
  0: 'prove_authority';
  1: {
    challenged: string;
    require_owner: string[];
  };
}

export interface RequestAccountRecoveryOperation extends RealOperation {
  0: 'request_account_recovery';
  1: {
    recovery_account: string;
    account_to_recover: string;
    new_owner_authority: Key;
    extensions: unknown[];
  };
}

export interface RecoverAccountOperation extends RealOperation {
  0: 'recover_account';
  1: {
    account_to_recover: string;
    new_owner_authority: Key;
    recent_owner_authority: Key;
    extensions: unknown[];
  };
}

export interface ChangeRecoveryAccountOperation extends RealOperation {
  0: 'change_recovery_account';
  1: {
    account_to_recover: string;
    new_recovery_account: string;
    extensions: unknown[];
  };
}

export interface EscrowTransferOperation extends RealOperation {
  0: 'escrow_transfer';
  1: {
    from: string;
    to: string;
    sbd_amount: Asset;
    steem_amount: Asset;
    escrow_id: number;
    agent: string;
    fee: Asset;
    json_meta: string;
    ratification_deadline: string;
    escrow_expiration: string;
  };
}

export interface EscrowDisputeOperation extends RealOperation {
  0: 'escrow_dispute';
  1: {
    from: string;
    to: string;
    agent: string;
    who: string;
    escrow_id: number;
  };
}

export interface EscrowReleaseOperation extends RealOperation {
  0: 'escrow_release';
  1: {
    from: string;
    to: string;
    agent: string;
    who: string;
    receiver: string;
    escrow_id: number;
    sbd_amount: Asset;
    steem_amount: Asset;
  };
}

export interface PowTwoOperation extends RealOperation {
  0: 'pow2';
  1: {
    work: Array<{
      0: 0;
      1: {
        input: { worker_account: string; prev_block: string; nonce: string };
        pow_summary: number;
      };
    }>;
    props: {
      account_creation_fee: Asset;
      maximum_block_size: number;
      sbd_interest_rate: number;
    };
  };
}

export interface EscrowApproveOperation extends RealOperation {
  0: 'escrow_approve';
  1: {
    from: string;
    to: string;
    agent: string;
    who: string;
    escrow_id: number;
    approve: boolean;
  };
}

export interface TransferToSavingsOperation extends RealOperation {
  0: 'transfer_to_savings';
  1: {
    from: string;
    to: string;
    amount: Asset;
    memo: string;
  };
}

export interface TransferFromSavingsOperation extends RealOperation {
  0: 'transfer_from_savings';
  1: {
    from: string;
    request_id: number;
    to: string;
    amount: Asset;
    memo: string;
  };
}

export interface CancelTransferFromSavingsOperation extends RealOperation {
  0: 'cancel_transfer_from_savings';
  1: {
    from: string;
    request_id: number;
  };
}

export interface CustomBinaryOperation extends RealOperation {
  0: 'custom_binary';
  1: {
    id: string;
    data: string;
  };
}

export interface DeclineVotingRightsOperation extends RealOperation {
  0: 'decline_voting_rights';
  1: {
    account: string;
    decline: boolean;
  };
}

export interface ResetAccountOperation extends RealOperation {
  0: 'reset_account';
  1: {
    reset_account: string;
    account_to_reset: string;
    new_owner_authority: Key;
  };
}

export interface SetResetAccountOperation extends RealOperation {
  0: 'set_reset_account';
  1: {
    account: string;
    current_reset_account: string;
    reset_account: string;
  };
}

export interface ClaimRewardBalanceOperation extends RealOperation {
  0: 'claim_reward_balance';
  1: {
    account: string;
    reward_steem: Asset;
    reward_sbd: Asset;
    reward_vests: Asset;
  };
}

export interface DelegateVestingSharesOperation extends RealOperation {
  0: 'delegate_vesting_shares';
  1: {
    delegator: string;
    delegatee: string;
    vesting_shares: Asset;
  };
}

export interface CreateAccountWithDelegationOperation extends RealOperation {
  0: 'account_create_with_delegation';
  1: {
    fee: Asset;
    delegation: Asset;
    creator: string;
    new_account_name: string;
    owner: Key;
    active: Key;
    posting: Key;
    memo_key: string;
    json_metadata: string;
    extensions: unknown[];
  };
}

export interface FillConvertRequestOperation extends VirtualOperation {
  0: 'fill_convert_request';
  1: {
    owner: string;
    requestid: number;
    amount_in: Asset;
    amount_out: Asset;
  };
}

export interface AuthorRewardOperation extends VirtualOperation {
  0: 'author_reward';
  1: {
    author: string;
    permlink: string;
    sbd_payout: Asset;
    steem_payout: Asset;
    vesting_payout: Asset;
  };
}

export interface CurationRewardOperation extends VirtualOperation {
  0: 'curation_reward';
  1: {
    curator: string;
    reward: Asset;
    comment_author: string;
    comment_permlink: string;
  };
}

export interface CommentRewardOperation extends VirtualOperation {
  0: 'comment_reward';
  1: {
    author: string;
    permlink: string;
    payout: Asset;
  };
}

export interface LiquidityRewardOperation extends VirtualOperation {
  0: 'liquidity_reward';
  1: {
    owner: string;
    payout: Asset;
  };
}

export interface InterestOperation extends VirtualOperation {
  0: 'interest';
  1: {
    owner: string;
    interest: string;
  };
}

export interface FillVestingWithdrawOperation extends VirtualOperation {
  0: 'fill_vesting_withdraw';
  1: {
    from_account: string;
    to_account: string;
    withdrawn: string;
    deposited: string;
  };
}

export interface FillOrderOperation extends VirtualOperation {
  0: 'fill_order';
  1: {
    current_owner: string;
    current_orderid: number;
    current_pays: string;
    open_owner: string;
    open_orderid: number;
    open_pays: string;
  };
}

export interface ShutdownWitnessOperation extends VirtualOperation {
  0: 'shutdown_witness';
  1: {
    owner: string;
  };
}

export interface FillTransferFromSavingsOperation extends VirtualOperation {
  0: 'fill_transfer_from_savings';
  1: {
    from: string;
    to: string;
    amount: Asset;
    requestid: number;
    memo: string;
  };
}

export interface HardforkOperation extends VirtualOperation {
  0: 'hardfork';
  1: {
    hardfork_id: number;
  };
}

export interface CommentPayoutUpdateOperation extends VirtualOperation {
  0: 'comment_payout_update';
  1: {
    author: string;
    permlink: string;
  };
}

export interface ReturnVestingDelegationOperation extends VirtualOperation {
  0: 'return_vesting_delegation';
  1: {
    account: string;
    vesting_shares: Asset;
  };
}

export interface CommentBenefactorRewardOperation extends VirtualOperation {
  0: 'comment_benefactor_reward';
  1: {
    benefactor: string;
    author: string;
    permlink: string;
    reward: Asset;
  };
}

export interface ProducerRewardOperation extends VirtualOperation {
  0: 'producer_reward';
  1: {
    producer: string;
    vesting_shares: string;
  };
}

export type Operation = RealOperation | VirtualOperation;
