import '@babel/polyfill';
import { RCAPI, Client } from '../../src';
import chai from 'chai';
const expect = chai.expect;

const rcApi = new RCAPI();

describe('RC API', function() {
  this.slow(5000);
  this.timeout(15000);

  it('Should work passing in a client', () => {
    const rcapi = new RCAPI(new Client('https://rpc.steemviz.com'));
  });

  describe('Find RC Accounts', () => {
    it('should return rc accounts object', async () => {
      const res = await rcApi.findRCAccounts(['petertag']);
      expect(res).to.be.instanceOf(Object);
      if (res instanceof Object && !(res instanceof Array)) {
        expect(res.rc_accounts).to.be.instanceOf(Array);
      } else {
        expect(true).equal(false);
      }
    });
  });

  describe('Get resource params', () => {
    it('should return object', async () => {
      const res = await rcApi.getResourceParams();
      expect(res).to.be.instanceOf(Object);
    });
  });

  describe('Get resource pool', () => {
    it('should return object', async () => {
      const res = await rcApi.getResourcePool();
      expect(res).to.be.instanceOf(Object);
    });
  });
});
