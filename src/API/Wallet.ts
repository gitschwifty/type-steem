import { Client, APIType, ClientOptions } from './Client';
import { CheckParams } from '../Helpers/Utils';

export interface Delegation {
  id: number;
  delegator: string;
  delegatee: string;
  vesting_shares: string;
  min_delegation_time: string;
}

export interface WithdrawRoute {
  id: number;
  from_account: string;
  to_account: string;
  percent: number;
  auto_vest: boolean;
}

export class WalletAPI {
  private client: Client;
  constructor(client?: Client) {
    this.client = client ? client : new Client();
  }

  public getVestingDelegations(
    delegator: string,
    limit: number,
    startAccount?: string
  ) {
    CheckParams({ delegator, limit }, 1000);

    return this.client.callCondenserApi<Delegation[]>(
      'get_vesting_delegations',
      [delegator, startAccount, limit]
    );
  }

  public getWithdrawRoutes(account: string, withdrawType: string) {
    CheckParams({ account });

    if (
      !withdrawType ||
      !(
        withdrawType === 'outgoing' ||
        withdrawType === 'incoming' ||
        withdrawType === 'all'
      )
    ) {
      throw new Error('Type must be one of outgoing, incoming, or all.');
    }

    return this.client.callCondenserApi<WithdrawRoute[]>(
      'get_withdraw_routes',
      [account, withdrawType]
    );
  }
}
