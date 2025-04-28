import Dexie, { Table } from 'dexie';
import { Post } from 'src/types';
import { LocalChange } from 'src/db/types.ts';

export class OffthreadDB extends Dexie {
  posts!: Table<Post, number>;
  localChanges!: Table<LocalChange, number>;

  constructor() {
    super('offthread');
    this.version(6).stores({
      posts: '++id, serverId, title, content, date, status',
      localChanges: '++id, type, entity',
    });
  }
}

export const db = new OffthreadDB();
