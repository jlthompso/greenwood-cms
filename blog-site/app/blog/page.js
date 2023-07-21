import PostList from '../components/postList';

async function fetchLatestPosts() {
  const res = await fetch('http://localhost:3000/latest', { cache: 'no-store' });
  return res.json();
}

export default async function Blog() {
  const posts = await fetchLatestPosts();

  return (
    <PostList posts={posts} />
  );
}