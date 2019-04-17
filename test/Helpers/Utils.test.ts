import '@babel/polyfill';
import { CheckParams, TestType, SignedBlock } from '../../dist';
import chai from 'chai';
const expect = chai.expect;

describe('Utility functions', () => {
  describe('Check parameters', () => {
    describe('Check string parameters', () => {
      it('should throw empty string error.', () => {
        try {
          CheckParams({ account: '' });
        } catch (err) {
          expect(err.message).to.equal(
            'String parameter account cannot be empty.'
          );
        }
      });

      it('should return with no error', () => {
        CheckParams({ account: 'petertag' });
      });
    });

    describe('Check number parameters', () => {
      it('should throw < 0 error', () => {
        try {
          CheckParams({ id: -1 });
        } catch (err) {
          expect(err.message).to.equal('Parameter id must be >= 0.');
        }
      });

      it('should throw < 1 error', () => {
        try {
          CheckParams({ limit: 0 });
        } catch (err) {
          expect(err.message).to.equal('Parameter limit must be >= 1.');
        }
      });

      it('should throw > max error', () => {
        try {
          CheckParams({ limit: 500 }, 100);
        } catch (err) {
          expect(err.message).to.equal('Parameter limit must be <= 100.');
        }
      });

      it('should throw no errors', () => {
        CheckParams({ id: 5, limit: 30, blockNum: 30 }, 5000);
      });
    });

    describe('Check string array parameters', () => {
      it('should throw empty string array error.', () => {
        try {
          CheckParams({ accounts: [''] });
        } catch (err) {
          expect(err.message).to.equal(
            'Must pass at least one non-empty string in array accounts.'
          );
        }
      });

      it('should throw no error.', () => {
        CheckParams({ accounts: ['petertag'] });
      });
    });
  });
});
