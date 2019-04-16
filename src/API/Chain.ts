import { Client, APIType, ClientOptions } from './Client';
import { SignedTransaction, ConfirmedTransaction } from '../Steem/Transaction';

export class ChainAPI extends Client {
  constructor(node?: string, options?: ClientOptions) {
    super(node, options);
  }

  public getBlock(blockNum: number) {
    this.checkParams({ blockNum });

    return this.callCondenserApi('get_block', [blockNum]);
  }

  public getBlockHeader(blockNum: number) {
    this.checkParams({ blockNum });

    return this.callCondenserApi('get_block_header', [blockNum]);
  }

  public getChainProperties() {
    return this.callCondenserApi('get_chain_properties');
  }

  public getConfig() {
    return this.callCondenserApi('get_config');
  }

  public getDynamicGlobalProperties() {
    return this.callCondenserApi('get_dynamic_global_properties');
  }

  public getHardforkVersion() {
    return this.callCondenserApi('get_hardfork_version');
  }

  public getNextScheduledHardfork() {
    return this.callCondenserApi('get_next_scheduled_hardfork');
  }

  public getOpsInBlock(blockNum: number, onlyVirtual: boolean) {
    this.checkParams({ blockNum });

    return this.callCondenserApi('get_ops_in_block', [blockNum, onlyVirtual]);
  }

  public getRewardFund(type: string) {
    this.checkParams({ type });

    return this.callCondenserApi('get_reward_fund', [type]);
  }

  public getTransaction(trxId: string) {
    this.checkParams({ trxId });

    return this.callCondenserApi('get_transaction', [trxId]);
  }

  public getTransactionHex(trx: ConfirmedTransaction) {
    return this.callCondenserApi('get_transaction_hex', [trx]);
  }

  public getVersion() {
    return this.callCondenserApi('get_version');
  }

  public verifyAuthority(trx: ConfirmedTransaction) {
    return this.callCondenserApi('verify_authority', [trx]);
  }
}
