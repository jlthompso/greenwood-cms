import { Grid, Box, Divider } from '../components/material';
import Post from '../components/post';

async function fetchLatestPosts() {
  const res = await fetch('http://localhost:3000/latest');
  return res.json();
}

export default async function Blog() {
  const posts = await fetchLatestPosts();

  return (
    <Grid container spacing={2}>
      {posts.map(post => 
          <Grid item xs={12}>
              <Post post={post} />
              <Divider />
          </Grid>
      )}
    </Grid>
  );
}