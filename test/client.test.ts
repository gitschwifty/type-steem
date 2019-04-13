import '@babel/polyfill';
import { Client } from '../dist';
import chai from 'chai';
const expect = chai.expect;

describe('typeSteem', function() {
  this.slow(3000);
  this.timeout(10000);
  before(function() {
    this.client = new Client();
  });

  it('should return > 1256360', async function() {
    const res = await this.client.getAccountCount();
    expect(res).to.greaterThan(1256360);
  });

  it('should return petertag account', async function() {
    const res = await this.client.getAccounts(['petertag']);
    expect(res[0].post_count).to.greaterThan(0);
  });
});
