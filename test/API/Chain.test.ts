import '@babel/polyfill';
import { ChainAPI, Operation, Client } from '../../src';
import chai from 'chai';
const expect = chai.expect;

const chainApi = new ChainAPI();

describe('ChainAPI', function() {
  this.slow(3000);
  this.timeout(10000);

  describe('Get Block', () => {
    it('Genesis block_id check', async () => {
      const res = await chainApi.getBlock(1);
      expect(res.hasOwnProperty('block_id')).to.be.equal(true);
      expect(res.block_id).to.equal('0000000109833ce528d5bbfb3f6225b39ee10086');
    });
  });

  describe('Get Block Header', () => {
    it('Genesis block miner === initminer', async () => {
      const res = await chainApi.getBlockHeader(1);
      expect(res.witness).to.equal('initminer');
    });
  });

  describe('Get chain properties', () => {
    it('Max block size === 65536', async () => {
      const res = await chainApi.getChainProperties();
      expect(res.maximum_block_size).to.equal(65536);
    });
  });

  describe('Get dynamic global properties', () => {
    it('Max block size === 65536', async () => {
      const res = await chainApi.getDynamicGlobalProperties();
      expect(res.maximum_block_size).to.equal(65536);
    });
  });

  describe('Get config', () => {
    it('Steem_Chain_Id === (0 >> 63)', async () => {
      const res = await chainApi.getConfig();
      expect(res.STEEM_CHAIN_ID).to.equal(
        '0000000000000000000000000000000000000000000000000000000000000000'
      );
    });
  });

  describe('Get hardfork version', () => {
    it('hardfork_version === *.**.*', async () => {
      const res = await chainApi.getHardforkVersion();
      expect(res).to.match(/([0-9]\.[0-9]{2}\.[0-9])/);
    });
  });

  describe('Get next scheduled hardfork', () => {
    it('next scheduled === *.**.*', async () => {
      const res = await chainApi.getNextScheduledHardfork();
      expect(res.hf_version).to.match(/([0-9]\.[0-9]{2}\.[0-9])/);
    });
  });

  describe('Get ops in block', () => {
    it('should return genesis block with one transaction', async () => {
      const res = await chainApi.getOpsInBlock(1);
      expect(res).to.be.instanceOf(Array);
    });

    it('should return genesis block with one transaction', async () => {
      const res = await chainApi.getOpsInBlock(1, true);
      expect(res).to.be.instanceOf(Array);
    });
  });

  describe('Get reward funds', () => {
    it('should return reward fund post', async () => {
      const res = await chainApi.getRewardFund('post');
      expect(res.id).to.equal(0);
      expect(res.name).to.equal('post');
    });
  });

  describe('Get transaction', () => {
    it('should return a transaction', async () => {
      const accHisByKeyApi = new ChainAPI(
        new Client('https://rpc.steemviz.com')
      );
      const res = await accHisByKeyApi.getTransaction(
        '6fde0190a97835ea6d9e651293e90c89911f933c'
      );
      expect(res.ref_block_num).to.equal(36374);
    });
  });

  describe('Get transaction hex', () => {
    it('should return a transaction hex', async () => {
      const tx = {
        ref_block_num: 36374,
        ref_block_prefix: 3218139339,
        expiration: '2018-04-09T00:29:06',
        operations: [
          [
            'claim_reward_balance',
            {
              account: 'social',
              reward_steem: '0.000 STEEM',
              reward_sbd: '0.000 SBD',
              reward_vests: '0.000001 VESTS'
            }
          ] as Operation
        ],
        extensions: [],
        signatures: [
          '1b01bdbb0c0d43db821c09ae8a82881c1ce3ba0eca35f23bc06541eca05560742f210a21243e20d04d5c88cb977abf2d75cc088db0fff2ca9fdf2cba753cf69844'
        ],
        transaction_id: '6fde0190a97835ea6d9e651293e90c89911f933c',
        block_num: 21401130,
        transaction_num: 25
      };

      const hexRes =
        '168ecbe8d0bfd2b3ca5a012706736f6369616c000000000000000003535445454d0000000000000000000003534244000000000100000000000000065645535453000000011b01bdbb0c0d43db821c09ae8a82881c1ce3ba0eca35f23bc06541eca05560742f210a21243e20d04d5c88cb977abf2d75cc088db0fff2ca9fdf2cba753cf69844';

      const res = await chainApi.getTransactionHex(tx);
      expect(res).to.equal(hexRes);
    });
  });

  describe('Get version', () => {
    it('should return a string === *.**.*', async () => {
      const res = await chainApi.getVersion();
      expect(res.blockchain_version).to.match(/([0-9]\.[0-9]{2}\.[0-9])/);
    });
  });

  describe('Verify authority', () => {
    it('should return true', async () => {
      const tx = {
        ref_block_num: 36374,
        ref_block_prefix: 3218139339,
        expiration: '2018-04-09T00:29:06',
        operations: [
          [
            'claim_reward_balance',
            {
              account: 'social',
              reward_steem: '0.000 STEEM',
              reward_sbd: '0.000 SBD',
              reward_vests: '0.000001 VESTS'
            }
          ] as Operation
        ],
        extensions: [],
        signatures: [
          '1b01bdbb0c0d43db821c09ae8a82881c1ce3ba0eca35f23bc06541eca05560742f210a21243e20d04d5c88cb977abf2d75cc088db0fff2ca9fdf2cba753cf69844'
        ],
        transaction_id: '6fde0190a97835ea6d9e651293e90c89911f933c',
        block_num: 21401130,
        transaction_num: 25
      };

      const res = await chainApi.verifyAuthority(tx);

      expect(res).to.equal(true);
    });
  });
});
