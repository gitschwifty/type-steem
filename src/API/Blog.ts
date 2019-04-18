/**
 * @file Blog API Class.
 * @author Peter James Taggart <code@pjtaggart.com>
 */

import { Client } from './Client';
import { CheckParams } from '../Helpers/Utils';
import {
  ActiveVote,
  BlogPost,
  BlogEntry,
  Post,
  FeedPost,
  FeedEntry
} from '../Steem/Comment';
import { Follower } from '../Steem/Account';
import { API } from './API';

/**
 * Filter for get_discussion calls.
 */
export interface DiscussionFilter {
  tag: string;
  limit: number;
  filterTags: string[];
  selectAuthors: string[];
  selectTags: string[];
  truncateBody: number;
}

/**
 * Sort types for get_discussion calls.
 */
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

/**
 * Blog API Class. Takes a client as a parameter or creates its own default.
 */
export class BlogAPI extends API {
  constructor(client?: Client) {
    super(client);
  }

  /**
   * Gets active votes on a post
   * @param author
   * @param permlink
   * @returns Array of votes
   */
  public getActiveVotes(author: string, permlink: string) {
    CheckParams({ author, permlink });

    return this.client.callCondenserApi<ActiveVote[]>('get_active_votes', [
      author,
      permlink
    ]);
  }

  /**
   * Gets limit blog posts from account starting from startId
   * @param account account name
   * @param startId positive integer
   * @param limit 500 >= integer > 0
   */
  public getBlog(account: string, startId: number, limit: number) {
    CheckParams({ account, startId, limit }, 500);

    return this.client.callCondenserApi<BlogPost[]>('get_blog', [
      account,
      startId,
      limit
    ]);
  }

  /**
   * Gets authors that have been reblogged on account & number of reblogs
   * @param account account name
   */
  public getBlogAuthors(account: string) {
    CheckParams({ account });

    return this.client.callCondenserApi<{ author: string; count: number }>(
      'get_blog_authors',
      [account]
    );
  }

  /**
   * Gets limit blog entries from account starting from startId
   * @param account account name
   * @param startId positive integer
   * @param limit 500 >= integer > 0
   */
  public getBlogEntries(account: string, startId: number, limit: number) {
    CheckParams({ account, startId, limit }, 500);

    return this.client.callCondenserApi<BlogEntry[]>('get_blog_entries', [
      account,
      startId,
      limit
    ]);
  }

  /**
   * Gets discussions by payout
   * @param filter how to filter the discussions
   */
  public getCommentDiscussionsByPayout(filter: DiscussionFilter) {
    return this.client.callCondenserApi<Post[]>(
      'get_comment_discussions_by_payout',
      [filter]
    );
  }

  /**
   * Gets discussions by a sort type
   * @param by sort type
   * @param filter how to filter the discussions (for blog tag is author)
   */
  public getDiscussions(by: DiscussionSort, filter: DiscussionFilter) {
    return this.client.callCondenserApi<Post[]>('get_discussions_by_' + by, [
      filter
    ]);
  }

  /**
   * Gets posts by an author before a date
   * @param author
   * @param permlink link to post to start from
   * @param date date to include to
   * @param limit 0 < integer <= 500
   */
  public getDiscussionsByAuthorBeforeDate(
    author: string,
    permlink: string,
    date: string,
    limit: number
  ) {
    CheckParams({ author, permlink, date, limit }, 500);

    return this.client.callCondenserApi<Post[]>(
      'get_discussions_by_author_before_date',
      [author, permlink, date, limit]
    );
  }

  /**
   * Gets comments on post
   * @param startAuthor author to start from
   * @param limit number of comments
   * @param startPermlink root permlink
   */
  public getDiscussionsByComments(
    startAuthor: string,
    limit: number,
    startPermlink?: string
  ) {
    CheckParams({ startAuthor, limit }, 500);

    return this.client.callCondenserApi<Post[]>('get_discussions_by_comments', [
      { start_author: startAuthor, start_permlink: startPermlink, limit }
    ]);
  }

  /**
   * Gets posts by a tag
   * @param tag
   * @param limit 0 < integer <= 500
   */
  public getDiscussionsByFeed(tag: string, limit: number) {
    CheckParams({ tag, limit }, 500);

    return this.client.callCondenserApi<Post[]>('get_discussions_by_feed', [
      { tag, limit }
    ]);
  }

  /**
   * Gets account name's feed
   * @param account account name
   * @param startId id to start from
   * @param limit number of feed posts to get
   */
  public getFeed(account: string, startId: number, limit: number) {
    CheckParams({ account, startId, limit }, 500);

    return this.client.callCondenserApi<FeedPost[]>('get_feed', [
      account,
      startId,
      limit
    ]);
  }

  /**
   * Gets account name's feed entries
   * @param account account name
   * @param startId id to start from
   * @param limit number of feed posts to get
   */
  public getFeedEntries(account: string, startId: number, limit: number) {
    CheckParams({ account, startId, limit }, 500);

    return this.client.callCondenserApi<FeedEntry[]>('get_feed_entries', [
      account,
      startId,
      limit
    ]);
  }

  /**
   * Gets account's follower and following number
   * @param account
   */
  public getFollowCount(account: string) {
    CheckParams({ account });

    return this.client.callCondenserApi<{
      account: string;
      follower_count: number;
      following_count: number;
    }>('get_follow_count', [account]);
  }

  /**
   * Get's account following or followers, up to limit
   * @param account
   * @param type 'blog'
   * @param limit 0 < integer <= 1000
   * @param following pass false for followers, true for following
   * @param start optional follow name to start from
   */
  public getFollows(
    account: string,
    type: string,
    limit: number,
    following: boolean = true,
    start?: string
  ) {
    CheckParams({ account, type, limit }, 1000);
    const method = following ? 'get_following' : 'get_followers';

    return this.client.callCondenserApi<Follower[]>(method, [
      account,
      start,
      type,
      limit
    ]);
  }
}
