import { Asset } from './Asset';

export interface ChainProperties {
  account_creation_fee: string;
  maximum_block_size: number;
  sbd_interest_rate: number;
  account_subsidy_limit: number;
}

export interface ChainConfig {
  IS_TEST_NET: boolean;
  STEEM_ENABLE_SMT: boolean;
  SBD_SYMBOL?: null;
  STEEM_INITIAL_VOTE_POWER_RATE: number;
  STEEM_REDUCED_VOTE_POWER_RATE: number;
  STEEM_100_PERCENT: number;
  STEEM_1_PERCENT: number;
  STEEM_ACCOUNT_RECOVERY_REQUEST_EXPIRATION_PERIOD: string;
  STEEM_ACTIVE_CHALLENGE_COOLDOWN: string;
  STEEM_ACTIVE_CHALLENGE_FEE: Asset;
  STEEM_ADDRESS_PREFIX: string;
  STEEM_APR_PERCENT_MULTIPLY_PER_BLOCK: string;
  STEEM_APR_PERCENT_MULTIPLY_PER_HOUR: string;
  STEEM_APR_PERCENT_MULTIPLY_PER_ROUND: string;
  STEEM_APR_PERCENT_SHIFT_PER_BLOCK: number;
  STEEM_APR_PERCENT_SHIFT_PER_HOUR: number;
  STEEM_APR_PERCENT_SHIFT_PER_ROUND: number;
  STEEM_BANDWIDTH_AVERAGE_WINDOW_SECONDS: number;
  STEEM_BANDWIDTH_PRECISION: number;
  STEEM_BLOCKCHAIN_PRECISION: number;
  STEEM_BLOCKCHAIN_PRECISION_DIGITS: number;
  STEEM_BLOCKCHAIN_HARDFORK_VERSION: string;
  STEEM_BLOCKCHAIN_VERSION: string;
  STEEM_BLOCK_INTERVAL: number;
  STEEM_BLOCKS_PER_DAY: number;
  STEEM_BLOCKS_PER_HOUR: number;
  STEEM_BLOCKS_PER_YEAR: number;
  STEEM_CASHOUT_WINDOW_SECONDS: number;
  STEEM_CASHOUT_WINDOW_SECONDS_PRE_HF12: number;
  STEEM_CASHOUT_WINDOW_SECONDS_PRE_HF17: number;
  STEEM_CHAIN_ID: string;
  STEEM_CHAIN_ID_NAME: string;
  STEEM_COMMENT_REWARD_FUND_NAME: string;
  STEEM_CONTENT_APR_PERCENT: number;
  STEEM_CONTENT_CONSTANT_HF0: string;
  STEEM_CONTENT_REWARD_PERCENT: number;
  STEEM_CONVERSION_DELAY: string;
  STEEM_CONVERSION_DELAY_PRE_HF_16: string;
  STEEM_CREATE_ACCOUNT_DELEGATION_RATIO: number;
  STEEM_CREATE_ACCOUNT_DELEGATION_TIME: string;
  STEEM_CREATE_ACCOUNT_WITH_STEEM_MODIFIER: number;
  STEEM_CURATE_APR_PERCENT: number;
  STEEM_DEFAULT_SBD_INTEREST_RATE: number;
  STEEM_EQUIHASH_K: number;
  STEEM_EQUIHASH_N: number;
  STEEM_FEED_HISTORY_WINDOW: number;
  STEEM_FEED_HISTORY_WINDOW_PRE_HF_16: number;
  STEEM_FEED_INTERVAL_BLOCKS: number;
  STEEM_GENESIS_TIME: string;
  STEEM_HARDFORK_REQUIRED_WITNESSES: number;
  STEEM_INFLATION_NARROWING_PERIOD: number;
  STEEM_INFLATION_RATE_START_PERCENT: number;
  STEEM_INFLATION_RATE_STOP_PERCENT: number;
  STEEM_INIT_MINER_NAME: string;
  STEEM_INIT_PUBLIC_KEY_STR: string;
  STEEM_INIT_SUPPLY: number;
  STEEM_INIT_TIME: string;
  STEEM_IRREVERSIBLE_THRESHOLD: number;
  STEEM_LIQUIDITY_APR_PERCENT: number;
  STEEM_LIQUIDITY_REWARD_BLOCKS: number;
  STEEM_LIQUIDITY_REWARD_PERIOD_SEC: number;
  STEEM_LIQUIDITY_TIMEOUT_SEC: string;
  STEEM_MAX_ACCOUNT_NAME_LENGTH: number;
  STEEM_MAX_ACCOUNT_WITNESS_VOTES: number;
  STEEM_MAX_ASSET_WHITELIST_AUTHORITIES: number;
  STEEM_MAX_AUTHORITY_MEMBERSHIP: number;
  STEEM_MAX_BLOCK_SIZE: number;
  STEEM_SOFT_MAX_BLOCK_SIZE: number;
  STEEM_MAX_CASHOUT_WINDOW_SECONDS: number;
  STEEM_MAX_COMMENT_DEPTH: number;
  STEEM_MAX_COMMENT_DEPTH_PRE_HF17: number;
  STEEM_MAX_FEED_AGE_SECONDS: number;
  STEEM_MAX_INSTANCE_ID: string;
  STEEM_MAX_MEMO_SIZE: number;
  STEEM_MAX_WITNESSES: number;
  STEEM_MAX_MINER_WITNESSES_HF0: number;
  STEEM_MAX_MINER_WITNESSES_HF17: number;
  STEEM_MAX_PERMLINK_LENGTH: number;
  STEEM_MAX_PROXY_RECURSION_DEPTH: number;
  STEEM_MAX_RATION_DECAY_RATE: number;
  STEEM_MAX_RESERVE_RATIO: number;
  STEEM_MAX_RUNNER_WITNESSES_HF0: number;
  STEEM_MAX_RUNNER_WITNESSES_HF17: number;
  STEEM_MAX_SATOSHIS: string;
  STEEM_MAX_SHARE_SUPPLY: string;
  STEEM_MAX_SIG_CHECK_DEPTH: number;
  STEEM_MAX_TIME_UNTIL_EXPIRATION: number;
  STEEM_MAX_TRANSACTION_SIZE: number;
  STEEM_MAX_UNDO_HISTORY: number;
  STEEM_MAX_URL_LENGTH: number;
  STEEM_MAX_VOTE_CHANGES: number;
  STEEM_MAX_VOTED_WITNESSES_HF0: number;
  STEEM_MAX_VOTED_WITNESSES_HF17: number;
  STEEM_MAX_WITHDRAW_ROUTES: number;
  STEEM_MAX_WITNESS_URL_LENGTH: number;
  STEEM_MIN_ACCOUNT_CREATION_FEE: number;
  STEEM_MIN_ACCOUNT_NAME_LENGTH: number;
  STEEM_MIN_BLOCK_SIZE_LIMIT: number;
  STEEM_MIN_BLOCK_SIZE: number;
  STEEM_MIN_CONTENT_REWARD: Asset;
  STEEM_MIN_CURATE_REWARD: Asset;
  STEEM_MIN_PERMLINK_LENGTH: number;
  STEEM_MIN_REPLY_INTERVAL: number;
  STEEM_MIN_REPLY_INTERVAL_HF20: number;
  STEEM_MIN_ROOT_COMMENT_INTERVAL: number;
  STEEM_MIN_VOTE_INTERVAL_SEC: number;
  STEEM_MINER_ACCOUNT: string;
  STEEM_MINER_PAY_PERCENT: number;
  STEEM_MIN_FEEDS: number;
  STEEM_MINING_REWARD: Asset;
  STEEM_MINING_TIME: string;
  STEEM_MIN_LIQUIDITY_REWARD: Asset;
  STEEM_MIN_LIQUIDITY_REWARD_PERIOD_SEC: number;
  STEEM_MIN_PAYOUT_SBD: Asset;
  STEEM_MIN_POW_REWARD: Asset;
  STEEM_MIN_PRODUCER_REWARD: Asset;
  STEEM_MIN_TRANSACTION_EXPIRATION_LIMIT: number;
  STEEM_MIN_TRANSACTION_SIZE_LIMIT: number;
  STEEM_MIN_UNDO_HISTORY: number;
  STEEM_NULL_ACCOUNT: string;
  STEEM_NUM_INIT_MINERS: number;
  STEEM_OWNER_AUTH_HISTORY_TRACKING_START_BLOCK_NUM: number;
  STEEM_OWNER_AUTH_RECOVERY_PERIOD: string;
  STEEM_OWNER_CHALLENGE_COOLDOWN: string;
  STEEM_OWNER_CHALLENGE_FEE: Asset;
  STEEM_OWNER_UPDATE_LIMIT: number;
  STEEM_POST_AVERAGE_WINDOW: number;
  STEEM_POST_REWARD_FUND_NAME: string;
  STEEM_POST_WEIGHT_CONSTANT: number;
  STEEM_POW_APR_PERCENT: number;
  STEEM_PRODUCER_APR_PERCENT: number;
  STEEM_PROXY_TO_SELF_ACCOUNT: string;
  STEEM_SBD_INTEREST_COMPOUND_INTERVAL_SEC: number;
  STEEM_SECONDS_PER_YEAR: number;
  STEEM_RECENT_RSHARES_DECAY_TIME_HF19: string;
  STEEM_RECENT_RSHARES_DECAY_TIME_HF17: string;
  STEEM_REVERSE_AUCTION_WINDOW_SECONDS: number;
  STEEM_ROOT_POST_PARENT: string;
  STEEM_SAVINGS_WITHDRAW_REQUEST_LIMIT: number;
  STEEM_SAVINGS_WITHDRAW_TIME: string;
  STEEM_SBD_START_PERCENT: number;
  STEEM_SBD_STOP_PERCENT: number;
  STEEM_SECOND_CASHOUT_WINDOW: number;
  STEEM_SOFT_MAX_COMMENT_DEPTH: number;
  STEEM_START_MINER_VOTING_BLOCK: number;
  STEEM_START_VESTING_BLOCK: number;
  STEEM_TEMP_ACCOUNT: string;
  STEEM_UPVOTE_LOCKOUT_HF7: number;
  STEEM_UPVOTE_LOCKOUT_HF17: string;
  STEEM_VESTING_FUND_PERCENT: number;
  STEEM_VESTING_WITHDRAW_INTERVALS: number;
  STEEM_VESTING_WITHDRAW_INTERVALS_PRE_HF_16: number;
  STEEM_VESTING_WITHDRAW_INTERVAL_SECONDS: number;
  STEEM_VOTE_DUST_THRESHOLD: number;
  STEEM_VOTE_REGENERATION_SECONDS: number;
  STEEM_SYMBOL?: null;
  VESTS_SYMBOL?: null;
  STEEM_VIRTUAL_SCHEDULE_LAP_LENGTH: string;
  STEEM_VIRTUAL_SCHEDULE_LAP_LENGTH2: string;
  STEEM_MAX_LIMIT_ORDER_EXPIRATION: number;
  STEEM_DELEGATION_RETURN_PERIOD_HF0: number;
  STEEM_DELEGATION_RETURN_PERIOD_HF20: number;
}

