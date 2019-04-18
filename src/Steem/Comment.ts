import { Asset } from './Asset';

export interface Content {
  abs_rshares: number;
  active: string;
  active_votes: ActiveVote[];
  allow_curation_rewards: boolean;
  allow_replies: boolean;
  allow_votes: boolean;
  author: string;
  author_reputation: number;
  author_rewards: number;
  beneficiaries: any[];
  body: string;
  body_length: number;
  cashout_time: string;
  category: string;
  children: number;
  children_abs_rshares: number;
  created: string;
  curator_payout_value: string;
  depth: number;
  id: number;
  json_metadata: string;
  last_payout: string;
  last_update: string;
  max_accepted_payout: string;
  max_cashout_time: string;
  net_rshares: number;
  net_votes: number;
  parent_author: string;
  parent_permlink: string;
  pending_payout_value: string;
  percent_steem_dollars: number;
  permlink: string;
  promoted: string;
  reblogged_by: any[];
  replies: any[];
  reward_weight: number;
  root_author: string;
  root_permlink: string;
  root_title: string;
  title: string;
  total_payout_value: string;
  total_pending_payout_value: string;
  total_vote_weight: number;
  url: string;
  vote_rshares: number;
}

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
