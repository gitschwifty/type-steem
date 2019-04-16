import { Client, APIType, ClientOptions } from './Client';

export class WalletAPI extends Client {
  constructor(node?: string, options?: ClientOptions) {
    super(node, options);
  }

  public getVestingDelegations(
    delegator: string,
    limit: number,
    startAccount?: string
  ) {
    this.checkParams({ delegator, limit }, 1000);

    return this.callCondenserApi('get_vesting_delegations', [
      delegator,
      startAccount,
      limit
    ]);
  }

  public getWithdrawRoutes(account: string, withdrawType: string) {
    this.checkParams({ account });

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

    return this.callCondenserApi('get_withdraw_routes', [
      account,
      withdrawType
    ]);
  }
}
