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
