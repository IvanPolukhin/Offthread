import Dexie, { Table } from 'dexie';
import { Post } from 'src/types';
import { LocalChange } from 'src/db/types.ts';

export class OffthreadDB extends Dexie {
  posts!: Table<Post, number>;
  localChanges!: Table<LocalChange, number>;
  constructor() {
    super('offthread');
    this.version(2).stores({
      posts: '++id, title, content, date',
      localChanges: '++id, type, entity',
    });
  }
}

export const db = new OffthreadDB();