export interface DynamicChainProperties {
  head_block_number: number;
  head_block_id: string;
  time: string;
  current_witness: string;
  total_pow: string;
  num_pow_witnesses: number;
  virtual_supply: string;
  current_supply: string;
  confidential_supply: string;
  current_sbd_supply: string;
  confidential_sbd_supply: string;
  total_vesting_fund_steem: string;
  total_vesting_shares: string;
  total_reward_fund_steem: string;
  total_reward_shares2: string;
  pending_rewarded_vesting_shares: string;
  pending_rewarded_vesting_steem: string;
  sbd_interest_rate: number;
  sbd_print_rate: number;
  maximum_block_size: number;
  current_aslot: number;
  recent_slots_filled: string;
  participation_count: number;
  last_irreversible_block_num: number;
  vote_power_reserve_rate: number;
}

export interface ScheduledHardfork {
  hf_version: string;
  live_time: string;
}

export interface RewardFund {
  id: number;
  name: string;
  reward_balance: string;
  recent_claims: string;
  last_update: string;
  content_constant: string;
  percent_curation_rewards: number;
  percent_content_rewards: number;
  author_reward_curve: string;
  curation_reward_curve: string;
}

export interface ChainVersion {
  blockchain_version: string;
  chain_id: string;
  fc_revision: string;
  steem_revision: string;
}
