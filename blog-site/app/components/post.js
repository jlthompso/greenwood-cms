import { Typography, Box } from './material';

export default function Post(props) {
  return (
    <Box>
      <Typography variant='h2'>{props.post.title}</Typography>
      <Typography variant='body1'>{props.post.body}</Typography>
    </Box>
  );
}