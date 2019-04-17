import { Client, APIType, ClientOptions } from './Client';
import { FinishedTrx, ConfirmedTrx } from '../Steem/Transaction';
import { CheckParams } from '../Helpers/Utils';
import { SignedBlock, UnsignedBlock } from '../Steem/Block';
import {
  ChainProperties,
  ChainConfig,
  DynamicChainProperties,
  ScheduledHardfork,
  RewardFund,
  ChainVersion
} from '../Steem/Blockchain';

export class ChainAPI {
  private client: Client;
  constructor(client?: Client) {
    this.client = client ? client : new Client();
  }

  public getBlock(blockNum: number) {
    CheckParams({ blockNum });

    return this.client.callCondenserApi<SignedBlock>('get_block', [blockNum]);
  }

  public getBlockHeader(blockNum: number) {
    CheckParams({ blockNum });

    return this.client.callCondenserApi<SignedBlock>('get_block_header', [
      blockNum
    ]);
  }

  public getChainProperties() {
    return this.client.callCondenserApi<ChainProperties>(
      'get_chain_properties'
    );
  }

  public getConfig() {
    return this.client.callCondenserApi<ChainConfig>('get_config');
  }

  public getDynamicGlobalProperties() {
    return this.client.callCondenserApi<DynamicChainProperties>(
      'get_dynamic_global_properties'
    );
  }

  public getHardforkVersion() {
    return this.client.callCondenserApi<string>('get_hardfork_version');
  }

  public getNextScheduledHardfork() {
    return this.client.callCondenserApi<ScheduledHardfork>(
      'get_next_scheduled_hardfork'
    );
  }

  public getOpsInBlock(blockNum: number, onlyVirtual: boolean) {
    CheckParams({ blockNum });

    return this.client.callCondenserApi<FinishedTrx[]>('get_ops_in_block', [
      blockNum,
      onlyVirtual
    ]);
  }

  public getRewardFund(type: string) {
    CheckParams({ type });

    return this.client.callCondenserApi<RewardFund>('get_reward_fund', [type]);
  }

  public getTransaction(trxId: string) {
    CheckParams({ trxId });

    return this.client.callCondenserApi<ConfirmedTrx>('get_transaction', [
      trxId
    ]);
  }

  public getTransactionHex(trx: ConfirmedTrx) {
    return this.client.callCondenserApi<string>('get_transaction_hex', [trx]);
  }

  public getVersion() {
    return this.client.callCondenserApi<ChainVersion>('get_version');
  }

  public verifyAuthority(trx: ConfirmedTrx) {
    return this.client.callCondenserApi<boolean>('verify_authority', [trx]);
  }
}
