import '@babel/polyfill';
import { MarketAPI, APIType } from '../../dist';
import chai from 'chai';
const expect = chai.expect;

const marketApi = new MarketAPI();

describe('MarketAPI', function() {
  this.slow(3000);
  this.timeout(10000);

  describe('Get current median history price', () => {
    it('should return *.*** SBD to 1.000 STEEM', async () => {
      const res = await marketApi.getCurrentMedianHistoryPrice();
      if (res instanceof Object && !(res instanceof Array)) {
        expect(res.base).to.match(/([0-9]\.[0-9]{3} SBD)/);
        expect(res.quote).to.equal('1.000 STEEM');
      }
    });
  });

  describe('Get feed history', () => {
    it('should return current price & last 50 at least', async () => {
      const res = await marketApi.getFeedHistory();
      if (
        res instanceof Object &&
        !(res instanceof Array) &&
        res.current_median_history instanceof Object &&
        !(res.current_median_history instanceof Array) &&
        res.price_history instanceof Array
      ) {
        expect(res.current_median_history.base).to.match(
          /([0-9]\.[0-9]{3} SBD)/
        );
        expect(res.current_median_history.quote).to.equal('1.000 STEEM');
        expect(res.price_history.length).to.greaterThan(50);
      }
    });
  });

  describe('Get market history', () => {
    it('should throw invalid segment error', async () => {
      try {
        await marketApi.getMarketHistory(
          0,
          '2018-01-01T00:00:00',
          '2018-01-02T00:00:00'
        );
      } catch (err) {
        expect(err.message).to.equal(
          'Bucket segments must be greater than 1 second.'
        );
      }
    });

    it('should throw empty string error', async () => {
      try {
        await marketApi.getMarketHistory(60, '', '');
      } catch (err) {
        expect(err.message).to.equal('String parameter start cannot be empty.');
      }
    });

    it('should return an array', async () => {
      const res = await marketApi.getMarketHistory(
        60,
        '2018-01-01T00:00:00',
        '2018-01-02T00:00:00'
      );
      expect(res).to.be.instanceOf(Array);
    });
  });

  describe('Get open orders', () => {
    it('should throw empty string error', async () => {
      try {
        await marketApi.getOpenOrders('');
      } catch (err) {
        expect(err.message).to.equal(
          'String parameter account cannot be empty.'
        );
      }
    });

    it('should return an array', async () => {
      const res = await marketApi.getOpenOrders('petertag');
      expect(res).to.be.instanceOf(Array);
    });
  });

  describe('Get order book', () => {
    it('should throw invalid limit error', async () => {
      try {
        await marketApi.getOrderBook(0);
      } catch (err) {
        expect(err.message).to.equal('Parameter limit must be >= 1.');
      }
    });

    it('should return an object', async () => {
      const res = await marketApi.getOrderBook(10);
      expect(res).to.be.instanceOf(Object);
    });
  });

  describe('Get recent trades', () => {
    it('should throw invalid limit error', async () => {
      try {
        await marketApi.getRecentTrades(0);
      } catch (err) {
        expect(err.message).to.equal('Parameter limit must be >= 1.');
      }
    });

    it('should return an array', async () => {
      const res = await marketApi.getRecentTrades(10);
      expect(res).to.be.instanceOf(Array);
    });
  });

  describe('Get ticker', () => {
    it('should return a ticker object', async () => {
      const res = await marketApi.getTicker();
      if (res instanceof Object && !(res instanceof Array)) {
        expect(res.steem_volume).to.match(/([0-9]+\.[0-9]+ STEEM)/);
      } else {
        expect(true).equal(false);
      }
    });
  });

  describe('Get trade history', () => {
    it('should throw an invalid limit error', async () => {
      try {
        await marketApi.getTradeHistory(
          '2018-01-01T00:00:00',
          '2018-01-02T00:00:00',
          0
        );
      } catch (err) {
        expect(err.message).to.equal('Parameter limit must be >= 1.');
      }
    });

    it('should throw an invalid date error', async () => {
      try {
        await marketApi.getTradeHistory('', '', 5);
      } catch (err) {
        expect(err.message).to.equal('String parameter start cannot be empty.');
      }
    });

    it('should return an array', async () => {
      const res = await marketApi.getTradeHistory(
        '2018-01-01T00:00:00',
        '2018-01-02T00:00:00',
        20
      );
      expect(res).to.be.instanceOf(Array);
    });
  });

  describe('Get volume', () => {
    it('should return a volume object', async () => {
      const res = await marketApi.getVolume();
      if (res instanceof Object && !(res instanceof Array)) {
        expect(res.steem_volume).to.match(/([0-9]+\.[0-9]+ STEEM)/);
      } else {
        expect(true).equal(false);
      }
    });
  });
});
