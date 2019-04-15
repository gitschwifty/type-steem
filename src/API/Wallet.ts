import { Client, APIType, ClientOptions } from './Client';

export class WalletAPI extends Client {
  constructor(node?: string, options?: ClientOptions) {
    super(node, options);
  }

  public getVestingDelegations(
    delegator: string,
    startAccount: string | null,
    limit: number
  ) {
    if (!delegator) {
      throw new Error('Must pass in a delegator account.');
    }

    if (limit < 1 || limit > 1000) {
      throw new Error('Limit must be positive and less than 1000.');
    }

    return this.callApi(APIType.cond, 'get_vesting_delegations', [
      delegator,
      startAccount,
      limit
    ]);
  }

  public getWithdrawRoutes(account: string, withdrawType: string) {
    if (!account) {
      throw new Error('Must pass in an account.');
    }

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

    return this.callApi(APIType.cond, 'get_withdraw_routes', [
      account,
      withdrawType
    ]);
  }
}
