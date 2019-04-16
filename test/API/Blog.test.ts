import '@babel/polyfill';
import { BlogAPI, APIResult } from '../../dist';
import chai from 'chai';
const expect = chai.expect;

const blogApi = new BlogAPI('https://rpc.steemviz.com');

describe('BlogAPI', function() {
  this.slow(5000);
  this.timeout(20000);

  describe('Get Active Votes', () => {
    it('throws empty parameter error', async () => {
      try {
        await blogApi.getActiveVotes('', '');
      } catch (err) {
        expect(err.message).to.equal(
          'String parameter author cannot be empty.'
        );
      }
    });

    it('should return array', async () => {
      const res = await blogApi.getActiveVotes(
        'petertag',
        'partiko-runs-facebook-ads-mvclccga'
      );
      expect(res).to.instanceOf(Array);
    });
  });

  describe('Get blog', () => {
    it('throws empty account error', async () => {
      try {
        await blogApi.getBlog('', 0, 10);
      } catch (err) {
        expect(err.message).to.equal(
          'String parameter account cannot be empty.'
        );
      }
    });

    it('throws negative start id error', async () => {
      try {
        await blogApi.getBlog('petertag', -1, 10);
      } catch (err) {
        expect(err.message).to.equal('Parameter startId must be >= 0.');
      }
    });

    it('throws limit < 1 error', async () => {
      try {
        await blogApi.getBlog('petertag', 0, 0);
      } catch (err) {
        expect(err.message).to.equal('Parameter limit must be >= 1.');
      }
    });

    it('throws limit > 500 error', async () => {
      try {
        await blogApi.getBlog('petertag', 0, 501);
      } catch (err) {
        expect(err.message).to.equal('Parameter limit must be <= 500.');
      }
    });

    it('returns recent steem post', async () => {
      const cleanBlogApi = new BlogAPI();
      const res = await cleanBlogApi.getBlog('petertag', 0, 1);
      let index = 0;
      if (res instanceof Array && res.length > 1) {
        index = res.length - 1;
      }
      expect(res[index].blog).to.equal('petertag');
    });
  });

  describe('Get Blog Authors', () => {
    it('should throw empty account error', async () => {
      try {
        await blogApi.getBlogAuthors('');
      } catch (err) {
        expect(err.message).to.equal(
          'String parameter account cannot be empty.'
        );
      }
    });

    it('should return an array', async () => {
      const res = await blogApi.getBlogAuthors('petertag');
      expect(res).to.instanceOf(Array);
    });
  });

  describe('Get blog entries', () => {
    it('throws empty account error', async () => {
      try {
        await blogApi.getBlogEntries('', 0, 10);
      } catch (err) {
        expect(err.message).to.equal(
          'String parameter account cannot be empty.'
        );
      }
    });

    it('throws negative start id error', async () => {
      try {
        await blogApi.getBlogEntries('petertag', -1, 10);
      } catch (err) {
        expect(err.message).to.equal('Parameter startId must be >= 0.');
      }
    });

    it('throws limit < 1 error', async () => {
      try {
        await blogApi.getBlogEntries('petertag', 0, 0);
      } catch (err) {
        expect(err.message).to.equal('Parameter limit must be >= 1.');
      }
    });

    it('throws limit > 500 error', async () => {
      try {
        await blogApi.getBlogEntries('petertag', 0, 501);
      } catch (err) {
        expect(err.message).to.equal('Parameter limit must be <= 500.');
      }
    });

    it('returns recent steem post', async () => {
      const cleanBlogApi = new BlogAPI();
      const res = await cleanBlogApi.getBlogEntries('petertag', 0, 1);
      expect(res[0].blog).to.equal('petertag');
    });
  });

  describe('Get comment discussions by payout', () => {
    it('Should return an array', async () => {
      const res = await blogApi.getCommentDiscussionsByPayout({
        tag: 'steem',
        limit: 10,
        filterTags: [],
        selectAuthors: [],
        selectTags: [],
        truncateBody: 1
      });
      expect(res).to.instanceOf(Array);
    });
  });

  describe('Get discussions by active', () => {
    it('Should return an array', async () => {
      const res = await blogApi.getDiscussionsByActive({
        tag: 'steem',
        limit: 10,
        filterTags: [],
        selectAuthors: [],
        selectTags: [],
        truncateBody: 1
      });
      expect(res).to.instanceOf(Array);
    });
  });

  describe('Get discussions by author before data', () => {
    it('Should throw empty string error', async () => {
      try {
        await blogApi.getDiscussionsByAuthorBeforeDate('', '', '', 1);
      } catch (err) {
        expect(err.message).to.equal(
          'String parameter author cannot be empty.'
        );
      }
    });

    it('Should throw limit < 1 error', async () => {
      try {
        await blogApi.getDiscussionsByAuthorBeforeDate(
          'petertag',
          'website-update-1-witness-utils',
          '2018-04-13T22:49:43',
          0
        );
      } catch (err) {
        expect(err.message).to.equal('Parameter limit must be >= 1.');
      }
    });

    it('Should return an array', async () => {
      const res = await blogApi.getDiscussionsByAuthorBeforeDate(
        'petertag',
        'website-update-1-witness-utils',
        '2018-04-13T22:49:43',
        10
      );
      expect(res).to.instanceOf(Array);
    });
  });

  describe('Get discussions by blog', () => {
    it('Should return an array', async () => {
      const res = await blogApi.getDiscussionsByBlog({
        tag: 'petertag',
        limit: 10,
        filterTags: [],
        selectAuthors: [],
        selectTags: [],
        truncateBody: 1
      });
      expect(res).to.instanceOf(Array);
    });
  });

  describe('Get discussions by cashout', () => {
    it('Should return an array', async () => {
      const res = await blogApi.getDiscussionsByCashout({
        tag: 'utopian-io',
        limit: 10,
        filterTags: [],
        selectAuthors: [],
        selectTags: [],
        truncateBody: 1
      });
      expect(res).to.be.instanceOf(Array);
    });
  });

  describe('Get discussions by children', () => {
    it('Should return an array', async () => {
      const res = await blogApi.getDiscussionsByChildren({
        tag: 'steem',
        limit: 10,
        filterTags: [],
        selectAuthors: [],
        selectTags: [],
        truncateBody: 1
      });
      expect(res).to.be.instanceOf(Array);
    });
  });

  describe('Get discussions by comments', () => {
    it('Should throw empty string error', async () => {
      try {
        await blogApi.getDiscussionsByComments('', 10);
      } catch (err) {
        expect(err.message).to.equal(
          'String parameter startAuthor cannot be empty.'
        );
      }
    });

    it('Should throw bad limit error', async () => {
      try {
        await blogApi.getDiscussionsByComments('petertag', 0);
      } catch (err) {
        expect(err.message).to.equal('Parameter limit must be >= 1.');
      }
    });

    it('Should return an array', async () => {
      const res = await blogApi.getDiscussionsByComments('petertag', 10);
      expect(res).to.instanceOf(Array);
    });
  });

  describe('Get discussions by created', () => {
    it('Should return an array', async () => {
      const res = await blogApi.getDiscussionsByCreated({
        tag: 'steem',
        limit: 10,
        filterTags: [],
        selectAuthors: [],
        selectTags: [],
        truncateBody: 1
      });
      expect(res).to.instanceOf(Array);
    });
  });

  describe('Get discussions by feed', () => {
    it('Should throw empty string error', async () => {
      try {
        await blogApi.getDiscussionsByFeed('', 10);
      } catch (err) {
        expect(err.message).to.equal('String parameter tag cannot be empty.');
      }
    });

    it('Should throw bad limit error', async () => {
      try {
        await blogApi.getDiscussionsByFeed('petertag', 0);
      } catch (err) {
        expect(err.message).to.equal('Parameter limit must be >= 1.');
      }
    });

    it('Should return an array', async () => {
      const res = await blogApi.getDiscussionsByFeed('petertag', 10);
      expect(res).to.instanceOf(Array);
    });
  });

  describe('Get discussions by hot', () => {
    it('Should return an array', async () => {
      const res = await blogApi.getDiscussionsByHot({
        tag: 'steem',
        limit: 10,
        filterTags: [],
        selectAuthors: [],
        selectTags: [],
        truncateBody: 1
      });
      expect(res).to.instanceOf(Array);
    });
  });

  describe('Get discussions by promoted', () => {
    it('Should return an array', async () => {
      const res = await blogApi.getDiscussionsByPromoted({
        tag: 'steem',
        limit: 10,
        filterTags: [],
        selectAuthors: [],
        selectTags: [],
        truncateBody: 1
      });
      expect(res).to.instanceOf(Array);
    });
  });

  describe('Get discussions by trending', () => {
    it('Should return an array', async () => {
      const res = await blogApi.getDiscussionsByTrending({
        tag: 'steem',
        limit: 10,
        filterTags: [],
        selectAuthors: [],
        selectTags: [],
        truncateBody: 1
      });
      expect(res).to.instanceOf(Array);
    });
  });

  describe('Get discussions by votes', () => {
    it('Should return an array', async () => {
      const res = await blogApi.getDiscussionsByVotes({
        tag: 'steem',
        limit: 1,
        filterTags: [],
        selectAuthors: [],
        selectTags: [],
        truncateBody: 1
      });
      expect(res).to.instanceOf(Array);
    });
  });

  describe('Get feed', () => {
    it('throws empty account error', async () => {
      try {
        await blogApi.getFeed('', 0, 10);
      } catch (err) {
        expect(err.message).to.equal(
          'String parameter account cannot be empty.'
        );
      }
    });

    it('throws negative start id error', async () => {
      try {
        await blogApi.getFeed('petertag', -1, 10);
      } catch (err) {
        expect(err.message).to.equal('Parameter startId must be >= 0.');
      }
    });

    it('throws limit < 1 error', async () => {
      try {
        await blogApi.getFeed('petertag', 0, 0);
      } catch (err) {
        expect(err.message).to.equal('Parameter limit must be >= 1.');
      }
    });

    it('throws limit > 500 error', async () => {
      try {
        await blogApi.getFeed('petertag', 0, 501);
      } catch (err) {
        expect(err.message).to.equal('Parameter limit must be <= 500.');
      }
    });

    it('returns forking steem post', async () => {
      const res = await blogApi.getFeed('petertag', 0, 10);
      expect(res).to.instanceOf(Array);
    });
  });

  describe('Get feed entries', () => {
    it('throws empty account error', async () => {
      try {
        await blogApi.getFeedEntries('', 0, 10);
      } catch (err) {
        expect(err.message).to.equal(
          'String parameter account cannot be empty.'
        );
      }
    });

    it('throws negative start id error', async () => {
      try {
        await blogApi.getFeedEntries('petertag', -1, 10);
      } catch (err) {
        expect(err.message).to.equal('Parameter startId must be >= 0.');
      }
    });

    it('throws limit < 1 error', async () => {
      try {
        await blogApi.getFeedEntries('petertag', 0, 0);
      } catch (err) {
        expect(err.message).to.equal('Parameter limit must be >= 1.');
      }
    });

    it('throws limit > 500 error', async () => {
      try {
        await blogApi.getFeedEntries('petertag', 0, 501);
      } catch (err) {
        expect(err.message).to.equal('Parameter limit must be <= 500.');
      }
    });

    it('returns forking steem post', async () => {
      const res = await blogApi.getFeedEntries('petertag', 0, 10);
      expect(res).to.instanceOf(Array);
    });
  });

  describe('Get follow count', () => {
    it('should throw empty string error', async () => {
      try {
        await blogApi.getFollowCount('');
      } catch (err) {
        expect(err.message).to.equal(
          'String parameter account cannot be empty.'
        );
      }
    });

    it('should return followers and following > 0', async () => {
      const res = await blogApi.getFollowCount('petertag');
      if (res instanceof Object && !(res instanceof Array)) {
        expect(res.follower_count).to.greaterThan(0);
        expect(res.following_count).to.greaterThan(0);
      } else {
        expect(true).equal(false);
      }
    });
  });

  describe('Get followers', () => {
    it('should throw empty string error', async () => {
      try {
        await blogApi.getFollowers('', 'blog', 10);
      } catch (err) {
        expect(err.message).to.equal(
          'String parameter account cannot be empty.'
        );
      }
    });

    it('should throw limit out of range error', async () => {
      try {
        await blogApi.getFollowers('petertag', 'blog', 0);
      } catch (err) {
        expect(err.message).to.equal('Parameter limit must be >= 1.');
      }
    });

    it('should return an array of followers', async () => {
      const res = await blogApi.getFollowers('petertag', 'blog', 10);
      expect(res).to.instanceOf(Array);
    });
  });

  describe('Get following', () => {
    it('should throw empty string error', async () => {
      try {
        await blogApi.getFollowing('', 'blog', 10);
      } catch (err) {
        expect(err.message).to.equal(
          'String parameter account cannot be empty.'
        );
      }
    });

    it('should throw limit out of range error', async () => {
      try {
        await blogApi.getFollowing('petertag', 'blog', 0);
      } catch (err) {
        expect(err.message).to.equal('Parameter limit must be >= 1.');
      }
    });

    it('should return an array of following', async () => {
      const res = await blogApi.getFollowing('petertag', 'blog', 10);
      expect(res).to.instanceOf(Array);
    });
  });
});
