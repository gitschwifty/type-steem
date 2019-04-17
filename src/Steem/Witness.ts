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
