import { Client, APIResult, APIType, ClientOptions } from './Client';

export interface DiscussionFilter {
  tag: string;
  limit: number;
  filterTags: string[];
  selectAuthors: string[];
  selectTags: string[];
  truncateBody: number;
}

export type DiscussionSort =
  | 'active'
  | 'blog'
  | 'cashout'
  | 'children'
  | 'created'
  | 'hot'
  | 'promoted'
  | 'trending'
  | 'votes';

export class BlogAPI extends Client {
  constructor(node?: string, options?: ClientOptions) {
    super(node, options);
  }

  public getActiveVotes(author: string, permlink: string) {
    this.checkParams({ author, permlink });

    return this.callCondenserApi('get_active_votes', [author, permlink]);
  }

  public getBlog(account: string, startId: number, limit: number) {
    this.checkParams({ account, startId, limit }, 500);

    return this.callCondenserApi('get_blog', [account, startId, limit]);
  }

  public getBlogAuthors(account: string) {
    this.checkParams({ account });

    return this.callCondenserApi('get_blog_authors', [account]);
  }

  public getBlogEntries(account: string, startId: number, limit: number) {
    this.checkParams({ account, startId, limit }, 500);

    return this.callCondenserApi('get_blog_entries', [account, startId, limit]);
  }

  public getCommentDiscussionsByPayout(filter: DiscussionFilter) {
    return this.callCondenserApi('get_comment_discussions_by_payout', [filter]);
  }

  public getDiscussions(by: DiscussionSort, filter: DiscussionFilter) {
    return this.callCondenserApi('get_discussions_by_' + by, [filter]);
  }

  public getDiscussionsByAuthorBeforeDate(
    author: string,
    permlink: string,
    date: string,
    limit: number
  ) {
    this.checkParams({ author, permlink, date, limit }, 500);

    return this.callCondenserApi('get_discussions_by_author_before_date', [
      author,
      permlink,
      date,
      limit
    ]);
  }

  public getDiscussionsByComments(
    startAuthor: string,
    limit: number,
    startPermlink?: string
  ) {
    this.checkParams({ startAuthor, limit }, 500);

    return this.callCondenserApi('get_discussions_by_comments', [
      { start_author: startAuthor, start_permlink: startPermlink, limit }
    ]);
  }

  public getDiscussionsByFeed(tag: string, limit: number) {
    this.checkParams({ tag, limit }, 500);

    return this.callCondenserApi('get_discussions_by_feed', [{ tag, limit }]);
  }

  public getFeed(account: string, startId: number, limit: number) {
    this.checkParams({ account, startId, limit }, 500);

    return this.callCondenserApi('get_feed', [account, startId, limit]);
  }

  public getFeedEntries(account: string, startId: number, limit: number) {
    this.checkParams({ account, startId, limit }, 500);

    return this.callCondenserApi('get_feed_entries', [account, startId, limit]);
  }

  public getFollowCount(account: string) {
    this.checkParams({ account });

    return this.callCondenserApi('get_follow_count', [account]);
  }

  public getFollowers(
    account: string,
    type: string,
    limit: number,
    start?: string
  ) {
    this.checkParams({ account, type, limit }, 1000);

    return this.callCondenserApi('get_followers', [
      account,
      start,
      type,
      limit
    ]);
  }

  public getFollowing(
    account: string,
    type: string,
    limit: number,
    start?: string
  ) {
    this.checkParams({ account, type, limit }, 1000);

    return this.callCondenserApi('get_following', [
      account,
      start,
      type,
      limit
    ]);
  }
}
