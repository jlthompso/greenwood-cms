import NavigationBar from '../components/navigationBar';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function ViewPost() {
  const _id = useParams()["*"];
  const [post, setPost] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      (await fetch(`${process.env.REACT_APP_DATABASE_SERVICE}/${_id}`)).json().then(response => setPost(response));
    };

    fetchPost();
  }, [_id]);

  return (
    <>
      <NavigationBar />
      <Box sx={{ width: '100%', maxWidth: 700, bgcolor: 'background.paper' }}>
        <Stack>
          <Typography variant='h1'>{post.title}</Typography>
          <Typography variant='subtitle1'>{post.time}</Typography>
          <Typography variant='subtitle2'>{post.author}</Typography>
          <Typography variant='body1'>{post.body}</Typography>
        </Stack>
      </Box>
    </>
  );
}