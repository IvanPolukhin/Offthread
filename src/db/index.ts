import Dexie, { Table } from 'dexie';
import { Post } from 'src/types';

export class OffthreadDB extends Dexie {
  posts!: Table<Post, number>;
  constructor() {
    super('offthread');
    this.version(1).stores({
      posts: '++id, title, content, date',
    });
  }
}

export const db = new OffthreadDB();
