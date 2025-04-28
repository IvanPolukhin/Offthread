export type Post = {
  id?: number;
  serverId?: string;
  title: string;
  content: string;
  date: string;
  status: 'pending' | 'offline' | 'synced';
};
