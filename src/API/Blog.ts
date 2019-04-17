import { Client, APIResult, APIType, ClientOptions } from './Client';
import { CheckParams } from '../Helpers/Utils';
import { Asset } from '../Steem/Asset';
import { stringify } from 'querystring';

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

export interface ActiveVote {
  voter: string;
  weight: string;
  rshares: number;
  percent: number;
  reputation: string;
  time?: string;
}

export interface BlogPost {
  blog: string;
  comment: Comment;
  entry_id: number;
  reblog_on: string;
}

export interface FeedPost {
  comment: Comment;
  entry_id: number;
  reblog_on: string;
  reblog_by: any[];
}

export interface FeedEntry {
  author: string;
  entry_id: number;
  permlink: string;
  reblog_by: any[];
  reblog_on: string;
}

export interface Comment {
  abs_rshares: number;
  active: string;
  allow_curation_rewards: boolean;
  allow_replies: boolean;
  allow_votes: boolean;
  author: string;
  author_rewards: number;
  beneficiaries: any[];
  body: string;
  cashout_time: string;
  category: string;
  children: number;
  children_abs_rshares: string;
  created: string;
  curator_payout_value: Asset;
  depth: number;
  id: number;
  json_metadata: string;
  last_payout: string;
  last_update: string;
  max_accepted_payout: Asset;
  max_cashout_time: string;
  net_rshares: number;
  net_votes: number;
  parent_author: string;
  parent_permlink: string;
  percent_steem_dollars: number;
  permlink: string;
  reward_weight: number;
  root_author: string;
  root_permlink: string;
  title: string;
  total_payout_value: Asset;
  total_vote_weight: number;
  vote_rshares: number;
}

export interface BlogEntry {
  author: string;
  blog: string;
  entry_id: number;
  permlink: string;
  reblog_on: string;
}

export interface Post {
  active_votes: ActiveVote[];
  author: string;
  author_reputation: number;
  beneficiaries: any[];
  body: string;
  body_length: number;
  cashout_time: string;
  category: string;
  children: number;
  created: string;
  curator_payout_value: string;
  depth: number;
  json_metadata: string;
  last_payout: string;
  last_update: string;
  max_accepted_payout: string;
  net_rshares: number;
  parent_author: string;
  parent_permlink: string;
  pending_payout_value: string;
  percent_steem_dollars: number;
  permlink: string;
  post_id: number;
  promoted: string;
  replies: any[];
  root_title: string;
  title: string;
  total_payout_value: string;
  url: string;
}

export interface Follower {
  follower: string;
  following: string;
  what: string[];
}

export class BlogAPI {
  private client: Client;
  constructor(client?: Client) {
    this.client = client ? client : new Client();
  }

  public getActiveVotes(author: string, permlink: string) {
    CheckParams({ author, permlink });

    return this.client.callCondenserApi<ActiveVote[]>('get_active_votes', [
      author,
      permlink
    ]);
  }

  public getBlog(account: string, startId: number, limit: number) {
    CheckParams({ account, startId, limit }, 500);

    return this.client.callCondenserApi<BlogPost[]>('get_blog', [
      account,
      startId,
      limit
    ]);
  }

  public getBlogAuthors(account: string) {
    CheckParams({ account });

    return this.client.callCondenserApi<{ author: string; count: number }>(
      'get_blog_authors',
      [account]
    );
  }

  public getBlogEntries(account: string, startId: number, limit: number) {
    CheckParams({ account, startId, limit }, 500);

    return this.client.callCondenserApi<BlogEntry[]>('get_blog_entries', [
      account,
      startId,
      limit
    ]);
  }

  public getCommentDiscussionsByPayout(filter: DiscussionFilter) {
    return this.client.callCondenserApi<Post[]>(
      'get_comment_discussions_by_payout',
      [filter]
    );
  }

  public getDiscussions(by: DiscussionSort, filter: DiscussionFilter) {
    return this.client.callCondenserApi<Post[]>('get_discussions_by_' + by, [
      filter
    ]);
  }

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

  public getDiscussionsByFeed(tag: string, limit: number) {
    CheckParams({ tag, limit }, 500);

    return this.client.callCondenserApi<Post[]>('get_discussions_by_feed', [
      { tag, limit }
    ]);
  }

  public getFeed(account: string, startId: number, limit: number) {
    CheckParams({ account, startId, limit }, 500);

    return this.client.callCondenserApi<FeedPost[]>('get_feed', [
      account,
      startId,
      limit
    ]);
  }

  public getFeedEntries(account: string, startId: number, limit: number) {
    CheckParams({ account, startId, limit }, 500);

    return this.client.callCondenserApi<FeedEntry[]>('get_feed_entries', [
      account,
      startId,
      limit
    ]);
  }

  public getFollowCount(account: string) {
    CheckParams({ account });

    return this.client.callCondenserApi<{
      account: string;
      follower_count: number;
      following_count: number;
    }>('get_follow_count', [account]);
  }

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
