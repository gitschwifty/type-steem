import '@babel/polyfill';
import { Client, APIType } from '../../src';
import chai from 'chai';
import 'mocha';
const expect = chai.expect;

describe('Client', function() {
  this.slow(3000);
  this.timeout(10000);

  before(function() {
    this.client = new Client();
  });

  describe('Client Constructor', () => {
    it('should throw error with bad node', async () => {
      try {
        const client = new Client('blank');
        await client.callCondenserApi('get_account_count');
      } catch (err) {
        expect(err.message).to.equal('only absolute urls are supported');
      }
    });

    it('should return > 1256360 with node & options specified', async () => {
      const client = new Client('https://api.steem.house', { retries: 5 });
      const res = await client.callCondenserApi('get_account_count');
      expect(res).to.greaterThan(1256360);
    });
  });
});
