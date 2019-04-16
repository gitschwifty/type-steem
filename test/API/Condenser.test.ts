import '@babel/polyfill';
import { CondenserAPI, APIType, Client } from '../../dist';
import chai from 'chai';
const expect = chai.expect;

const condenserApi = new CondenserAPI();

describe('CondenserAPI', function() {
  this.slow(3000);
  this.timeout(10000);

  it('Should work passing in a client', () => {
    const capi = new CondenserAPI(new Client('https://rpc.steemviz.com'));
  });

  describe('Get Account Count', () => {
    it('should return > 1256360', async () => {
      const res = await condenserApi.getAccountCount();
      expect(res).to.greaterThan(1256360);
    });
  });

  describe('Get Account History', () => {
    it('should throw invalid start error', async () => {
      try {
        await condenserApi.getAccountHistory('petertag', 0, 10);
      } catch (err) {
        expect(err.message).to.equal('Start must be -1 or positive.');
      }
    });

    it('should throw invalid start error', async () => {
      try {
        await condenserApi.getAccountHistory('petertag', 5, 10);
      } catch (err) {
        expect(err.message).to.equal('Start must be greater than limit.');
      }
    });

    it('should return an array', async () => {
      const res = await condenserApi.getAccountHistory('petertag', 30, 10);
      expect(res).to.be.instanceOf(Array);
    });
  });

  describe('Get Account Reputations', () => {
    it('should return an array', async () => {
      const res = await condenserApi.getAccountReputations(10);
      expect(res).to.be.instanceOf(Array);
    });
  });

  describe('Get Accounts', () => {
    it('should return petertag account', async () => {
      const res = await condenserApi.getAccounts(['petertag']);
      expect(res[0].post_count).to.greaterThan(0);
    });
  });

  describe('Get Content', () => {
    it('should return forking steem post', async () => {
      const res = await condenserApi.getContent('petertag', 'forking-steem');
      if (res instanceof Object && !(res instanceof Array)) {
        expect(res.id).to.equal(63087670);
      }
    });
  });

  describe('Get Content replies', () => {
    it('should return forking steem post', async () => {
      const res = await condenserApi.getContentReplies(
        'petertag',
        'forking-steem'
      );
      expect(res[0].id).to.equal(63087673);
    });
  });

  describe('Lookup Account names', () => {
    it('should return petertag account', async () => {
      const res = await condenserApi.lookupAccountNames(['petertag']);
      expect(res[0].post_count).to.greaterThan(0);
    });
  });

  describe('Lookup Accounts', () => {
    it('should return an array', async () => {
      const res = await condenserApi.lookupAccounts('a', 10);
      expect(res).to.be.instanceOf(Array);
    });
  });
});
