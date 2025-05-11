export type Post = {
  serverId: string;
  title: string;
  content: string;
  date: string;
  status: 'pending' | 'offline' | 'synced';
};
