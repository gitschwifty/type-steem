export interface Transaction {
  ref_block_num: number;
  ref_block_prefix: number;
  expiration: Date;
  operations: unknown[];
  extensions: unknown[];
}

export interface SignedTransaction extends Transaction {
  signatures: string[];
}

export interface ConfirmedTransaction extends SignedTransaction {
  transaction_id: string;
  block_num: number;
  transaction_num: number;
}
