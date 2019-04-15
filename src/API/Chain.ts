import { Client, APIType, ClientOptions } from './Client';
import { SignedTransaction, ConfirmedTransaction } from '../Steem/Transaction';

export class ChainAPI extends Client {
  constructor(node?: string, options?: ClientOptions) {
    super(node, options);
  }

  public getBlock(blockNum: number) {
    if (blockNum < 1) {
      throw new Error('Block number must be greater than 0.');
    }

    return this.callApi(APIType.cond, 'get_block', [blockNum]);
  }

  public getBlockHeader(blockNum: number) {
    if (blockNum < 1) {
      throw new Error('Block number must be greater than 0.');
    }

    return this.callApi(APIType.cond, 'get_block_header', [blockNum]);
  }

  public getChainProperties() {
    return this.callApi(APIType.cond, 'get_chain_properties');
  }

  public getConfig() {
    return this.callApi(APIType.cond, 'get_config');
  }

  public getDynamicGlobalProperties() {
    return this.callApi(APIType.cond, 'get_dynamic_global_properties');
  }

  public getHardforkVersion() {
    return this.callApi(APIType.cond, 'get_hardfork_version');
  }

  public getNextScheduledHardfork() {
    return this.callApi(APIType.cond, 'get_next_scheduled_hardfork');
  }

  public getOpsInBlock(blockNum: number, onlyVirtual: boolean) {
    if (blockNum < 1) {
      throw new Error('Block number must be positive.');
    }

    return this.callApi(APIType.cond, 'get_ops_in_block', [
      blockNum,
      onlyVirtual
    ]);
  }

  public getRewardFund(type: string) {
    if (!type) {
      throw new Error('Type must be non-empty string.');
    }

    return this.callApi(APIType.cond, 'get_reward_fund', [type]);
  }

  public getTransaction(trxId: string) {
    if (!trxId) {
      throw new Error('Must pass in a transaction ID.');
    }

    return this.callApi(APIType.cond, 'get_transaction', [trxId]);
  }

  public getTransactionHex(trx: ConfirmedTransaction) {
    return this.callApi(APIType.cond, 'get_transaction_hex', [trx]);
  }

  public getVersion() {
    return this.callApi(APIType.cond, 'get_version');
  }

  public verifyAuthority(trx: ConfirmedTransaction) {
    return this.callApi(APIType.cond, 'verify_authority', [trx]);
  }
}
