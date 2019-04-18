import '@babel/polyfill';
import { API, Client } from '../../src';
import chai from 'chai';
const expect = chai.expect;

describe('API Base Class', () => {
  describe('Constructor', () => {
    it('should return default url & options', () => {
      const api = new API();
      expect(api.getNode()).to.equal('https://api.steem.house');
      expect(api.getOptions().retries).to.equal(3);
    });

    it('should return custom url & options', () => {
      const api = new API(
        new Client('https://rpc.steemviz.com', { retries: 5 })
      );
      expect(api.getNode()).to.equal('https://rpc.steemviz.com');
      expect(api.getOptions().retries).to.equal(5);
    });
  });

  describe('Change retries', () => {
    it('should change retries to 5', () => {
      const api = new API();
      api.changeRetries(5);
      expect(api.getOptions().retries).to.equal(5);
    });

    it('should throw invalid retries error', () => {
      try {
        const api = new API();
        api.changeRetries(-1);
      } catch (err) {
        expect(err.message).to.equal('Retries cannot be negative.');
      }
    });
  });
});
