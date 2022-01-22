import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type CommentMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type BlogPostMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Comment {
  readonly id: string;
  readonly content?: string;
  readonly created_at?: string;
  readonly user_id?: string;
  readonly blogpost_id?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Comment, CommentMetaData>);
  static copyOf(source: Comment, mutator: (draft: MutableModel<Comment, CommentMetaData>) => MutableModel<Comment, CommentMetaData> | void): Comment;
}

export declare class User {
  readonly id: string;
  readonly name?: string;
  readonly email?: string;
  readonly phone?: string;
  readonly BlogPosts?: (BlogPost | null)[];
  readonly Comments?: (Comment | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

export declare class BlogPost {
  readonly id: string;
  readonly title?: string;
  readonly content?: string;
  readonly created_at?: string;
  readonly updated_at?: string;
  readonly user_id?: string;
  readonly Comments?: (Comment | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<BlogPost, BlogPostMetaData>);
  static copyOf(source: BlogPost, mutator: (draft: MutableModel<BlogPost, BlogPostMetaData>) => MutableModel<BlogPost, BlogPostMetaData> | void): BlogPost;
}