import { Operation } from './Operation';

export interface Trx {
  ref_block_num: number;
  ref_block_prefix: number;
  expiration: string;
  operations: Operation[];
  extensions: unknown[];
}

export interface SignedTrx extends Trx {
  signatures: string[];
}

export interface ConfirmedTrx extends Trx {
  transaction_id: string;
  block_num: number;
  transaction_num: number;
}

export interface FinishedTrx {
  trx_id: string;
  block: number;
  trx_in_block: number;
  op_in_trx: number;
  virtual_op: number;
  timestamp: string;
  op: Operation[];
}
