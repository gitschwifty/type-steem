/**
 * @file Blockchain API Class.
 * @author Peter James Taggart <code@pjtaggart.com>
 */

import { Client } from './Client';
import { FinishedTrx, ConfirmedTrx } from '../Steem/Transaction';
import { CheckParams } from '../Helpers/Utils';
import { SignedBlock } from '../Steem/Block';
import {
  ChainProperties,
  ChainConfig,
  DynamicChainProperties,
  ScheduledHardfork,
  RewardFund,
  ChainVersion
} from '../Steem/Blockchain';
import { API } from './API';

/**
 * Chain API class, takes client or constructs a default
 */
export class ChainAPI extends API {
  constructor(client?: Client) {
    super(client);
  }

  /**
   * Gets block blockNum
   * @param blockNum must be positive
   */
  public getBlock(blockNum: number) {
    CheckParams({ blockNum });

    return this.client.callCondenserApi<SignedBlock>('get_block', [blockNum]);
  }

  /**
   * Gets the block header of block blockNum
   * @param blockNum must be positive
   */
  public getBlockHeader(blockNum: number) {
    CheckParams({ blockNum });

    return this.client.callCondenserApi<SignedBlock>('get_block_header', [
      blockNum
    ]);
  }

  /**
   * Gets block chain properties
   */
  public getChainProperties() {
    return this.client.callCondenserApi<ChainProperties>(
      'get_chain_properties'
    );
  }

  /**
   * Get node config
   */
  public getConfig() {
    return this.client.callCondenserApi<ChainConfig>('get_config');
  }

  /**
   * Get dynamic global properties
   */
  public getDynamicGlobalProperties() {
    return this.client.callCondenserApi<DynamicChainProperties>(
      'get_dynamic_global_properties'
    );
  }

  /**
   * Gets current hardfork version
   */
  public getHardforkVersion() {
    return this.client.callCondenserApi<string>('get_hardfork_version');
  }

  /**
   * Gets next scheduled hardfork version and time
   */
  public getNextScheduledHardfork() {
    return this.client.callCondenserApi<ScheduledHardfork>(
      'get_next_scheduled_hardfork'
    );
  }

  /**
   * Gets all operations in block blockNum
   * @param blockNum must be positive
   * @param onlyVirtual pass true for only virtual ops
   */
  public getOpsInBlock(blockNum: number, onlyVirtual: boolean = false) {
    CheckParams({ blockNum });

    return this.client.callCondenserApi<FinishedTrx[]>('get_ops_in_block', [
      blockNum,
      onlyVirtual
    ]);
  }

  /**
   * Gets reward fund parameters
   * @param type 'post'
   */
  public getRewardFund(type: string) {
    CheckParams({ type });

    return this.client.callCondenserApi<RewardFund>('get_reward_fund', [type]);
  }

  /**
   * Gets transaction (account history api enabled & skip tx id off)
   * @param trxId transaction ID
   */
  public getTransaction(trxId: string) {
    CheckParams({ trxId });

    return this.client.callCondenserApi<ConfirmedTrx>('get_transaction', [
      trxId
    ]);
  }

  /**
   * Convers a transaction into a hex string
   * @param trx Transaction to convert
   */
  public getTransactionHex(trx: ConfirmedTrx) {
    return this.client.callCondenserApi<string>('get_transaction_hex', [trx]);
  }

  /**
   * Gets blockchain version
   */
  public getVersion() {
    return this.client.callCondenserApi<ChainVersion>('get_version');
  }

  /**
   * Checks transaction's signatures and verifies validity
   * @param trx Transaction to check
   */
  public verifyAuthority(trx: ConfirmedTrx) {
    return this.client.callCondenserApi<boolean>('verify_authority', [trx]);
  }
}
