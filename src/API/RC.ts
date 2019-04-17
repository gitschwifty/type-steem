import { Client, APIType, ClientOptions } from './Client';
import { CheckParams } from '../Helpers/Utils';
import { Asset } from '../Steem/Asset';

export interface RCAccount {
  account: string;
  max_rc: string;
  max_rc_creation_adjustment: Asset;
  rc_manabar: RCManabar;
}

export interface RCManabar {
  current_mana: string;
  last_update_time: number;
}

export interface RCParams {
  resource_names: keyof ResourceParams;
  resource_params: ResourceParams;
  size_info: SizeInfo;
}

export interface ResourceParams {
  resource_execution_time: ResourceExecutionTime;
  resource_history_bytes: ResourceHistoryBytes;
  resource_market_bytes: ResourceMarketBytes;
  resource_new_accounts: ResourceNewAccounts;
  resource_state_bytes: ResourceStateBytes;
}

export interface ResourceHistoryBytes {
  price_curve_params: PriceCurveParams;
  resource_dynamics_params: ResourceDynamicParams;
}

export interface ResourceDynamicParams {
  budget_per_time_unit: number;
  decay_params: DecayParams;
  max_pool_size: string;
  min_decay: number;
  pool_eq: string;
  resource_unit: number;
}

export interface DecayParams {
  decay_per_time_unit: number;
  decay_per_time_unit_denom_shift: number;
}

export interface PriceCurveParams {
  coeff_a: string;
  coeff_b: number;
  shift: number;
}

export interface ResourceNewAccounts {
  price_curve_params: PriceCurveParams;
  resource_dynamics_params: ResourceDynamicParams;
}

export interface ResourceMarketBytes {
  price_curve_params: PriceCurveParams;
  resource_dynamics_params: ResourceDynamicParams;
}

export interface ResourceStateBytes {
  STATE_BYTES_SCALE: number;
  account_authority_object_base_size: number;
  account_object_base_size: number;
  account_recovery_request_object_base_size: number;
  authority_account_member_size: number;
  authority_base_size: number;
  authority_key_member_size: number;
  comment_object_base_size: number;
  comment_object_beneficiaries_member_size: number;
  comment_object_parent_permlink_char_size: number;
  comment_object_permlink_char_size: number;
  comment_vote_object_base_size: number;
  convert_request_object_base_size: number;
  decline_voting_rights_request_object_base_size: number;
  escrow_object_base_size: number;
  limit_order_object_base_size: number;
  price_curve_params: PriceCurveParams;
  resource_dynamics_params: ResourceDynamicParams;
  savings_withdraw_object_byte_size: number;
  transaction_object_base_size: number;
  transaction_object_byte_size: number;
  vesting_delegation_expiration_object_base_size: number;
  vesting_delegation_object_base_size: number;
  withdraw_vesting_route_object_base_size: number;
  witness_object_base_size: number;
  witness_object_url_char_size: number;
  witness_vote_object_base_size: number;
}

export interface ResourceExecutionTime {
  account_create_operation_exec_time: number;
  account_create_with_delegation_operation_exec_time: number;
  account_update_operation_exec_time: number;
  account_witness_proxy_operation_exec_time: number;
  account_witness_vote_operation_exec_time: number;
  cancel_transfer_from_savings_operation_exec_time: number;
  change_recovery_account_operation_exec_time: number;
  claim_account_operation_exec_time: number;
  claim_reward_balance_operation_exec_time: number;
  comment_operation_exec_time: number;
  comment_options_operation_exec_time: number;
  convert_operation_exec_time: number;
  create_claimed_account_operation_exec_time: number;
  custom_binary_operation_exec_time: number;
  custom_json_operation_exec_time: number;
  custom_operation_exec_time: number;
  decline_voting_rights_operation_exec_time: number;
  delegate_vesting_shares_operation_exec_time: number;
  delete_comment_operation_exec_time: number;
  escrow_approve_operation_exec_time: number;
  escrow_dispute_operation_exec_time: number;
  escrow_release_operation_exec_time: number;
  escrow_transfer_operation_exec_time: number;
  feed_publish_operation_exec_time: number;
  limit_order_cancel_operation_exec_time: number;
  limit_order_create2_operation_exec_time: number;
  limit_order_create_operation_exec_time: number;
  price_curve_params: PriceCurveParams;
  request_account_recovery_operation_exec_time: number;
  resource_dynamics_params: ResourceDynamicParams;
  set_withdraw_vesting_route_operation_exec_time: number;
  transfer_from_savings_operation_exec_time: number;
  transfer_operation_exec_time: number;
  transfer_to_savings_operation_exec_time: number;
  transfer_to_vesting_operation_exec_time: number;
  vote_operation_exec_time: number;
  withdraw_vesting_operation_exec_time: number;
  witness_set_properties_operation_exec_time: number;
  witness_update_operation_exec_time: number;
}

export interface SizeInfo {
  resource_execution_time: ResourceExecutionTime;
  resource_state_bytes: ResourceStateBytes;
}

export interface RCPool {
  resource_execution_time: { pool: string };
  resource_history_bytes: { pool: string };
  resource_market_bytes: { pool: string };
  resource_new_accounts: { pool: number };
  resource_state_bytes: { pool: string };
}

export class RCAPI {
  private client: Client;
  constructor(client?: Client) {
    this.client = client ? client : new Client();
  }

  public findRCAccounts(accounts: string[]) {
    CheckParams({ accounts });

    return this.client.callAppbaseApi<{ rc_accounts: RCAccount[] }>(
      APIType.rc,
      'find_rc_accounts',
      {
        accounts
      }
    );
  }

  public getResourceParams() {
    return this.client.callAppbaseApi<RCParams>(
      APIType.rc,
      'get_resource_params'
    );
  }

  public getResourcePool() {
    return this.client.callAppbaseApi<RCPool>(APIType.rc, 'get_resource_pool');
  }
}
