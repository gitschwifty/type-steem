import '@babel/polyfill';
import { WalletAPI, APIType } from '../../dist';
import chai from 'chai';
const expect = chai.expect;

const walletApi = new WalletAPI();

describe('WalletAPI', function() {
  this.slow(3000);
  this.timeout(10000);

  describe('Get vesting delegations', () => {
    it('should throw no account error.', async () => {
      try {
        await walletApi.getVestingDelegations('', null, 10);
      } catch (err) {
        expect(err.message).to.equal('Must pass in a delegator account.');
      }
    });

    it('should throw invalid limit error.', async () => {
      try {
        await walletApi.getVestingDelegations('petertag', null, 0);
      } catch (err) {
        expect(err.message).to.equal(
          'Limit must be positive and less than 1000.'
        );
      }
    });

    it('should return an array', async () => {
      const res = await walletApi.getVestingDelegations('petertag', null, 5);
      expect(res).to.be.instanceOf(Array);
    });
  });

  describe('Get withdraw routes', () => {
    it('should throw no account error.', async () => {
      try {
        await walletApi.getWithdrawRoutes('', 'all');
      } catch (err) {
        expect(err.message).to.equal('Must pass in an account.');
      }
    });

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
