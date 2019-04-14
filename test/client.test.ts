import '@babel/polyfill';
import { Client } from '../dist';
import chai from 'chai';
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
        await client.getAccountCount();
      } catch (err) {
        expect(err.message).to.equal('only absolute urls are supported');
      }
    });

    it('should return > 1256360 with node specified', async () => {
      const client = new Client('https://api.steem.house');
      const res = await client.getAccountCount();
      expect(res).to.greaterThan(1256360);
    });
  });

  describe('getAccountCount', () => {
    it('should return > 1256360', async function() {
      const res = await this.client.getAccountCount();
      expect(res).to.greaterThan(1256360);
    });
  });

  describe('getAccountHistory', () => {
    it('should throw account name needed error', function() {
      try {
        this.client.getAccountHistory('', 0, 10);
      } catch (err) {
        expect(err.message).to.equal('Account name must be passed.');
      }
    });

    it('should throw incorrect index error', function() {
      try {
        this.client.getAccountHistory('petertag', -5, 5);
      } catch (err) {
        expect(err.message).to.equal('Start index must be >= -1.');
      }
    });

    it('should throw incorrect limit error', function() {
      try {
        this.client.getAccountHistory('petertag', 5, 15000);
      } catch (err) {
        expect(err.message).to.equal(
          'Limit must be positive and less than 10,000.'
        );
      }
    });

    it('should throw start < limit error', function() {
      try {
        this.client.getAccountHistory('petertag', 0, 10);
      } catch (err) {
        expect(err.message).to.equal('Start must be greater than limit.');
      }
    });

    it('should return an array', async function() {
      const res = await this.client.getAccountHistory('petertag', 30, 10);
      expect(res.length).to.greaterThan(0);
    });
  });

  describe('getAccountReputations', () => {
    it('should throw incorrect limit error', function() {
      try {
        this.client.getAccountReputations('petertag', 15000);
      } catch (err) {
        expect(err.message).to.equal(
          'Limit must be positive and less than 1,000.'
        );
      }
    });

    it('should return an array', async function() {
      const res = await this.client.getAccountReputations('petertag', 10);
      expect(res.length).to.greaterThan(0);
    });
  });

  describe('getAccounts', () => {
    it('should return petertag account', async function() {
      const res = await this.client.getAccounts(['petertag']);
      expect(res[0].post_count).to.greaterThan(0);
    });
  });
});
