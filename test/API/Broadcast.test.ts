import '@babel/polyfill';
import { BroadcastAPI, Client } from '../../dist';
import chai from 'chai';
const expect = chai.expect;

const broadcastApi = new BroadcastAPI(new Client('https://rpc.steemviz.com'));

describe('Broadcast API', function() {
  this.slow(5000);
  this.timeout(15000);

  it('Should work without passing in a client', () => {
    const bapi = new BroadcastAPI();
  });

  describe('Broadcast transaction', () => {
    it('should return no auth error', async () => {
      try {
        const trx = {
          ref_block_num: 1097,
          ref_block_prefix: 2181793527,
          expiration: '2016-03-24T18:00:21',
          operations: [
            [
              'vote',
              {
                voter: 'steemit',
                author: 'alice',
                permlink: 'a-post-by-alice',
                weight: 10000
              }
            ]
          ],
          extensions: [],
          signatures: []
        };

        await broadcastApi.broadcastTransaction(trx);
      } catch (err) {
        expect(err.message).to.equal(
          'missing required posting authority:Missing Posting Authority steemit'
        );
      }
    });

    it('should return no auth error sync', async () => {
      try {
        const trx = {
          ref_block_num: 1097,
          ref_block_prefix: 2181793527,
          expiration: '2016-03-24T18:00:21',
          operations: [
            [
              'vote',
              {
                voter: 'steemit',
                author: 'alice',
                permlink: 'a-post-by-alice',
                weight: 10000
              }
            ]
          ],
          extensions: [],
          signatures: []
        };

        await broadcastApi.broadcastTransaction(trx, true);
      } catch (err) {
        expect(err.message).to.equal(
          'missing required posting authority:Missing Posting Authority steemit'
        );
      }
    });
  });
});
