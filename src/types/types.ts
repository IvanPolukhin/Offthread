export type Post = {
  id?: number;
  title: string;
  content: string;
  date: string;
  status: 'pending' | 'offline' | 'synced';
};
