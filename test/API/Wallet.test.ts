import '@babel/polyfill';
import { WalletAPI, APIType, Client } from '../../dist';
import chai from 'chai';
const expect = chai.expect;

const walletApi = new WalletAPI();

describe('WalletAPI', function() {
  this.slow(3000);
  this.timeout(10000);

  it('Should work passing in a client', () => {
    const wapi = new WalletAPI(new Client('https://rpc.steemviz.com'));
  });

  describe('Get vesting delegations', () => {
    it('should return an array', async () => {
      const res = await walletApi.getVestingDelegations('petertag', 5);
      expect(res).to.be.instanceOf(Array);
    });
  });

  describe('Get withdraw routes', () => {
    it('should throw invalid type error.', async () => {
      try {
        await walletApi.getWithdrawRoutes('petertag', 'none');
      } catch (err) {
        expect(err.message).to.equal(
          'Type must be one of outgoing, incoming, or all.'
        );
      }
    });

    it('should return an array', async () => {
      const res = await walletApi.getWithdrawRoutes('petertag', 'all');
      expect(res).to.be.instanceOf(Array);
    });
  });
});
