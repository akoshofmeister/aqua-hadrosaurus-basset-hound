// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Comment, User, BlogPost } = initSchema(schema);

export {
  Comment,
  User,
  BlogPost
};