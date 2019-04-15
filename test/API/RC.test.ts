import '@babel/polyfill';
import { RCAPI } from '../../dist';
import chai from 'chai';
const expect = chai.expect;

const rcApi = new RCAPI();

describe('RC API', function() {
  this.slow(5000);
  this.timeout(15000);

  describe('Find RC Accounts', () => {
    it('should throw no account error', async () => {
      try {
        await rcApi.findRCAccounts(['']);
      } catch (err) {
        expect(err.message).to.equal('Must pass at least one account in.');
      }
    });

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
