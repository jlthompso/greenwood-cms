import { useEffect, useState } from 'react';
import PostDetailsLine from './postDetailsLine';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import DeletePostDialog from './deletePostDialog';
import { useNavigate } from 'react-router-dom';

export default function PostList() {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [showDeletePostDialog, setShowDeletePostDialog] = useState(false);
  const [postId, setPostId] = useState();

  const openDeletePostDialog = () => {
    setShowDeletePostDialog(true);
  };

  const closeDeletePostDialog = () => {
    setShowDeletePostDialog(false);
  };

  const fetchPosts = async () => {
    (await fetch(process.env.REACT_APP_DATABASE_SERVICE)).json().then(response => setPosts(response));
  };

  useEffect(() => {
    if (!showDeletePostDialog) {
      fetchPosts();
    }
  }, [showDeletePostDialog]);

  return (
    <>
      <DeletePostDialog open={showDeletePostDialog} onClose={closeDeletePostDialog} _id={postId} />
      <Box sx={{ width: '100%', maxWidth: 700, bgcolor: 'background.paper' }}>
      <List>
        {posts.map(post => PostDetailsLine(post, openDeletePostDialog, setPostId, navigate))}
      </List>
    </Box>
    </>
  );
}