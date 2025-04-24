import { Post } from "src/types";

export type LocalChange = {
  id?: number;
  type: 'create' | 'update' | 'delete';
  entity: 'post';
  payload: Post;
}
