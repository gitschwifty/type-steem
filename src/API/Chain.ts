import { Client, APIType, ClientOptions } from './Client';
import { SignedTransaction, ConfirmedTransaction } from '../Steem/Transaction';
import { CheckParams } from '../Helpers/Utils';

export class ChainAPI {
  private client: Client;
  constructor(client?: Client) {
    this.client = client ? client : new Client();
  }

  public getBlock(blockNum: number) {
    CheckParams({ blockNum });

    return this.client.callCondenserApi('get_block', [blockNum]);
  }

  public getBlockHeader(blockNum: number) {
    CheckParams({ blockNum });

    return this.client.callCondenserApi('get_block_header', [blockNum]);
  }

  public getChainProperties() {
    return this.client.callCondenserApi('get_chain_properties');
  }

  public getConfig() {
    return this.client.callCondenserApi('get_config');
  }

  public getDynamicGlobalProperties() {
    return this.client.callCondenserApi('get_dynamic_global_properties');
  }

  public getHardforkVersion() {
    return this.client.callCondenserApi('get_hardfork_version');
  }

  public getNextScheduledHardfork() {
    return this.client.callCondenserApi('get_next_scheduled_hardfork');
  }

  public getOpsInBlock(blockNum: number, onlyVirtual: boolean) {
    CheckParams({ blockNum });

    return this.client.callCondenserApi('get_ops_in_block', [
      blockNum,
      onlyVirtual
    ]);
  }

  public getRewardFund(type: string) {
    CheckParams({ type });

    return this.client.callCondenserApi('get_reward_fund', [type]);
  }

  public getTransaction(trxId: string) {
    CheckParams({ trxId });

    return this.client.callCondenserApi('get_transaction', [trxId]);
  }

  public getTransactionHex(trx: ConfirmedTransaction) {
    return this.client.callCondenserApi('get_transaction_hex', [trx]);
  }

  public getVersion() {
    return this.client.callCondenserApi('get_version');
  }

  public verifyAuthority(trx: ConfirmedTransaction) {
    return this.client.callCondenserApi('verify_authority', [trx]);
  }
}
