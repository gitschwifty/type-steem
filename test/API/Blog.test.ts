import '@babel/polyfill';
import { BlogAPI, Client } from '../../src';
import chai from 'chai';
const expect = chai.expect;

const blogApi = new BlogAPI(new Client('https://rpc.steemviz.com'));

describe('BlogAPI', function() {
  this.slow(5000);
  this.timeout(20000);

  describe('Get Active Votes', () => {
    it('should return array', async () => {
      const res = await blogApi.getActiveVotes(
        'petertag',
        'partiko-runs-facebook-ads-mvclccga'
      );
      expect(res).to.instanceOf(Array);
    });
  });

  describe('Get blog', () => {
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
    it('should return an array', async () => {
      const res = await blogApi.getBlogAuthors('petertag');
      expect(res).to.instanceOf(Array);
    });
  });

  describe('Get blog entries', () => {
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

  describe('Get discussions', () => {
    it('Should return an array', async () => {
      const res = await blogApi.getDiscussions('active', {
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

  describe('Get discussions by comments', () => {
    it('Should return an array', async () => {
      const res = await blogApi.getDiscussionsByComments('petertag', 10);
      expect(res).to.instanceOf(Array);
    });
  });

  describe('Get discussions by feed', () => {
    it('Should return an array', async () => {
      const res = await blogApi.getDiscussionsByFeed('petertag', 10);
      expect(res).to.instanceOf(Array);
    });
  });

  describe('Get feed', () => {
    it('returns forking steem post', async () => {
      const res = await blogApi.getFeed('petertag', 0, 10);
      expect(res).to.instanceOf(Array);
    });
  });

  describe('Get feed entries', () => {
    it('returns forking steem post', async () => {
      const res = await blogApi.getFeedEntries('petertag', 0, 10);
      expect(res).to.instanceOf(Array);
    });
  });

  describe('Get follow count', () => {
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
    it('should return an array of followers', async () => {
      const res = await blogApi.getFollows('petertag', 'blog', 10, false);
      expect(res).to.instanceOf(Array);
    });

    it('should return an array of following', async () => {
      const res = await blogApi.getFollows('petertag', 'blog', 10);
      expect(res).to.instanceOf(Array);
    });
  });
});
