import '@babel/polyfill';
import { WitnessAPI, Client } from '../../dist';
import chai from 'chai';
const expect = chai.expect;

const witnessApi = new WitnessAPI();

describe('WitnessAPI', function() {
  this.slow(3000);
  this.timeout(10000);

  it('Should work passing in a client', () => {
    const wapi = new WitnessAPI(new Client('https://rpc.steemviz.com'));
  });

  describe('Get active witnesses', () => {
    it('should return 21 witnesses', async () => {
      const res = await witnessApi.getActiveWitnesses();
      expect(res).to.be.instanceOf(Array);
      if (res instanceof Array) {
        expect(res.length).to.equal(21);
      }
    });
  });

  describe('Get witness by account', () => {
    it('should return petertag object', async () => {
      const res = await witnessApi.getWitnessByAccount('petertag');
      expect(res).to.be.instanceOf(Object);
    });
  });

  describe('Get witness count', () => {
    it('should return > 0', async () => {
      const res = await witnessApi.getWitnessCount();
      expect(res).to.greaterThan(0);
    });
  });

  describe('Get witness schedule', () => {
    it('should return witness schedule object', async () => {
      const res = await witnessApi.getWitnessSchedule();
      expect(res).to.be.instanceOf(Object);
    });
  });

  describe('Get witnesses', () => {
    it('should throw invalid index error', async () => {
      try {
        await witnessApi.getWitnesses([-1]);
      } catch (err) {
        expect(err.message).to.equal('Witness index must be positive.');
      }
    });

    it('should return a witness array', async () => {
      const res = await witnessApi.getWitnesses([14793]);
      expect(res).to.be.instanceOf(Array);
    });
  });

  describe('Get witnesses by vote', () => {
    it('should return a witness array', async () => {
      const res = await witnessApi.getWitnessesByVote(50);
      expect(res).to.be.instanceOf(Array);
    });
  });

  describe('Lookup witness accounts', () => {
    it('should return a witness array', async () => {
      const res = await witnessApi.lookupWitnessAccounts('peter', 50);
      expect(res).to.be.instanceOf(Array);
    });
  });
});
