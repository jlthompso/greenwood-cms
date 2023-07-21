'use client';

import { Grid, Divider } from '../components/material';
import Post from '../components/post';

export default function PostList(props) {
  return (
    <Grid container spacing={2}>
      {props.posts.map(post => 
          <Grid item xs={12}>
              <Post post={post} />
              <Divider />
          </Grid>
      )}
    </Grid>
  );
}