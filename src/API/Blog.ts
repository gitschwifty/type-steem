import { Client, APIResult, APIType, ClientOptions } from './Client';

export interface DiscussionFilter {
  tag: string;
  limit: number;
  filterTags: string[];
  selectAuthors: string[];
  selectTags: string[];
  truncateBody: number;
}

export class BlogAPI extends Client {
  constructor(node?: string, options?: ClientOptions) {
    super(node, options);
  }

  public getActiveVotes(author: string, permlink: string) {
    if (author.length === 0 || permlink.length === 0) {
      throw new Error('Must pass an author and permlink.');
    }
    return this.callApi(APIType.cond, 'get_active_votes', [author, permlink]);
  }

  public getBlog(account: string, startId: number, limit: number) {
    if (account.length === 0) {
      throw new Error('Must pass an account name.');
    }

    if (startId < 0) {
      throw new Error('Start id cannot be negative.');
    }

    if (limit < 1) {
      throw new Error('Limit must be greater than 0.');
    }

    if (limit > 500) {
      throw new Error('Limit must be less than or equal to 500.');
    }

    return this.callApi(APIType.cond, 'get_blog', [account, startId, limit]);
  }

  public getBlogAuthors(account: string) {
    if (account.length === 0) {
      throw new Error('Must pass an account name.');
    }

    return this.callApi(APIType.cond, 'get_blog_authors', [account]);
  }

  public getBlogEntries(account: string, startId: number, limit: number) {
    if (account.length === 0) {
      throw new Error('Must pass an account name.');
    }

    if (startId < 0) {
      throw new Error('Start id cannot be negative.');
    }

    if (limit < 1) {
      throw new Error('Limit must be greater than 0.');
    }

    if (limit > 500) {
      throw new Error('Limit must be less than or equal to 500.');
    }

    return this.callApi(APIType.cond, 'get_blog_entries', [
      account,
      startId,
      limit
    ]);
  }

  public getCommentDiscussionsByPayout(filter: DiscussionFilter) {
    return this.callApi(APIType.cond, 'get_comment_discussions_by_payout', [
      filter
    ]);
  }

  public getDiscussionsByActive(filter: DiscussionFilter) {
    return this.callApi(APIType.cond, 'get_discussions_by_active', [filter]);
  }

  public getDiscussionsByAuthorBeforeDate(
    author: string,
    permlink: string,
    date: string,
    limit: number
  ) {
    if (author.length === 0 || permlink.length === 0 || date.length === 0) {
      throw new Error('Author, permlink, and date must be strings.');
    }

    if (limit < 1) {
      throw new Error('Limit must be positive.');
    }

    return this.callApi(APIType.cond, 'get_discussions_by_author_before_date', [
      author,
      permlink,
      date,
      limit
    ]);
  }

  public getDiscussionsByBlog(filter: DiscussionFilter) {
    return this.callApi(APIType.cond, 'get_discussions_by_blog', [filter]);
  }

  public getDiscussionsByCashout(filter: DiscussionFilter) {
    return this.callApi(APIType.cond, 'get_discussions_by_cashout', [filter]);
  }

  public getDiscussionsByChildren(filter: DiscussionFilter) {
    return this.callApi(APIType.cond, 'get_discussions_by_children', [filter]);
  }

  public getDiscussionsByComments(filter: {
    start_author: string;
    start_permlink: string | null;
    limit: number;
  }) {
    if (!filter.start_author) {
      throw new Error('Author must be non-empty string.');
    }

    if (filter.limit < 1 || filter.limit > 500) {
      throw new Error('Limit must be positive and less than 500.');
    }

    return this.callApi(APIType.cond, 'get_discussions_by_comments', [filter]);
  }

  public getDiscussionsByCreated(filter: DiscussionFilter) {
    return this.callApi(APIType.cond, 'get_discussions_by_created', [filter]);
  }

  public getDiscussionsByFeed(filter: { tag: string; limit: number }) {
    if (filter.tag.length < 1) {
      throw new Error('Tag must be a string.');
    }

    if (filter.limit < 1 || filter.limit > 500) {
      throw new Error('Limit must be positive and less than 500.');
    }

    return this.callApi(APIType.cond, 'get_discussions_by_feed', [filter]);
  }

  public getDiscussionsByHot(filter: DiscussionFilter) {
    return this.callApi(APIType.cond, 'get_discussions_by_hot', [filter]);
  }

  public getDiscussionsByPromoted(filter: DiscussionFilter) {
    return this.callApi(APIType.cond, 'get_discussions_by_promoted', [filter]);
  }

  public getDiscussionsByTrending(filter: DiscussionFilter) {
    return this.callApi(APIType.cond, 'get_discussions_by_trending', [filter]);
  }

  public getDiscussionsByVotes(filter: DiscussionFilter) {
    return this.callApi(APIType.cond, 'get_discussions_by_votes', [filter]);
  }

  public getFeed(account: string, startId: number, limit: number) {
    if (account.length === 0) {
      throw new Error('Must pass an account name.');
    }

    if (startId < 0) {
      throw new Error('Start id cannot be negative.');
    }

    if (limit < 1) {
      throw new Error('Limit must be greater than 0.');
    }

    if (limit > 500) {
      throw new Error('Limit must be less than or equal to 500.');
    }

    return this.callApi(APIType.cond, 'get_feed', [account, startId, limit]);
  }

  public getFeedEntries(account: string, startId: number, limit: number) {
    if (account.length === 0) {
      throw new Error('Must pass an account name.');
    }

    if (startId < 0) {
      throw new Error('Start id cannot be negative.');
    }

    if (limit < 1) {
      throw new Error('Limit must be greater than 0.');
    }

    if (limit > 500) {
      throw new Error('Limit must be less than or equal to 500.');
    }

    return this.callApi(APIType.cond, 'get_feed_entries', [
      account,
      startId,
      limit
    ]);
  }

  public getFollowCount(account: string) {
    if (account.length === 0) {
      throw new Error('Account must be a string.');
    }

    return this.callApi(APIType.cond, 'get_follow_count', [account]);
  }

  public getFollowers(
    account: string,
    start: string,
    type: string,
    limit: number
  ) {
    if (account.length === 0 || type.length === 0) {
      throw new Error('Account and type must be strings.');
    }

    if (limit < 1 || limit > 1000) {
      throw new Error('Limit must be positive and less than 1000.');
    }

    return this.callApi(APIType.cond, 'get_followers', [
      account,
      start,
      type,
      limit
    ]);
  }

  public getFollowing(
    account: string,
    start: string,
    type: string,
    limit: number
  ) {
    if (account.length === 0 || type.length === 0) {
      throw new Error('Account and type must be strings.');
    }

    if (limit < 1 || limit > 1000) {
      throw new Error('Limit must be positive and less than 1000.');
    }

    return this.callApi(APIType.cond, 'get_following', [
      account,
      start,
      type,
      limit
    ]);
  }
}
