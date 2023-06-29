import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';

export default function PostDetailsLine(post, openDeletePostDialog, setPostId, navigate) {
  const handleClick = () => {
    setPostId(post._id);
    openDeletePostDialog();
  };

  const navigateToViewPost = () => {
    navigate(`${'/post'}/${post._id}`);
  };

  return (
    <ListItemButton key={post._id} onClick={navigateToViewPost}>
      <ListItem
        disablePadding
        secondaryAction={
          <IconButton
            edge="end"
            aria-label="delete post"
            onClick={handleClick}
          >
            <DeleteForeverIcon />
          </IconButton>
        }
      >
        <ListItemText primary={post.title} secondary={`${post.author}, ${post.time}`}/>
      </ListItem>
    </ListItemButton>
  );
}