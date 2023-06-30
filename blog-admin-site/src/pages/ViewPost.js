import NavigationBar from '../components/navigationBar';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';

export default function ViewPost() {
  const _id = useParams()["*"];
  const [post, setPost] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      (await fetch(`${process.env.REACT_APP_DATABASE_SERVICE}/${_id}`)).json().then(response => setPost(response));
    };

    fetchPost();
  }, [_id]);

  return (
    <>
      <NavigationBar />
      <Box sx={{ width: '100%', bgcolor: 'background.paper', ml: '1rem' }}>
        <Stack>
          <Stack direction='row'>
            <Typography variant='h1'>{post.title}</Typography>
            <Box sx={{ ml: '1rem' }}>
              <IconButton aria-label='edit post' onClick={() => {navigate(`/edit/${_id}`)}}>
                <EditIcon />
              </IconButton>
            </Box>
          </Stack>
          <Typography variant='subtitle1'>{post.time}</Typography>
          <Typography variant='subtitle2'>{post.author}</Typography>
          <Typography variant='body1'>{post.body}</Typography>
        </Stack>
      </Box>
    </>
  );
}