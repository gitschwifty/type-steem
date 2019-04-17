export interface UnsignedBlock {
  previous: string;
  timestamp: string;
  witness: string;
  transaction_merkle_root: string;
  extensions: unknown[];
}

export interface SignedBlockHeader extends UnsignedBlock {
  witness_signature: string;
}

export interface SignedBlock extends SignedBlockHeader {
  block_id: string;
  signing_key: string;
  transaction_ids: string[];
  transactions: unknown[];
}
